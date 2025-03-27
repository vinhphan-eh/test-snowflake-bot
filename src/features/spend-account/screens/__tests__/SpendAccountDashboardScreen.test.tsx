import React from 'react';
import { Platform, Share } from 'react-native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { sleep } from '../../../../../e2e/utils/common-actions';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import {
  mockUseIsAccountUK,
  mockUseIsAccountUKWithLoadingState,
} from '../../../../common/hooks/__mocks__/useIsAccountUK';
import { usePasscodeStore } from '../../../../common/screens/passcode';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { fireEvent, render, renderHook, waitFor, waitForElementToBeRemoved } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import {
  CardStatus,
  IdvProfileStatus,
  NotificationStatus,
  WalletNotificationType,
  WalletSetupStatus,
  mockGetCurrentCardDetailsQuery,
  mockGetCurrentCardMetaQuery,
  mockGetCurrentUserQuery,
  mockGetEWalletAuAccountDetailsQuery,
  mockGetEWalletUkAccountDetailsQuery,
  mockGetIdvProfileV2Query,
  mockGetOrgsQuery,
  mockGetPersistentNotificationsQuery,
  mockGetWalletStatusQuery,
} from '../../../../new-graphql/generated';
import { mockInfiniteGetWalletTransactionsV2Query } from '../../../../new-graphql/handlers/custom-mock/walletTransactions';
import {
  aFinancialTransaction,
  aHrOrg,
  aPersistentNotification,
  aSetupStatus,
  aUserDetails,
  aWalletDetails,
  anIdvProfile,
  anUkWalletDetails,
} from '../../../../new-graphql/mocks/generated-mocks';
import { SpendAccountDashboardScreen } from '../SpendAccountDashboardScreen';

const spinnerTimeout = 3000;

describe('Spend Account Dashboard Screen', () => {
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
    eBenStash: {
      view: true,
    },
    heroPoints: {
      view: false,
    },
  };

  beforeEach(() => {
    usePermissionStore.setState({ permissions: initialPermissionsState });

    mockServerNode.use(
      mockGetWalletStatusQuery((_, res, context) =>
        res(
          context.data({
            me: {
              wallet: {
                details: {
                  setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                  status: '',
                },
              },
            },
          })
        )
      ),
      mockGetCurrentCardDetailsQuery((_, res, context) =>
        res(context.data({ me: { wallet: { card: { details: { id: '', status: CardStatus.Inactive } } } } }))
      ),
      mockGetCurrentCardMetaQuery((_, res, context) => res(context.data({}))),
      mockGetEWalletUkAccountDetailsQuery((_, res, context) =>
        res(
          context.data({
            me: {
              wallet: {
                UKWalletDetails: undefined,
              },
            },
          })
        )
      )
    );

    mockUseIsAccountUKWithLoadingState.mockReturnValue({ isUKaccount: true, isLoading: false, isFetched: true });
  });

  describe('for AU users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('AU');
      mockUseIsAccountUK.mockReturnValue(false);
    });

    describe(`Onboarding flow haven't done yet`, () => {
      test('should render only onboarding flow button when user go first time', async () => {
        mockServerNode.use(
          mockGetCurrentCardDetailsQuery((_, res, ctx) =>
            res(ctx.data({ me: { wallet: { card: { details: { id: '', status: CardStatus.Inactive } } } } }))
          ),
          mockGetEWalletAuAccountDetailsQuery((_, res, context) => res(context.data({ me: { wallet: undefined } }))),
          mockGetCurrentUserQuery((_, res, context) => {
            return res(context.data({ me: { details: null } }));
          }),
          mockGetWalletStatusQuery((_, res, context) => {
            return res(context.data({ me: { wallet: null } }));
          })
        );

        const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        await waitFor(async () => {
          const setupBtn = await findByLabelText('Set up now');
          expect(setupBtn).toBeDefined();
        });
      });

      test('should render only onboarding flow button when ewallet is in progress', async () => {
        mockServerNode.use(
          mockGetWalletStatusQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  wallet: {
                    details: {
                      setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                      status: '',
                    },
                  },
                },
              })
            )
          ),
          mockGetEWalletAuAccountDetailsQuery((_, res, context) => res(context.data({ me: { wallet: undefined } }))),
          mockGetCurrentCardDetailsQuery((_, res, ctx) =>
            res(ctx.data({ me: { wallet: { card: { details: { id: '', status: CardStatus.Inactive } } } } }))
          )
        );

        const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        await waitFor(async () => {
          const setupBtn = await findByLabelText('Set up now');
          expect(setupBtn).toBeDefined();
        });
      });

      describe('ID Verifcation', () => {
        test('should navigate to start of onboarding if user idv profile is none', async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                        status: '',
                      },
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetIdvProfileV2Query((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      IDVProfile: anIdvProfile({ status: IdvProfileStatus.None }),
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: undefined } }), context.delay(0))
            ),
            mockGetCurrentCardDetailsQuery((_, res, ctx) =>
              res(ctx.data({ me: { wallet: { card: { details: undefined } } } }), ctx.delay(0))
            )
          );

          const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const setupSpendAccountBtn = await findByLabelText('Set up now');

          fireEvent.press(setupSpendAccountBtn);

          await waitFor(() => {
            expect(queryByLabelText('Set up account')).toBeFalsy();
          });
        });

        test('should navigate to IDV verification check if user idv profile is unchecked', async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                        status: '',
                      },
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetIdvProfileV2Query((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      IDVProfile: anIdvProfile({ status: IdvProfileStatus.Unchecked }),
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: undefined } }), context.delay(0))
            ),
            mockGetCurrentCardDetailsQuery((_, res, ctx) =>
              res(ctx.data({ me: { wallet: { card: { details: undefined } } } }), ctx.delay(0))
            )
          );

          const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const setupSpendAccountBtn = await findByLabelText('Set up now');

          fireEvent.press(setupSpendAccountBtn);

          await waitFor(() => {
            expect(queryByLabelText('Scan my ID')).toBeFalsy();
          });
        });

        test('should navigate to checking details if user has passed IDV', async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                        status: '',
                      },
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetIdvProfileV2Query((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      IDVProfile: anIdvProfile({ status: IdvProfileStatus.Pass }),
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: undefined } }), context.delay(0))
            ),
            mockGetCurrentCardDetailsQuery((_, res, ctx) =>
              res(ctx.data({ me: { wallet: { card: { details: undefined } } } }), ctx.delay(0))
            )
          );

          const { findByLabelText, queryByLabelText, queryByText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const setupSpendAccountBtn = await findByLabelText('Set up now');

          fireEvent.press(setupSpendAccountBtn);

          await waitFor(() => {
            expect(queryByText('Checking your details')).toBeFalsy();
          });
        });
      });
    });

    describe(`Onboarding flow done`, () => {
      test('should render all buttons', async () => {
        mockServerNode.use(
          mockGetWalletStatusQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  wallet: {
                    details: {
                      setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                      status: '',
                    },
                  },
                },
              })
            )
          ),
          mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
            res(context.data({ me: { wallet: { details: aWalletDetails() } } }))
          ),
          mockGetCurrentCardDetailsQuery((_, res, ctx) =>
            res(ctx.data({ me: { wallet: { card: { details: { id: '123', status: CardStatus.Inactive } } } } }))
          )
        );

        const { findByTestId, queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        const accountDetails = await findByTestId('account-details-menu-item');
        const paymentFAB = await findByTestId('payment-fab');
        expect(accountDetails).toBeDefined();
        expect(paymentFAB).toBeDefined();
      });

      describe('Account details button', () => {
        it('should show account detail if exist', async () => {
          const walletDetails = aWalletDetails();
          mockServerNode.use(
            mockGetEWalletAuAccountDetailsQuery((_, res, context) => {
              return res(context.data({ me: { wallet: { details: walletDetails } } }));
            })
          );
          const { queryAllByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          await waitFor(() => {
            // TODO: Currently Pressable doesn't render title prop in test, so this is not testable now.
            // expect(queryByText(accountNumberAndBsbText)).toBeTruthy();
            expect(queryAllByLabelText('Share account details')).toBeTruthy();
          });
        });

        it('should share account details once clicking', async () => {
          const walletDetails = aWalletDetails({});
          const mockShare = jest.fn();
          Share.share = mockShare;
          const user = aUserDetails();

          mockServerNode.use(
            mockGetEWalletAuAccountDetailsQuery((_, res, context) => {
              return res(context.data({ me: { wallet: { details: walletDetails } } }));
            }),
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                        status: '',
                      },
                    },
                  },
                })
              )
            ),
            mockGetCurrentUserQuery((_, res, context) => {
              return res(context.data({ me: { details: user } }));
            }),
            mockGetCurrentCardDetailsQuery((_, res, ctx) =>
              res(
                ctx.data({
                  me: { wallet: { card: { details: { id: '123', status: CardStatus.Inactive } } } },
                })
              )
            )
          );

          const { findByText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const accountCard = await findByText('Account details');
          fireEvent.press(accountCard);
          await waitFor(() =>
            expect(mockShare).toHaveBeenCalledWith({
              message: `Here are my Swag Spend account details:\nName: ${user?.firstName} ${user?.lastName}\nBSB: ${walletDetails?.bsb}\nAccount number: ${walletDetails?.accountNumber}`,
            })
          );
        });
      });

      describe('Continue setting up button', () => {
        test('should render correctly', async () => {
          Platform.OS = 'ios';
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                        status: '',
                      },
                    },
                  },
                })
              )
            ),
            mockGetCurrentCardDetailsQuery((_, res, ctx) =>
              res(
                ctx.data({
                  me: { wallet: { card: { details: { id: '1234', status: CardStatus.Inactive } } } },
                })
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: { details: aWalletDetails() } } }))
            ),
            mockGetOrgsQuery((_, res, ctx) => {
              return res(
                ctx.data({
                  me: {
                    orgs: [aHrOrg({})],
                  },
                })
              );
            })
          );

          const { findByTestId, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          await waitFor(async () => {
            const continueCTA = await findByTestId('Continue setting up your Spend account');
            fireEvent.press(continueCTA);
            expect(mockedNavigate).toHaveBeenCalled();
          });
        });

        test(`should not show the button when it's done`, async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                        status: '',
                      },
                    },
                  },
                })
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: { details: aWalletDetails() } } }))
            ),
            mockGetCurrentCardDetailsQuery((_, res, ctx) =>
              res(
                ctx.data({
                  me: { wallet: { card: { details: { id: '123', status: CardStatus.Inactive } } } },
                })
              )
            )
          );

          const { queryByLabelText, queryByText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          await waitFor(() => {
            expect(queryByText('Continue setting up your Spend account')).toBeFalsy();
          });
        });
      });

      describe('Finish digital wallet setup', () => {
        describe('Apple Pay', () => {
          test('should render correctly', async () => {
            Platform.OS = 'ios';

            mockServerNode.use(
              mockGetPersistentNotificationsQuery((_, res, ctx) =>
                res(
                  ctx.data({
                    me: {
                      wallet: {
                        persistentNotifications: [
                          aPersistentNotification({
                            type: WalletNotificationType.ApplePayReminder_24Hrs,
                            notificationStatus: NotificationStatus.Active,
                          }),
                        ],
                      },
                    },
                  }),
                  ctx.delay(0)
                )
              )
            );

            const { findByLabelText, findByText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
            await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

            const finishSettingUpDigitalWalletCta = await findByLabelText('Finish setting up Apple Pay.');

            fireEvent.press(finishSettingUpDigitalWalletCta);

            expect(await findByText('Finish setting up Apple Pay.')).toBeTruthy();
            expect(mockedNavigate).toHaveBeenCalled();
          });
        });

        describe('Google Pay', () => {
          test('should render correctly', async () => {
            Platform.OS = 'android';

            mockServerNode.use(
              mockGetPersistentNotificationsQuery((_, res, ctx) =>
                res(
                  ctx.data({
                    me: {
                      wallet: {
                        persistentNotifications: [
                          aPersistentNotification({
                            type: WalletNotificationType.GooglePay_24HrsPartialProvisioning,
                            notificationStatus: NotificationStatus.Active,
                          }),
                        ],
                      },
                    },
                  }),
                  ctx.delay(0)
                )
              )
            );

            const { findByLabelText, findByText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
            await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

            const finishSettingUpDigitalWalletCta = await findByLabelText('Finish setting up Google Pay.');

            fireEvent.press(finishSettingUpDigitalWalletCta);

            expect(await findByText('Finish setting up Google Pay.')).toBeTruthy();
            expect(mockedNavigate).toHaveBeenCalled();
          });
        });

        test(`should clear notification when dismissed`, async () => {
          mockServerNode.use(
            mockGetPersistentNotificationsQuery((_, res, ctx) =>
              res(
                ctx.data({
                  me: {
                    wallet: {
                      persistentNotifications: [
                        aPersistentNotification({
                          type: WalletNotificationType.ApplePayReminder_24Hrs,
                          notificationStatus: NotificationStatus.Active,
                        }),
                      ],
                    },
                  },
                }),
                ctx.delay(0)
              )
            )
          );

          const { findByTestId, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const clearApplePayNotification = await findByTestId('finish-setting-up-digital-wallet');

          fireEvent.press(clearApplePayNotification);

          await waitFor(() => {
            expect(queryByLabelText('Finish setting up Apple Pay.')).toBeFalsy();
          });
        });
      });
    });
  });

  describe('for UK users', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('GB');
      mockUseIsAccountUK.mockReturnValue(true);
    });

    describe(`Onboarding flow haven't done yet`, () => {
      beforeEach(() => {
        mockServerNode.use(
          mockGetEWalletUkAccountDetailsQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  wallet: {
                    UKWalletDetails: undefined,
                  },
                },
              })
            )
          )
        );
      });

      test('should render only onboarding flow button when user go first time', async () => {
        mockServerNode.use(
          mockGetCurrentUserQuery((_, res, context) => {
            return res(context.data({ me: { details: null } }));
          }),
          mockGetWalletStatusQuery((_, res, context) => {
            return res(context.data({ me: { wallet: null } }));
          })
        );

        const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        await waitFor(async () => {
          const setupBtn = await findByLabelText('Set up now');
          expect(setupBtn).toBeDefined();
        });
      });

      test('should render only onboarding flow button when ewallet is in progress', async () => {
        mockServerNode.use(
          mockGetWalletStatusQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  wallet: {
                    details: {
                      setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                      status: '',
                    },
                  },
                },
              })
            )
          )
        );

        const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        await waitFor(async () => {
          const setupBtn = await findByLabelText('Set up now');
          expect(setupBtn).toBeDefined();
        });
      });

      describe('ID Verifcation', () => {
        test('should navigate to start of onboarding if user idv profile is none', async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                        status: '',
                      },
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetIdvProfileV2Query((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      IDVProfile: anIdvProfile({ status: IdvProfileStatus.None }),
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: undefined } }), context.delay(0))
            )
          );

          const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const setupSpendAccountBtn = await findByLabelText('Set up now');

          fireEvent.press(setupSpendAccountBtn);

          await waitFor(() => {
            expect(queryByLabelText('Set up account')).toBeFalsy();
          });
        });

        test('should navigate to IDV verification check if user idv profile is unchecked', async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }),
                        status: '',
                      },
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetIdvProfileV2Query((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      IDVProfile: anIdvProfile({ status: IdvProfileStatus.Unchecked }),
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: undefined } }), context.delay(0))
            )
          );

          const { findByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const setupSpendAccountBtn = await findByLabelText('Set up now');

          fireEvent.press(setupSpendAccountBtn);

          await waitFor(() => {
            expect(queryByLabelText('Scan my ID')).toBeFalsy();
          });
        });

        test('should navigate to checking details if user has passed IDV', async () => {
          mockServerNode.use(
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: { setupStatus: aSetupStatus({ status: WalletSetupStatus.InProgress }), status: '' },
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetIdvProfileV2Query((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      IDVProfile: anIdvProfile({ status: IdvProfileStatus.Pass }),
                    },
                  },
                }),
                context.delay(0)
              )
            ),
            mockGetEWalletAuAccountDetailsQuery((_, res, context) =>
              res(context.data({ me: { wallet: undefined } }), context.delay(0))
            )
          );

          const { findByLabelText, queryByLabelText, queryByText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const setupSpendAccountBtn = await findByLabelText('Set up now');

          fireEvent.press(setupSpendAccountBtn);

          await waitFor(() => {
            expect(queryByText('Checking your details')).toBeFalsy();
          });
        });
      });
    });

    describe(`Onboarding flow done`, () => {
      test('should render all buttons', async () => {
        mockServerNode.use(
          mockGetWalletStatusQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  wallet: {
                    details: { setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }), status: '' },
                  },
                },
              })
            )
          ),
          mockGetEWalletUkAccountDetailsQuery((_, res, context) =>
            res(
              context.data({
                me: {
                  wallet: {
                    UKWalletDetails: anUkWalletDetails(),
                  },
                },
              })
            )
          )
        );

        const { findByTestId, queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        const accountDetails = await findByTestId('account-details-menu-item');
        const paymentFAB = await findByTestId('payment-fab');
        expect(accountDetails).toBeDefined();
        expect(paymentFAB).toBeDefined();
      });

      describe('Account details button', () => {
        it('should show account detail if exist', async () => {
          const walletDetails = anUkWalletDetails();
          mockServerNode.use(
            mockGetEWalletUkAccountDetailsQuery((_, res, context) => {
              return res(
                context.data({
                  me: {
                    wallet: {
                      UKWalletDetails: walletDetails,
                    },
                  },
                })
              );
            })
          );
          const { queryAllByLabelText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          await waitFor(() => {
            // TODO: Currently Pressable doesn't render title prop in test, so this is not testable now.
            // expect(queryByText(accountNumberAndBsbText)).toBeTruthy();
            expect(queryAllByLabelText('Share account details')).toBeTruthy();
          });
        });

        it('should share account details once clicking', async () => {
          const walletDetails = anUkWalletDetails({});
          const mockShare = jest.fn();
          Share.share = mockShare;
          const user = aUserDetails();

          mockServerNode.use(
            mockGetEWalletUkAccountDetailsQuery((_, res, context) => {
              return res(
                context.data({
                  me: {
                    wallet: {
                      UKWalletDetails: walletDetails,
                    },
                  },
                })
              );
            }),
            mockGetWalletStatusQuery((_, res, context) =>
              res(
                context.data({
                  me: {
                    wallet: {
                      details: {
                        setupStatus: aSetupStatus({ status: WalletSetupStatus.Completed }),
                        status: '',
                      },
                    },
                  },
                })
              )
            ),
            mockGetCurrentUserQuery((_, res, context) => {
              return res(context.data({ me: { details: user } }));
            })
          );

          const { findByText, queryByLabelText } = render(<SpendAccountDashboardScreen />);
          await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

          const accountCard = await findByText('Account details');
          await sleep(1000);
          fireEvent.press(accountCard);
          await waitFor(() =>
            expect(mockShare).toHaveBeenCalledWith({
              message: `Here are my Swag Spend account details:\nName: ${user?.firstName} ${user?.lastName}\nSort code: ${walletDetails?.sortCode}\nAccount number: ${walletDetails?.accountNumber}`,
            })
          );
        });
      });
    });

    describe('transactions', () => {
      it('should show passcode/biometrics if there is a transaction over 180 days', async () => {
        mockUseIsAccountUK.mockReturnValue(true);

        mockServerNode.use(
          mockInfiniteGetWalletTransactionsV2Query((_, res, context) => {
            return res(
              context.data({
                me: {
                  wallet: {
                    transactions: [
                      aFinancialTransaction({ dateTimeUTC: new Date().toISOString() }),
                      aFinancialTransaction(),
                    ],
                  },
                },
              })
            );
          })
        );
        const mockSetRequirePasscode = jest.fn((_: boolean, func?: () => void) => func?.());
        const { result: passcodeStore } = renderHook(() => usePasscodeStore());

        passcodeStore.current.setRequirePasscode = mockSetRequirePasscode;

        const { queryByLabelText } = render(<SpendAccountDashboardScreen />);
        await waitForElementToBeRemoved(() => queryByLabelText('spinner'), { timeout: spinnerTimeout });

        await waitFor(() => {
          expect(mockSetRequirePasscode).toHaveBeenCalledWith(true, expect.anything(), expect.anything());
        });
      });
    });
  });
});
