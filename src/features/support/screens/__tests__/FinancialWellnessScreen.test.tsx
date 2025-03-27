import React from 'react';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import * as useInAppBrowser from '../../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import {
  type DisableEarnedWageAccessFeaturesPayload,
  type InstapayError,
  mockDisableEarnedWageAccessFeaturesMutation,
} from '../../../../new-graphql/generated';
import { FinancialWellnessScreen } from '../FinancialWellnessScreen';

const mockOpenUrl = jest.fn();
const mockShowToast = jest.fn();
const mockMutationFn = jest.fn();

jest.mock('../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({
    show: mockShowToast,
  }),
}));

jest.mock('../../../../common/stores/useSessionStore');

describe(FinancialWellnessScreen, () => {
  beforeEach(() => {
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });

    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', async () => {
    const { getByText } = render(<FinancialWellnessScreen />);

    expect(getByText('Financial wellness and support')).toBeVisible();
    expect(getByText('Build your financial wellness')).toBeVisible();
    expect(getByText('My financial insights')).toBeVisible();
    expect(getByText('We need to talk about financial wellness at work')).toBeVisible();
    expect(getByText('9 mins read')).toBeVisible();
    expect(getByText('5 Tips for creating a bulletproof budget')).toBeVisible();
    expect(getByText('5 mins read')).toBeVisible();
    expect(getByText('How to cut everyday expenses and save money')).toBeVisible();
    expect(getByText('13 mins read')).toBeVisible();
    expect(getByText('Employee Perks in Australia 2024')).toBeVisible();
    expect(getByText('10 mins read')).toBeVisible();
    expect(getByText('Offering tips and tools to maximise your money')).toBeVisible();
    expect(getByText('Moneysmart.gov.au')).toBeVisible();
    expect(getByText('Provides useful & clear guide for common debt problems')).toBeVisible();
    expect(getByText('National Debt Helpline')).toBeVisible();
    expect(getByText('Financial help for Small Business owners')).toBeVisible();
    expect(getByText('Small Business Debt Helpline')).toBeVisible();
    expect(getByText('Need more help?')).toBeVisible();
    expect(getByText('Manage your wage access settings')).toBeVisible();
  });

  describe('pressed financial insight carousel item', () => {
    describe('when rebrading is enabled', () => {
      it('should open the correct url and track correct event', async () => {
        (useSessionStore as unknown as jest.Mock).mockReturnValue({
          swagTextAndImageRebrandEnabled: true,
        });

        const { getByTestId } = render(<FinancialWellnessScreen />);

        const carouselItem = getByTestId('financial-insight-carousel-item-0');
        fireEvent.press(carouselItem);

        expect(mockOpenUrl).toHaveBeenCalledWith('https://employmenthero.com/blog/financial-wellness-at-work/');
        await waitFor(() => {
          expect(mockedEventTracking).toHaveBeenCalledWith({
            event: 'Click on We need to talk about financial wellness at work on Financial Wellness tab',
            categoryName: 'user action',
            metaData: {
              module: 'Financial Wellness',
              location: 'Support - Financial Wellness',
              url: 'https://employmenthero.com/blog/financial-wellness-at-work/',
            },
          });
        });
      });
    });

    describe('when rebrading is disabled', () => {
      it('should open the correct url and track correct event', async () => {
        (useSessionStore as unknown as jest.Mock).mockReturnValue({
          swagTextAndImageRebrandEnabled: false,
        });

        const { getByTestId } = render(<FinancialWellnessScreen />);

        const carouselItem = getByTestId('financial-insight-carousel-item-0');
        fireEvent.press(carouselItem);

        expect(mockOpenUrl).toHaveBeenCalledWith('https://swagapp.com/blog/financial-wellness-at-work/');
        await waitFor(() => {
          expect(mockedEventTracking).toHaveBeenCalledWith({
            event: 'Click on We need to talk about financial wellness at work on Financial Wellness tab',
            categoryName: 'user action',
            metaData: {
              module: 'Financial Wellness',
              location: 'Support - Financial Wellness',
              url: 'https://swagapp.com/blog/financial-wellness-at-work/',
            },
          });
        });
      });
    });
  });

  describe('pressed financial insight item', () => {
    it('should open the correct url and track correct event', async () => {
      const { getByTestId } = render(<FinancialWellnessScreen />);

      const carouselItem = getByTestId('financial-insight-item-0');
      fireEvent.press(carouselItem);

      expect(mockOpenUrl).toHaveBeenCalledWith('https://moneysmart.gov.au/');
      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          event: 'Click on Moneysmart on Financial Wellness tab',
          categoryName: 'user action',
          metaData: {
            module: 'Financial Wellness',
            location: 'Support - Financial Wellness',
            url: 'https://moneysmart.gov.au/',
          },
        });
      });
    });
  });

  describe('pressed manage wage access settings cta', () => {
    it('should render bottom sheet correctly and track correct event', async () => {
      const { getByTestId, getByText } = render(<FinancialWellnessScreen />);

      const manageWageAccessSettingsCta = getByTestId('manage-your-wage-access-setting-cta');
      fireEvent.press(manageWageAccessSettingsCta);

      expect(getByText('Confirmation')).toBeVisible();
      expect(
        getByText(
          'Are you sure you want to disable all earned wage access features? All earned wage products will no longer be available.'
        )
      ).toBeVisible();
      expect(getByText('Disable')).toBeVisible();
      expect(getByText('Cancel')).toBeVisible();

      await waitFor(() => {
        expect(mockedEventTracking).toHaveBeenCalledWith({
          event: 'Click on Manage your wage access settings on Financial Wellness tab',
          categoryName: 'user action',
          metaData: {
            module: 'Financial Wellness',
            location: 'Support - Financial Wellness',
          },
        });
      });
    });
  });

  describe('press disable earned wage access', () => {
    describe('when successful', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockDisableEarnedWageAccessFeaturesMutation((input, res, ctx) => {
            mockMutationFn(input.variables);
            return res(
              ctx.data({
                instapay: {
                  disableEarnedWageAccessFeatures: { success: true } as DisableEarnedWageAccessFeaturesPayload,
                },
              })
            );
          })
        );
      });

      it('should track correct event and show toast', async () => {
        const { getByTestId } = render(<FinancialWellnessScreen />);

        const manageWageAccessSettingsCta = getByTestId('manage-your-wage-access-setting-cta');
        fireEvent.press(manageWageAccessSettingsCta);

        const disableEwaFeaturesButton = getByTestId('disable-ewa-features-button');
        fireEvent.press(disableEwaFeaturesButton);

        await waitFor(() => {
          expect(mockedEventTracking).toHaveBeenNthCalledWith(1, {
            event: 'Click on Manage your wage access settings on Financial Wellness tab',
            categoryName: 'user action',
            metaData: {
              module: 'Financial Wellness',
              location: 'Support - Financial Wellness',
            },
          });
          expect(mockedEventTracking).toHaveBeenNthCalledWith(2, {
            event: 'Click on Disable Earned Wage Access on Financial Wellness tab',
            categoryName: 'user action',
            metaData: {
              module: 'Financial Wellness',
              location: 'Support - Financial Wellness',
            },
          });
          expect(mockShowToast).toHaveBeenCalledWith({
            content:
              'We have successfully received your request. The process will be completed within one working day.',
          });
          expect(mockMutationFn).toHaveBeenCalledWith({});
        });
      });
    });

    const expectFailureBehaviors = () => {
      it('should track correct event and show toast', async () => {
        const { getByTestId } = render(<FinancialWellnessScreen />);

        const manageWageAccessSettingsCta = getByTestId('manage-your-wage-access-setting-cta');
        fireEvent.press(manageWageAccessSettingsCta);

        const disableEwaFeaturesButton = getByTestId('disable-ewa-features-button');
        fireEvent.press(disableEwaFeaturesButton);

        await waitFor(() => {
          expect(mockedEventTracking).toHaveBeenNthCalledWith(1, {
            event: 'Click on Manage your wage access settings on Financial Wellness tab',
            categoryName: 'user action',
            metaData: {
              module: 'Financial Wellness',
              location: 'Support - Financial Wellness',
            },
          });
          expect(mockedEventTracking).toHaveBeenNthCalledWith(2, {
            event: 'Click on Disable Earned Wage Access on Financial Wellness tab',
            categoryName: 'user action',
            metaData: {
              module: 'Financial Wellness',
              location: 'Support - Financial Wellness',
            },
          });
          expect(mockShowToast).toHaveBeenCalledWith({
            content: 'Failed to request disabling all earned wage access features',
          });
          expect(mockMutationFn).toHaveBeenCalledWith({});
        });
      });
    };

    describe('when getting instapay error', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockDisableEarnedWageAccessFeaturesMutation((input, res, ctx) => {
            mockMutationFn(input.variables);
            return res(
              ctx.data({
                instapay: {
                  disableEarnedWageAccessFeatures: { code: 'INVALID_REQUEST' } as InstapayError,
                },
              })
            );
          })
        );
      });

      expectFailureBehaviors();
    });

    describe('when unsuccessful', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockDisableEarnedWageAccessFeaturesMutation((input, res, ctx) => {
            mockMutationFn(input.variables);
            return res(
              ctx.data({
                instapay: {
                  disableEarnedWageAccessFeatures: { success: false } as DisableEarnedWageAccessFeaturesPayload,
                },
              })
            );
          })
        );
      });

      expectFailureBehaviors();
    });
  });
});
