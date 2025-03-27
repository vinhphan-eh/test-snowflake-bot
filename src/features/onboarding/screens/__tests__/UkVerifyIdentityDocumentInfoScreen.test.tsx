import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { mockGetUkTokenQuery, mockStartUkKycMutation } from '../../../../new-graphql/generated';
import * as startKycPromise from '../UkVerifyIdentityDocumentScreen';
import { UkVerifyIdentityDocumentInfoScreen } from '../UkVerifyIdentityDocumentScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

jest.mock('@weavr-io/secure-components-react-native', () => ({
  setUserToken: jest.fn(),
  isAssociated: () => Promise.resolve(true),
  startKyc: jest.fn((_, callback) => callback.onKycSuccess(Promise.resolve('success'))),
}));

describe('UkVerifyIdentityDocumentInfo Screen', () => {
  beforeEach(() => {
    regionLocalisationMockUtil('GB');
    mockedUseRoute.mockReturnValue({ params: { userToken: 'user_token' }, key: '', name: '' });
  });

  it('should render properly', () => {
    const { getByText } = render(<UkVerifyIdentityDocumentInfoScreen />);
    expect(getByText(`Last step! Now we need to verify your ID.`)).toBeTruthy();
  });

  it('should fetch userToken if not passed in navigation', async () => {
    mockedUseRoute.mockReturnValue({ params: { userToken: '' }, key: '', name: '' });

    mockServerNode.use(
      mockGetUkTokenQuery((_, res, ctx) =>
        res(ctx.data({ me: { wallet: { UKToken: { userToken: 'user_token_11111' } } } }))
      ),
      mockStartUkKycMutation((_, res, ctx) => res(ctx.data({ startUKKYC: { reference: 'reference' } })))
    );

    jest.spyOn(startKycPromise, 'initiateUkKycComponent').mockImplementation(() => Promise.resolve('success'));

    const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);

    const item = getByTestId('scan-my-id-btn');

    await waitFor(() => {
      expect(item.props.accessibilityState.disabled).toBeFalsy();
    });

    fireEvent.press(item);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('CheckingDetails', { statusIsInprogress: true });
    });
  });

  it('should navigate to waiting screen if KYC is successful', async () => {
    mockServerNode.use(
      mockStartUkKycMutation((_, res, ctx) => res(ctx.data({ startUKKYC: { reference: 'reference' } })))
    );

    jest.spyOn(startKycPromise, 'initiateUkKycComponent').mockImplementation(() => Promise.resolve('success'));

    const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);
    const item = getByTestId('scan-my-id-btn');
    fireEvent.press(item);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('CheckingDetails', { statusIsInprogress: true });
    });
  });

  it('should navigate to general error screen if startKyc fails', async () => {
    mockServerNode.use(mockStartUkKycMutation((_, res, ctx) => res(ctx.errors([{ message: 'Something went wrong' }]))));

    jest.spyOn(startKycPromise, 'initiateUkKycComponent').mockImplementation(() => Promise.resolve('success'));

    const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);
    const item = getByTestId('scan-my-id-btn');
    fireEvent.press(item);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('GeneralError', {
        closeCallback: expect.anything(),
        ctaText: 'Try again',
        secondaryCtaText: 'Close',
        secondaryCtaCallback: expect.anything(),
      });
    });
  });

  it('should navigate to general error screen if KYC module fails', async () => {
    jest.spyOn(startKycPromise, 'initiateUkKycComponent').mockImplementation(() => Promise.reject(new Error('FAILED')));

    const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);
    const item = getByTestId('scan-my-id-btn');
    fireEvent.press(item);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('GeneralError', {
        closeCallback: expect.anything(),
        ctaText: 'Try again',
        secondaryCtaText: 'Close',
        secondaryCtaCallback: expect.anything(),
      });
    });
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  describe('user terminates the KYC flow', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockStartUkKycMutation((_, res, ctx) => res(ctx.data({ startUKKYC: { reference: 'reference' } })))
      );
    });

    it('should navigate back to the Spend dashboard if KYC is unfinished', async () => {
      jest
        .spyOn(startKycPromise, 'initiateUkKycComponent')
        .mockImplementation(() => Promise.reject(new Error('TERMINATED')));

      const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);
      const item = getByTestId('scan-my-id-btn');
      fireEvent.press(item);

      await waitFor(() => {
        expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
      });
    });

    it('should navigate to the Checking your details screen if KYC submission is pending review', async () => {
      jest
        .spyOn(startKycPromise, 'initiateUkKycComponent')
        .mockImplementation(() => Promise.reject(new Error('PENDING_REVIEW')));

      const { getByTestId } = render(<UkVerifyIdentityDocumentInfoScreen />);
      const item = getByTestId('scan-my-id-btn');
      fireEvent.press(item);

      await waitFor(() => {
        expect(mockedNavigate).toBeCalledWith('CheckingDetails', { statusIsInprogress: true });
      });
    });
  });
});
