import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { useCreateUkCardMutation, useGetCurrentUserQuery } from '../../../../../new-graphql/generated';
import { useGetWeavrAccessToken } from '../../../../onboarding/hooks/useGetWeavrAccessToken';
import { UkBillingAddressScreen } from '../UkBillingAddressScreen';

jest.mock('@react-navigation/native');
jest.mock('../../../../../new-graphql/generated');
jest.mock('../../../../onboarding/hooks/useGetWeavrAccessToken');
jest.mock('@weavr-io/secure-components-react-native', () => ({
  initiateBiometric: () => Promise.resolve(),
  startChallenge: () => Promise.resolve(),
  setUserToken: jest.fn(),
}));

const mockUseGetWeavrAccessToken = useGetWeavrAccessToken as jest.MockedFn<typeof useGetWeavrAccessToken>;

const mockUseCreateUkCardMutation = useCreateUkCardMutation as jest.MockedFn<typeof useCreateUkCardMutation>;

describe('UkBillingAddressScreen', () => {
  const currentUser = {
    mailingAddress: {
      longForm: '123 Main St',
      townOrCity: 'London',
      region: 'Greater London',
      postcode: 'SW1A 1AA',
    },
  };
  const createUKCard = {
    mutateAsync: jest.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    (useGetCurrentUserQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          details: {
            mailingAddress: currentUser.mailingAddress,
          },
        },
      },
    });
    mockUseCreateUkCardMutation.mockReturnValue(createUKCard as never);
    (useGetWeavrAccessToken as jest.Mock).mockReturnValue({
      startBiometricLogin: jest.fn(() => Promise.resolve()),
      issueChallenge: jest.fn(() => Promise.resolve()),
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders the billing address form with the user data', async () => {
    const { getByText } = render(<UkBillingAddressScreen />);

    await waitFor(() => expect(getByText('Should we use this billing address for your debit card?')).toBeDefined());
    expect(getByText('Next')).toBeDefined();
  });

  it('navigates to the UK billing address edit screen when the edit button is pressed', async () => {
    const { getByLabelText } = render(<UkBillingAddressScreen />);

    await waitFor(() => expect(getByLabelText('Edit billing address')).toBeDefined());
    fireEvent.press(getByLabelText('Edit billing address'));

    expect(mockedNavigate).toHaveBeenCalledWith('UkBillingAddressEdit', {
      address: {
        addressLine1: '123 Main St',
        country: 'GB',
        postcode: 'SW1A 1AA',
        townOrCity: 'London',
      },
      updateCallback: expect.any(Function),
    });
  });

  it('submits the billing address form and initates biomterics login when the next button is pressed', async () => {
    mockUseGetWeavrAccessToken.mockReturnValue({
      error: '',
      startBiometricLogin: jest.fn(() => Promise.resolve()),
      issueChallenge: jest.fn(() => Promise.resolve()),
      isLoading: false,
      accessToken: 'token',
      setAccessToken: jest.fn(),
    });

    createUKCard.mutateAsync.mockResolvedValue({
      cardId: '123',
    });
    const { getByText } = render(<UkBillingAddressScreen />);

    await waitFor(() => expect(getByText('Next')).toBeDefined());
    fireEvent.press(getByText('Next'));

    await waitFor(() => expect(createUKCard.mutateAsync).toHaveBeenCalled());
    expect(mockedNavigate).toHaveBeenCalledWith('CardSetupComplete');
  });

  it('navigates to the error screen when the user fail biometrics login', async () => {
    mockUseGetWeavrAccessToken.mockReturnValue({
      error: 'err',
      startBiometricLogin: jest.fn(() => Promise.resolve()),
      issueChallenge: jest.fn(() => Promise.resolve()),
      isLoading: false,
      accessToken: '',
      setAccessToken: jest.fn(),
    });

    const { getByText } = render(<UkBillingAddressScreen />);

    await waitFor(() => expect(getByText('Next')).toBeDefined());
    fireEvent.press(getByText('Next'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('Error', { resetCardPin: false });
    });
  });

  it('navigates to the error screen when there is an error creating the UK debit card', async () => {
    mockUseGetWeavrAccessToken.mockReturnValue({
      error: '',
      startBiometricLogin: jest.fn(() => Promise.resolve()),
      issueChallenge: jest.fn(() => Promise.resolve()),
      isLoading: false,
      accessToken: 'token',
      setAccessToken: jest.fn(),
    });

    createUKCard.mutateAsync.mockRejectedValueOnce({
      errors: [{ message: 'Error' }],
    });

    const { getByText } = render(<UkBillingAddressScreen />);

    await waitFor(() => expect(getByText('Next')).toBeDefined());
    fireEvent.press(getByText('Next'));

    await waitFor(() => expect(createUKCard.mutateAsync).toHaveBeenCalled());
    expect(mockedNavigate).toHaveBeenCalledWith('Error', { resetCardPin: false });
  });

  it('navigate back', async () => {
    const { getByTestId } = render(<UkBillingAddressScreen />);

    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should not go next if address is invalid', async () => {
    (useGetCurrentUserQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          details: {
            mailingAddress: undefined,
          },
        },
      },
    });
    const { getByText } = render(<UkBillingAddressScreen />);

    await waitFor(() => expect(getByText('Next')).toBeDefined());
    fireEvent.press(getByText('Next'));

    expect(mockedNavigate).not.toBeCalled();
  });
});
