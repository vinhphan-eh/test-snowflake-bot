import React from 'react';
import { mockedGoBack, mockedNavigate, mockReset } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseEbfCountry } from '../../../../common/hooks/__mocks__/useEbfCountry';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import { queryClient } from '../../../../common/libs/queryClient';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { IdentityDocumentType, mockStartUkWalletCreationMutation } from '../../../../new-graphql/generated';
import { MONEY_MODULE_NAME, MONEY_OPEN_SSA_CONFIRM_DETAILS_CONFIRMATION } from '../../constants/trackingEvents';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { ProfileDetailsScreen } from '../ProfileDetailsScreen';

// Mock the getIpAddressSync function
jest.mock('react-native-device-info', () => {
  return {
    getIpAddressSync: jest.fn(() => '192.168.1.1'), // Provide your desired mock IP address here
  };
});

const initialPermissionsState = {
  instapay: {
    view: true,
  },
  superAppBenefits: {
    view: true,
  },
  superAppWallet: {
    view: true,
  },
  superAppSettings: {
    view: true,
  },
  superAppHome: {
    view: true,
  },
  superAppCashback: {
    view: true,
  },
  superAppBenefitsFeaturedOffers: {
    view: true,
  },
  superAppCashbackCategories: {
    view: true,
  },
  superChoiceSwag: {
    view: true,
  },
  eBenStash: {
    view: true,
  },
  eBenWhitelistedUkMoney: {
    view: true,
  },
  heroPoints: {
    view: false,
  },
};

const mockProfile = {
  firstName: 'test',
  lastName: 'last',
  middleName: undefined,
  phoneNumber: {
    countryCode: 'Australia (+61)',
    number: '14141635361',
  },
  residentialAddress: {
    region: 'SA',
    country: 'vietnam',
    longForm: 'address 1',
    postcode: '1111',
    townOrCity: 'saigon',
    unitNumber: '123',
    streetNumber: 'streetNumber',
    streetName: 'streetName',
    streetType: 'streetType',
  },
  dateOfBirth: '1996-07-07',
  identityDocumentNumber: '',
  identityDocumentType: IdentityDocumentType.DrivingLicense,
};

export const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;

jest.mock('../../../../common/hooks/useIsWorkzone.ts', () => ({
  useIsWorkzone: jest.fn(),
}));

jest.mock('../../../../common/libs/queryClient', () => ({
  queryClient: {
    invalidateQueries: jest.fn(),
  },
}));

describe('Profile Details Screen', () => {
  beforeEach(() => {
    mockUseEbfCountry.mockReturnValue({
      workzoneCountryCode: 'en-AU',
      ehCountryCode: 'AU',
      isLoadingEhCountry: false,
      isFetched: true,
    });
    mockUseIsWorkzone.mockReturnValue(false);
  });

  it('should render properly', () => {
    const { getByLabelText, getByText } = render(<ProfileDetailsScreen />);
    expect(getByText('Please confirm your details are correct.')).toBeTruthy();
    expect(getByText('Please make sure your details match your ID before you proceed.')).toBeTruthy();
    expect(getByLabelText('Next')).toBeTruthy();
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });

  test.each([
    { testID: 'fullName', nextScreen: 'EditName' },
    { testID: 'mobileNumber', nextScreen: 'EditPhoneNumber' },
    { testID: 'residentialAddress', nextScreen: 'EditResidentialAddressManual' },
    { testID: 'birthday', nextScreen: 'EditDoB' },
  ])('should navigate to $nextScreen after clicking $accessibilityLabel', async ({ nextScreen, testID }) => {
    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId(testID);

    act(() => {
      fireEvent.press(button, 'onPress');
    });

    expect(mockedNavigate).toHaveBeenCalledWith(nextScreen, expect.anything());
  });

  it('should navigate to EditResidentialAddressManual correctly', () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: mockProfile,
      });
    });

    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId('residentialAddress');

    act(() => {
      fireEvent.press(button, 'onPress');
    });

    expect(mockedNavigate).toHaveBeenCalledWith(
      'EditResidentialAddressManual',
      expect.objectContaining({
        residentialAddress: {
          region: 'SA',
          country: 'vietnam',
          longForm: 'address 1',
          postcode: '1111',
          townOrCity: 'saigon',
          unitNumber: '123',
          streetNumber: 'streetNumber',
          streetName: 'streetName',
          streetType: 'streetType',
        },
      })
    );
  });

  it('should navigate to AgeNotQualified correctly', () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: {
          firstName: 'test',
          lastName: 'last',
          middleName: undefined,
          phoneNumber: {
            countryCode: 'Australia (+61)',
            number: '14141635361',
          },
          residentialAddress: {
            region: 'SA',
            country: 'vietnam',
            longForm: 'address 1',
            postcode: '1111',
            townOrCity: 'saigon',
            unitNumber: '123',
            streetNumber: 'streetNumber',
            streetName: 'streetName',
            streetType: 'streetType',
          },
          dateOfBirth: '2020-07-07',
          identityDocumentNumber: '',
          identityDocumentType: IdentityDocumentType.DrivingLicense,
        },
      });
    });

    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId('confirmDetails');
    fireEvent.press(button);
    expect(mockedNavigate).toHaveBeenCalledWith('AgeNotQualified');
  });

  it('should navigate to IdSelection correctly', async () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: mockProfile,
      });
    });

    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId('confirmDetails');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('IdSelection');
      expect(mockedEventTracking).toHaveBeenCalledWith({
        event: MONEY_OPEN_SSA_CONFIRM_DETAILS_CONFIRMATION,
        categoryName: 'user action',
        metaData: {
          module: MONEY_MODULE_NAME,
        },
      });
    });
  });
});

describe('UK user', () => {
  beforeEach(() => {
    mockUseEbfCountry.mockReturnValue({
      workzoneCountryCode: 'en-GB',
      ehCountryCode: 'GB',
      isLoadingEhCountry: false,
      isFetched: true,
    });
    mockUseIsWorkzone.mockReturnValue(false);

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = initialPermissionsState;
    permissionStore.result.current.isFetchedPermission = true;
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { getByLabelText, getByText } = render(<ProfileDetailsScreen />);
    expect(getByText('Please confirm your details are correct and match your ID.')).toBeTruthy();
    expect(getByText('Please make sure your details match your ID before you proceed.')).toBeTruthy();
    expect(getByLabelText('Next')).toBeTruthy();
  });

  it('should navigate to Passcode Screen and refetch wallet setup details correctly if startUkWalletCreation succeeds', async () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: mockProfile,
      });
    });

    mockServerNode.use(
      mockStartUkWalletCreationMutation((_, res, ctx) => res(ctx.data({ startUKWalletCreation: { success: true } })))
    );

    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId('confirmDetails');
    fireEvent.press(button);

    await waitFor(() => {
      expect(queryClient.invalidateQueries).toHaveBeenCalledWith(['GetWalletStatus']);
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [
          {
            name: 'UkPasscode',
          },
        ],
      });
      expect(mockedEventTracking).not.toHaveBeenCalled();
    });
  });

  it('should navigate to GeneralError if startUkWalletCreation fails', async () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: mockProfile,
      });
    });
    mockServerNode.use(
      mockStartUkWalletCreationMutation((_, res, ctx) =>
        res(ctx.status(500), ctx.errors([{ message: 'Something went wrong' }]))
      )
    );

    const { getByTestId } = render(<ProfileDetailsScreen />);
    const button = getByTestId('confirmDetails');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('GeneralError');
    });
  });
});
