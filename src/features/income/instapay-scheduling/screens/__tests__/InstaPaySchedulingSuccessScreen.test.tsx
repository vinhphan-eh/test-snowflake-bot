import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedReplace } from '../../../../../../__mocks__/react-navigation';
import { PillarIds, WalletTabKeys } from '../../../../../common/constants/navigation';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { waitFor, render, type RenderAPI, fireEvent } from '../../../../../common/utils/testing';
import { InstaPaySchedulingSuccessScreen } from '../InstaPaySchedulingSuccessScreen';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockOptInEwaPushNotificationByFeatureMutation } from '../../../../../new-graphql/generated';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('InstaPaySchedulingSuccessScreen', () => {
  let renderAPI: RenderAPI;
  const mockedAmount = '$123';

  describe('for update', () => {
    beforeEach(() => {
      mockedUseRoute.mockReturnValue({
        params: {
          formattedAmount: mockedAmount,
          action: 'byAmountModification',
        },
        key: '',
        name: '',
      });

      renderAPI = render(<InstaPaySchedulingSuccessScreen />);
    });

    describe('On recurring by amount flow', () => {
      it('should render success message properly', async () => {
        await waitFor(() => {
          expect(
            renderAPI.getByText(`Cha-ching! You've scheduled to receive ${mockedAmount} whenever it’s ready 💸🎉`)
          ).toBeTruthy();
          expect(renderAPI.getByText('which could happen multiple times a month.')).toBeTruthy();
          expect(renderAPI.getByText('Done')).toBeTruthy();
        });
      });
    });

    describe('On recurring by day flow', () => {
      beforeEach(() => {
        mockedUseRoute.mockReturnValue({
          params: {
            formattedAmount: mockedAmount,
            action: 'byDayModification',
            payDay: 'Monday',
          },
          key: '',
          name: '',
        });

        renderAPI = render(<InstaPaySchedulingSuccessScreen />);
      });

      it('should render success message properly', async () => {
        await waitFor(() => {
          expect(
            renderAPI.getByText(`Cha-ching! You've scheduled to receive up to ${mockedAmount} on Monday 💸🎉`)
          ).toBeTruthy();
          expect(renderAPI.getByText('which could happen multiple times a month.')).toBeTruthy();
          expect(renderAPI.getByText('Done')).toBeTruthy();
        });
      });
    });

    it('should navigate back to Income dashboard if pressed Done button', async () => {
      await waitFor(() => {
        fireEvent.press(renderAPI.getByText('Done'));
      });

      expect(mockedSwitchPillar).toHaveBeenCalledWith({
        to: {
          pillarId: PillarIds.WalletApp,
          tab: WalletTabKeys.INCOME,
        },
      });
    });
  });

  describe('for cancellation', () => {
    beforeEach(() => {
      mockedUseRoute.mockReturnValue({
        params: {
          formattedAmount: mockedAmount,
          action: 'modification',
        },
        key: '',
        name: '',
      });

      renderAPI = render(<InstaPaySchedulingSuccessScreen />);
    });

    test('should render correctly', async () => {
      await waitFor(() => {
        expect(renderAPI.getByText(`Success`)).toBeTruthy();
        expect(renderAPI.getByText(`You've successfully cancelled your ongoing withdraw.`)).toBeTruthy();
        expect(renderAPI.getByText('Done')).toBeTruthy();
      });
    });

    test('should navigate to survey screen', () => {
      fireEvent.press(renderAPI.getByText('Done'));
      expect(mockedReplace).toHaveBeenCalledWith('InstaPaySchedulingOptOutSurvey');
    });
  });

  describe('for creation', () => {
    const mockedOrgId = 'organisationId';

    beforeEach(() => {
      mockedUseRoute.mockReturnValue({
        params: {
          formattedAmount: mockedAmount,
          action: 'creation',
          orgId: mockedOrgId,
        },
        key: '',
        name: '',
      });

      renderAPI = render(<InstaPaySchedulingSuccessScreen />);
    });

    describe('opt in push notification', () => {
      it('should render CTA to opt in push notification', async () => {
        await waitFor(() => {
          expect(renderAPI.getByText('Turn on push notifications')).toBeTruthy();
          expect(
            renderAPI.getByText(
              'Push notifications will be sent to you regarding your recurring schedule. Find out more.'
            )
          ).toBeTruthy();
          expect(renderAPI.getByText('Yes')).toBeTruthy();
        });
      });

      it('should navigate to push notification management screen if pressed on Find out more', async () => {
        fireEvent.press(renderAPI.getByText('Find out more.'));

        await waitFor(() => {
          expect(mockedReplace).toHaveBeenCalledWith('IncomeStack', {
            screen: 'EWAPushNotificationManagement',
            params: {
              orgId: mockedOrgId,
            },
          });
        });
      });

      describe('if pressed on Yes button to opt in', () => {
        it('should disable all buttons while opting in', async () => {
          mockServerNode.use(
            mockOptInEwaPushNotificationByFeatureMutation((_, res, ctx) => {
              return res(ctx.delay(3000));
            })
          );

          fireEvent.press(renderAPI.getByText('Yes'));

          // When switched to loading state, the Yes button is no more showing Yes caption
          await waitFor(() => {
            expect(renderAPI.queryByText('Yes')).not.toBeTruthy();
          });

          // During loading, none other buttons are pressable
          fireEvent.press(renderAPI.getByText('Find out more.'));
          fireEvent.press(renderAPI.getByText('Maybe later'));

          await waitFor(() => {
            expect(mockedReplace).not.toHaveBeenCalled();
            expect(mockedSwitchPillar).not.toHaveBeenCalled();
          });
        });

        it('should navigate to error screen if encountered error opting in', async () => {
          mockServerNode.use(
            mockOptInEwaPushNotificationByFeatureMutation((_, res, ctx) => {
              return res(ctx.status(400), ctx.errors([{ message: 'No org found!' }]));
            })
          );

          fireEvent.press(renderAPI.getByText('Yes'));

          await waitFor(() => {
            expect(mockedReplace).toHaveBeenCalledWith('InstaPaySchedulingError');
          });
        });

        it('should navigate to push notification management screen if successfully opted in', async () => {
          mockServerNode.use(
            mockOptInEwaPushNotificationByFeatureMutation((_, res, ctx) =>
              res(
                ctx.data({
                  ewaPushNotification: {
                    optInByFeature: {
                      success: true,
                    },
                  },
                })
              )
            )
          );

          fireEvent.press(renderAPI.getByText('Yes'));

          await waitFor(() => {
            expect(mockedReplace).toHaveBeenCalledWith('IncomeStack', {
              screen: 'EWAPushNotificationManagement',
              params: {
                orgId: mockedOrgId,
              },
            });
          });
        });
      });
    });
  });
});
