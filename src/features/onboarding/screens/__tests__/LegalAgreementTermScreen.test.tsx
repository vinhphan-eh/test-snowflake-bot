import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { expectHeroButton } from '../../../../../test-setup/utils/expectHeroButton';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { mockUseGetSuperAppToken } from '../../../../common/auth/store/__mocks__/useSuperAppTokenStore';
import { mockUseEbfCountry } from '../../../../common/hooks/__mocks__/useEbfCountry';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import * as useInAppBrowser from '../../../../common/shared-hooks/useInAppBrowser';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { IdentityDocumentType } from '../../../../new-graphql/generated';
import { privacyPolicyContent, termsAndConditionsContent } from '../../constants/policyContent';
import { EUUKPrivacyPolicyContent, UKTermsAndConditionsContent } from '../../constants/ukPolicyContent';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { LegalAgreementTermScreen } from '../LegalAgreementTermScreen';

const mockOpenUrl = jest.fn();

export const mockUseIsWorkzone = useIsWorkzone as jest.MockedFn<typeof useIsWorkzone>;

jest.mock('../../../../common/hooks/useIsWorkzone.ts', () => ({
  useIsWorkzone: jest.fn(),
}));

jest.mock('../../../../new-graphql/generated', () => ({
  useGetEhUserInitializationDetailsQuery: jest.fn(),
  useGetKpUserInitializationDetailsQuery: jest.fn(),
  IdentityDocumentType: {
    DrivingLincense: 'DrivingLincense',
  },
}));

useSessionStore.setState({
  currentUser: { loginProvider: 'eh', userID: 'fake' },
  currentOrgId: 'fake',
  swagTextAndImageRebrandEnabled: false,
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

const personalDetails = {
  firstName: 'test',
  lastName: 'test',
  middleName: undefined,
  phoneNumber: {
    countryCode: 'Australia (+61)',
    number: '123455664',
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
  dateOfBirth: '1995/05/20',
  identityDocumentNumber: '',
  identityDocumentType: IdentityDocumentType.DrivingLicense,
};

describe('Legal Agreement Term Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockUseGetSuperAppToken.mockReturnValue({
      token: 'asdas',
      loginProvider: 'eh',
    });
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
    mockUseEbfCountry.mockReturnValue({
      workzoneCountryCode: 'en-AU',
      ehCountryCode: 'AU',
      isLoadingEhCountry: false,
      isFetched: true,
    });
    mockUseIsWorkzone.mockReturnValue(false);
    regionLocalisationMockUtil('AU');
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { getByText } = render(<LegalAgreementTermScreen />);
    expect(getByText('Take the time to read and accept our Terms and Conditions and Privacy Policy.')).toBeTruthy();
  });

  it('should be disabled Next button', () => {
    const { getByTestId } = render(<LegalAgreementTermScreen />);
    const button = getByTestId('legal-agreement-next-btn');
    expectHeroButton(button).toBeDisabled();
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<LegalAgreementTermScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should render privacy policy content', async () => {
    const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
    const privacyPolicyButton = getByTestId('privacy-policy-next-btn');

    act(() => {
      fireEvent.press(privacyPolicyButton);
    });

    await waitFor(() => {
      // array content is static, so just test the first item
      // to ensure the array is rendering
      expect(getByText(privacyPolicyContent[1].text)).toBeTruthy();
    });
  });

  it('should render rebrand content', async () => {
    useSessionStore.setState({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);

    const privacyPolicyButton = getByTestId('privacy-policy-next-btn');
    act(() => {
      fireEvent.press(privacyPolicyButton);
    });

    await waitFor(() => {
      expect(getByText('Privacy Policy.')).toBeTruthy();
    });
  });

  it('should render terms & conditions content', async () => {
    const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
    const tcsButton = getByTestId('term-condition-next-btn');

    act(() => {
      fireEvent.press(tcsButton);
    });

    await waitFor(() => {
      // array content is static, so just test the first item
      // to ensure the array is rendering
      expect(getByText(termsAndConditionsContent[1].text)).toBeTruthy();
    });
  });

  it('should render terms & conditions content with rebrand', async () => {
    useSessionStore.setState({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
    const tcsButton = getByTestId('term-condition-next-btn');

    act(() => {
      fireEvent.press(tcsButton);
    });

    await waitFor(() => {
      expect(getByText('Spend Account Terms and Conditions.')).toBeTruthy();
    });
  });

  it('should open the URL with InAppBrowser if pressed on the inline-level text link', async () => {
    const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
    const privacyPolicyButton = getByTestId('privacy-policy-next-btn');

    await act(() => {
      fireEvent.press(privacyPolicyButton);
    });

    await act(() => {
      fireEvent.press(getByText('here.'));
    });

    await waitFor(() => {
      expect(mockOpenUrl).toHaveBeenCalledWith('https://employmenthero.com/legals/data-processing/affiliates/');
    });
  });

  it('should open the URL with InAppBrowser if pressed on the block-level text link', async () => {
    const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
    const privacyPolicyButton = getByTestId('privacy-policy-next-btn');

    await act(() => {
      fireEvent.press(privacyPolicyButton);
    });

    await act(() => {
      fireEvent.press(getByText('View archived versions here'));
    });

    await waitFor(() => {
      expect(mockOpenUrl).toHaveBeenCalledWith('https://employmenthero.com/legals/privacy-policy/archived/');
    });
  });

  it('should navigate to to TaxObligationsScreen', async () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails,
      });
    });

    const { getByTestId } = render(<LegalAgreementTermScreen />);
    const privacyPolicyButton = getByTestId('privacy-policy-next-btn');
    const tcsButton = getByTestId('term-condition-next-btn');
    const nextButton = getByTestId('legal-agreement-next-btn');

    await act(() => {
      fireEvent.press(privacyPolicyButton);
      fireEvent(privacyPolicyButton, 'onAccepted');
    });

    await act(() => {
      fireEvent.press(tcsButton);
      fireEvent(tcsButton, 'onAccepted');
    });

    await waitFor(() => {
      fireEvent.press(nextButton);
      expect(mockedNavigate).toHaveBeenCalledWith('TaxObligations');
    });
  });

  describe('UK user', () => {
    beforeEach(() => {
      jest.resetAllMocks();
      mockUseGetSuperAppToken.mockReturnValue({
        token: 'asdas',
        loginProvider: 'eh',
      });
      jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
        return {
          openUrl: mockOpenUrl,
        };
      });
      mockUseEbfCountry.mockReturnValue({
        workzoneCountryCode: 'en-GB',
        ehCountryCode: 'GB',
        isLoadingEhCountry: false,
        isFetched: true,
      });
      mockUseIsWorkzone.mockReturnValue(false);
      regionLocalisationMockUtil('GB');

      const permissionStore = renderHook(() => usePermissionStore());
      permissionStore.result.current.permissions = initialPermissionsState;
      permissionStore.result.current.isFetchedPermission = true;
    });

    afterAll(() => {
      jest.clearAllMocks();
    });

    describe('navigation', () => {
      it('should navigate to to ProfileDetailsScreen', async () => {
        act(() => {
          useOnboardingStore.setState({
            personalDetails,
          });
        });

        const { getByTestId } = render(<LegalAgreementTermScreen />);
        const privacyPolicyButton = getByTestId('privacy-policy-next-btn');
        const tcsButton = getByTestId('term-condition-next-btn');
        const nextButton = getByTestId('legal-agreement-next-btn');

        await act(() => {
          fireEvent.press(privacyPolicyButton);
          fireEvent(privacyPolicyButton, 'onAccepted');
        });

        await act(() => {
          fireEvent.press(tcsButton);
          fireEvent(tcsButton, 'onAccepted');
        });

        await waitFor(() => {
          fireEvent.press(nextButton);
          expect(mockedNavigate).toHaveBeenCalledWith('PersonalDetails');
        });
      });

      describe('should navigate to ProfileNameScreen', () => {
        it.each([
          {
            scenarioName: 'if required name fields are empty',
            overrideNameFields: {
              lastName: '',
            },
          },
          {
            scenarioName: 'if any required name fields contain special characters',
            overrideNameFields: {
              lastName: 'Lastname*',
              firstName: 'Firstname',
            },
          },
          {
            scenarioName: 'if middle name is not left empty and contains special characters',
            overrideNameFields: {
              middleName: '#MiddleName',
            },
          },
        ])('$scenarioName', async ({ overrideNameFields }) => {
          act(() => {
            useOnboardingStore.setState({
              personalDetails: {
                ...personalDetails,
                ...overrideNameFields,
              },
            });
          });
          const { getByTestId } = render(<LegalAgreementTermScreen />);
          const privacyPolicyButton = getByTestId('privacy-policy-next-btn');
          const tcsButton = getByTestId('term-condition-next-btn');
          const nextButton = getByTestId('legal-agreement-next-btn');

          await act(() => {
            fireEvent.press(privacyPolicyButton);
            fireEvent(privacyPolicyButton, 'onAccepted');
          });

          await act(() => {
            fireEvent.press(tcsButton);
            fireEvent(tcsButton, 'onAccepted');
          });

          fireEvent.press(nextButton);

          await waitFor(() => {
            expect(mockedNavigate).toHaveBeenCalledWith('ProfileName');
          });
        });
      });

      it('should navigate to ProfileDoBScreen', async () => {
        act(() => {
          useOnboardingStore.setState({
            personalDetails: {
              ...personalDetails,
              dateOfBirth: '',
            },
          });
        });
        const { getByTestId } = render(<LegalAgreementTermScreen />);
        const privacyPolicyButton = getByTestId('privacy-policy-next-btn');
        const tcsButton = getByTestId('term-condition-next-btn');
        const nextButton = getByTestId('legal-agreement-next-btn');

        await act(() => {
          fireEvent.press(privacyPolicyButton);
          fireEvent(privacyPolicyButton, 'onAccepted');
        });

        await act(() => {
          fireEvent.press(tcsButton);
          fireEvent(tcsButton, 'onAccepted');
        });

        await waitFor(() => {
          fireEvent.press(nextButton);
          expect(mockedNavigate).toHaveBeenCalledWith('ProfileDoB');
        });
      });
    });

    describe('rendering', () => {
      it('should render screen title properly', () => {
        const { getByText } = render(<LegalAgreementTermScreen />);
        expect(
          getByText(
            'Take the time to read and accept our Swag Spend Account Terms and Conditions and Privacy Policy, provided by our partner Paynetics UK Limited.'
          )
        ).toBeTruthy();
      });

      it('should render privacy policy content', async () => {
        const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
        const privacyPolicyButton = getByTestId('privacy-policy-next-btn');

        act(() => {
          fireEvent.press(privacyPolicyButton);
        });

        await waitFor(() => {
          // array content is static, so just test the first item
          // to ensure the array is rendering
          expect(getByText(EUUKPrivacyPolicyContent[1].text)).toBeTruthy();
        });
      });

      it('should render terms and conditions content', async () => {
        const { getByTestId, getByText } = render(<LegalAgreementTermScreen />);
        const tcsButton = getByTestId('term-condition-next-btn');

        act(() => {
          fireEvent.press(tcsButton);
        });

        await waitFor(() => {
          // array content is static, so just test the first item
          // to ensure the array is rendering
          expect(
            getByText(UKTermsAndConditionsContent[0].boldText || UKTermsAndConditionsContent[0].text)
          ).toBeTruthy();
        });
      });
    });
  });
});
