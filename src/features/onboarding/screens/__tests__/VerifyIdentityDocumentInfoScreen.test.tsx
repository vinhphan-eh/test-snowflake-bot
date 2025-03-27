import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { expectHeroButton } from '../../../../../test-setup/utils/expectHeroButton';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockSaveWalletSetupMutation } from '../../../../new-graphql/generated';
import { VerifyIdentityDocumentInfoScreen } from '../VerifyIdentityDocumentInfoScreen';

jest.mock('@onfido/react-native-sdk', () => {
  return {
    Onfido: {
      OnfidoSdk: {
        start: jest.fn().mockReturnValue(Promise.resolve()),
      },
    },
  };
});

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Onboarding Verify ID Info Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseRoute.mockReturnValue({ params: { onfidoToken: undefined }, key: '', name: '' });
  });

  it('should render properly', () => {
    const { getByText } = render(<VerifyIdentityDocumentInfoScreen />);
    expect(getByText(`Last step! Now we need to verify your driver's licence.`)).toBeTruthy();
  });

  it('should save wallet setup details on load if onfidoToken does not exist', async () => {
    mockServerNode.use(
      mockSaveWalletSetupMutation((_, res, ctx) => res(ctx.data({ saveAUWalletSetup: { idvToken: '1234' } })))
    );

    const { getByLabelText } = render(<VerifyIdentityDocumentInfoScreen />);

    const button = getByLabelText('Scan my ID');
    await waitFor(() => {
      expectHeroButton(button).not.toBeDisabled();
    });
  });

  // TODO: Fix when Onfid responds to support ticket. Onfido mocking does not work following Onfido setup guide. Support ticket has been raised with Onfido.

  // it('should open Onfido verification instance by pressing Scan my ID', async () => {
  //   mockServerNode.use(
  //     mockSaveWalletSetupMutation((_, res, ctx) =>
  //       res(
  //         ctx.data({
  //           saveWalletSetup: {
  //             user: aUser(),
  //             idvToken: '1234',
  //             applicantId: '1234',
  //           },
  //         })
  //       )
  //     )
  //   );

  // const { getByTestId } = render(<VerifyIdentityDocumentInfoScreen />);
  // const item = getByTestId('scan-my-id-btn');

  // fireEvent.press(item);
  // expect(mockedNavigate).toHaveBeenCalledWith('CheckingDetails');
  // });

  it('should not save wallet setup details if onfidoToken is exists', async () => {
    mockedUseRoute.mockReturnValue({ params: { onfidoToken: 'example' }, key: '', name: '' });
    const { getByLabelText } = render(<VerifyIdentityDocumentInfoScreen />);

    const button = getByLabelText('Scan my ID');
    await waitFor(() => {
      expectHeroButton(button).not.toBeDisabled();
    });
  });

  it('should navigate to error screen if user cancels Onfido verifcation', async () => {
    const { getByTestId } = render(<VerifyIdentityDocumentInfoScreen />);
    const item = getByTestId('scan-my-id-btn');

    fireEvent.press(item);

    expect(mockedNavigate).toHaveBeenCalledWith('GeneralError');
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<VerifyIdentityDocumentInfoScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });
});
