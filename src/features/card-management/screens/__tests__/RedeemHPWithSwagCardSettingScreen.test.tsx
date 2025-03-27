import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext, useRoute } from '@react-navigation/native';
import { mockedPopToTop, mockedReplace } from '../../../../../__mocks__/react-navigation';
import * as useHeroPointsVisibility from '../../../../common/hooks/useHeroPointsVisibility';
import { useIsWalletSetupComplete } from '../../../../common/hooks/useIsWalletSetupComplete';
import { useToast } from '../../../../common/shared-hooks/useToast';
import { mockedSwitchPillar } from '../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import type { PermissionData } from '../../../../common/stores/usePermissionStore';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { act, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { navigateToTopTabs } from '../../../../navigation/rootNavigation';
import {
  mockGetHeroPointsPaymentPreferencesQuery,
  mockGetPayWithHpCarouselSeenQuery,
  mockUpdateHeroPointsPaymentPreferencesMutation,
} from '../../../../new-graphql/generated';
import { RedeemHPWithSwagCardSettingScreen } from '../RedeemHPWithSwagCardSettingScreen';

const mockedOpenUrl = jest.fn();
jest.mock('../../../../common/shared-hooks/useInAppBrowser', () => ({
  useInAppBrowser: () => ({
    openUrl: mockedOpenUrl,
  }),
}));

jest.mock('../../../../common/shared-hooks/useToast', () => ({
  useToast: jest.fn(),
}));

jest.mock('../../../../common/hooks/useIsWalletSetupComplete', () => ({
  useIsWalletSetupComplete: jest.fn(),
}));

jest.mock('../../../../navigation/rootNavigation', () => ({
  navigateToTopTabs: jest.fn(),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockShowToast = jest.fn();

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('RedeemHPWithSwagCardSettingScreen', () => {
  beforeEach(() => {
    const { result: sessionResult } = renderHook(() => useSessionStore());
    sessionResult.current.swagTextAndImageRebrandEnabled = false;

    (useIsWalletSetupComplete as jest.Mock).mockReturnValue({
      isFetched: true,
      isWalletSetupComplete: true,
    });
    jest.spyOn(useHeroPointsVisibility, 'useHeroPointsVisibility').mockReturnValue(true);

    const { result } = renderHook(() => usePermissionStore());
    result.current.permissions = { eBenSpendHeroDollarsOnSwagCard: { view: true } } as PermissionData;

    mockServerNode.use(
      mockUpdateHeroPointsPaymentPreferencesMutation((_, res, context) => {
        return res(context.data({ heroPoints: { paymentPreferences: { payWithHPOnSwagCard: true } } }));
      }),
      mockGetHeroPointsPaymentPreferencesQuery((_, res, context) => {
        return res(context.data({ me: { heroPoints: { paymentPreferences: { payWithHPOnSwagCard: false } } } }));
      }),
      mockGetPayWithHpCarouselSeenQuery((_, res, context) => {
        return res(context.data({ me: { heroPoints: { payWithHPCarouselSeen: true } } }));
      })
    );

    mockedUseRoute.mockReturnValue({
      params: { isSeenIntro: true },
      key: '',
      name: '',
    });

    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  it('should render correctly', async () => {
    const { findByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RedeemHPWithSwagCardSettingScreen />
      </NavigationContext.Provider>
    );

    expect(await findByText('Redeem Hero Points on everyday purchases')).toBeTruthy();
    expect(await findByText('Redeem Hero Points with your Swag Visa Debit card')).toBeTruthy();
    expect(await findByText('Want to know more about Hero Points?')).toBeTruthy();
    expect(await findByText('Visit FAQs')).toBeTruthy();
    expect(await findByText('Featured offers')).toBeTruthy();
  });

  it('should update setting correctly ', async () => {
    const { findByLabelText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RedeemHPWithSwagCardSettingScreen />
      </NavigationContext.Provider>
    );

    const enableToggle = await findByLabelText('Redeem Hero Points with your Swag Visa Debit card toggle');
    expect(await findByLabelText('redeem hero points with Swag card disabled')).toBeTruthy();
    fireEvent.press(enableToggle);

    expect(await findByLabelText('redeem hero points with Swag card enabled')).toBeTruthy();
  });

  it('should revert to old value when failed ', async () => {
    mockServerNode.use(mockUpdateHeroPointsPaymentPreferencesMutation((_, res) => res.networkError('Error')));

    const { findByLabelText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RedeemHPWithSwagCardSettingScreen />
      </NavigationContext.Provider>
    );

    const enableToggle = await findByLabelText('Redeem Hero Points with your Swag Visa Debit card toggle');
    expect(await findByLabelText('redeem hero points with Swag card disabled')).toBeTruthy();
    act(() => {
      fireEvent.press(enableToggle);
    });

    await waitFor(() => {
      expect(mockShowToast).toHaveBeenCalled();
      expect(findByLabelText('redeem hero points with Swag card disabled')).toBeTruthy();
    });
  });

  it('should render error screen if fetching payment preference setting query failed', async () => {
    mockServerNode.use(
      mockGetHeroPointsPaymentPreferencesQuery((_, res) => {
        return res.networkError('Error');
      })
    );

    const { findByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RedeemHPWithSwagCardSettingScreen />
      </NavigationContext.Provider>
    );
    expect(await findByText("We're sorry, something went wrong")).toBeTruthy();
  });

  it('should open link correctly when click FAQ', async () => {
    const { findByText, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RedeemHPWithSwagCardSettingScreen />
      </NavigationContext.Provider>
    );

    expect(await findByText('Visit FAQs')).toBeTruthy();

    fireEvent.press(getByText('Visit FAQs'));

    expect(mockedOpenUrl).toHaveBeenCalledWith(
      'https://help.swagapp.com/hc/en-au/articles/8380097870991-Hero-Points-FAQs-via-Money'
    );
  });

  it('should open link correctly when click FAQ with rebrand', async () => {
    const { result: sessionResult } = renderHook(() => useSessionStore());
    sessionResult.current.swagTextAndImageRebrandEnabled = true;

    const { findByText, getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <RedeemHPWithSwagCardSettingScreen />
      </NavigationContext.Provider>
    );

    expect(await findByText('Visit FAQs')).toBeTruthy();

    fireEvent.press(getByText('Visit FAQs'));

    expect(mockedOpenUrl).toHaveBeenCalledWith(
      'https://workhelp.employmenthero.com/hc/en-au/articles/8380097870991-Hero-Points-FAQs-via-Money'
    );
  });

  describe('on screen focus', () => {
    describe('the wallet setup is not completed', () => {
      beforeEach(() => {
        (useIsWalletSetupComplete as jest.Mock).mockReturnValue({
          isFetched: true,
          isWalletSetupComplete: false,
        });

        render(
          <NavigationContext.Provider value={navigationContext}>
            <RedeemHPWithSwagCardSettingScreen />
          </NavigationContext.Provider>
        );
      });

      it('should switch to Swag App pillar', () => {
        expect(mockedSwitchPillar).toBeCalledWith({ to: { pillarId: 'SwagApp' } });
      });

      it('should pop navigation stack to top', () => {
        expect(mockedPopToTop).toBeCalled();
      });
    });

    describe('user does not have permission to HP on Swag card feature', () => {
      beforeEach(() => {
        const { result } = renderHook(() => usePermissionStore());
        result.current.permissions = { eBenSpendHeroDollarsOnSwagCard: { view: false } } as PermissionData;

        render(
          <NavigationContext.Provider value={navigationContext}>
            <RedeemHPWithSwagCardSettingScreen />
          </NavigationContext.Provider>
        );
      });

      it('should navigate to Card tab', () => {
        expect(navigateToTopTabs).toBeCalledWith('card-tab');
      });
    });

    describe('user has not seen introduction carousel', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockGetPayWithHpCarouselSeenQuery((_, res, context) => {
            return res(context.data({ me: { heroPoints: { payWithHPCarouselSeen: false } } }));
          })
        );

        render(
          <NavigationContext.Provider value={navigationContext}>
            <RedeemHPWithSwagCardSettingScreen />
          </NavigationContext.Provider>
        );
      });

      it('should navigate to introduction screen tab', async () => {
        await waitFor(() => {
          expect(mockedReplace).toBeCalledWith('CardManagementStack', {
            screen: 'RedeemHPWithSwagCardIntro',
            params: { isSeenIntro: false },
          });
        });
      });
    });
  });
});
