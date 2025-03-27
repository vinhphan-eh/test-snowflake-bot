import React from 'react';
import { BalanceCard } from './BalanceCard';
import { mockServerNode } from '../../../mock-server/mockServerNode';
import {
  mockGetHeroPointsBalanceQuery,
  mockGetHeroPointsPaymentPreferencesQuery,
} from '../../../new-graphql/generated';
import { useSpendHPOnSwagCardVisiblity } from '../../hooks/useHeroPointsVisibility';
import { render } from '../../utils/testing';

jest.mock('../../../../src/common/hooks/useHeroPointsVisibility', () => ({
  useSpendHPOnSwagCardVisiblity: jest.fn(),
}));

const mockUseSpendHPOnSwagCardVisiblity = useSpendHPOnSwagCardVisiblity as jest.MockedFunction<
  typeof useSpendHPOnSwagCardVisiblity
>;

describe('Balance Card', () => {
  describe('the balance number', () => {
    beforeEach(() => {
      mockUseSpendHPOnSwagCardVisiblity.mockReturnValue(true);
      mockServerNode.use(
        mockGetHeroPointsBalanceQuery((_, res, context) => {
          return res(
            context.data({
              me: {
                heroPoints: {
                  balance: 1000,
                },
              },
            })
          );
        }),
        mockGetHeroPointsPaymentPreferencesQuery((_, res, context) => {
          return res(
            context.data({
              me: {
                heroPoints: {
                  paymentPreferences: {
                    payWithHPOnSwagCard: true,
                  },
                },
              },
            })
          );
        })
      );
    });
    it('should render title and icons correctly', () => {
      const { getByTestId, getByText } = render(
        <BalanceCard balance={1234.57} title="a title" icon="activate" iconTestId="icon id" />
      );

      expect(getByText('a title')).toBeTruthy();
      expect(getByTestId('icon id')).toBeTruthy();
    });

    it('should not render icon when icon is null', () => {
      const { queryByTestId } = render(<BalanceCard balance={1234.57} title="a title" />);

      expect(queryByTestId('icon test id')).toBeNull();
    });

    it('should render decimal places correctly', () => {
      const { getByText } = render(<BalanceCard balance={1234.57} title="a title" />);

      expect(getByText('$1,234')).toBeTruthy();
      expect(getByText('.57')).toBeTruthy();

      expect(getByText('a title')).toBeTruthy();
    });
    it('should render integer correctly', () => {
      const { getByText } = render(<BalanceCard balance={1234} title="a title" />);

      expect(getByText('$1,234')).toBeTruthy();
      expect(getByText('.00')).toBeTruthy();
    });

    it('renders balance number with precision 2 by default', () => {
      const { getByText } = render(<BalanceCard balance={112.25834} title="a title" />);

      expect(getByText('$112')).toBeTruthy();
      expect(getByText('.26')).toBeTruthy();
    });

    it('when hero points balance is greater than balance', async () => {
      mockServerNode.use(
        mockGetHeroPointsBalanceQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                heroPoints: {
                  balance: 1000,
                },
              },
            })
          );
        }),
        mockGetHeroPointsPaymentPreferencesQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                heroPoints: {
                  paymentPreferences: {
                    payWithHPOnSwagCard: true,
                  },
                },
              },
            })
          );
        })
      );
      const { findByTestId } = render(<BalanceCard balance={9} enabledRemindBalance title="a title" />);

      expect(await findByTestId('remind message')).toBeTruthy();
    });

    it.each`
      balance | enabledRemindBalance | payWithHPOnSwagCardData | spendHDOnSwagCardPermission | remindMessage                                         | expected
      ${9}    | ${false}             | ${false}                | ${false}                    | ${'Balance is low, top up to spend with Hero Points'} | ${false}
      ${9}    | ${true}              | ${true}                 | ${true}                     | ${'Balance is low, top up to spend with Hero Points'} | ${true}
      ${11}   | ${false}             | ${true}                 | ${true}                     | ${'Balance is low, top up to spend with Hero Points'} | ${false}
      ${11}   | ${true}              | ${false}                | ${true}                     | ${'Balance is low, top up to spend with Hero Points'} | ${false}
      ${11}   | ${true}              | ${true}                 | ${false}                    | ${'Balance is low, top up to spend with Hero Points'} | ${false}
      ${9}    | ${true}              | ${true}                 | ${true}                     | ${'Balance is low, top up to spend with Hero Points'} | ${true}
      ${11}   | ${true}              | ${true}                 | ${true}                     | ${'Balance is low, top up to spend with Hero Points'} | ${false}
    `(
      'when hero points balance is smaller than 10 and all conditions are true',
      async ({
        balance,
        enabledRemindBalance,
        expected,
        payWithHPOnSwagCardData,
        remindMessage,
        spendHDOnSwagCardPermission,
      }) => {
        mockServerNode.resetHandlers();
        mockUseSpendHPOnSwagCardVisiblity.mockReturnValue(spendHDOnSwagCardPermission);
        mockServerNode.use(
          mockGetHeroPointsBalanceQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  heroPoints: {
                    balance: 1000,
                  },
                },
              })
            );
          }),
          mockGetHeroPointsPaymentPreferencesQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  heroPoints: {
                    paymentPreferences: {
                      payWithHPOnSwagCard: payWithHPOnSwagCardData,
                    },
                  },
                },
              })
            );
          })
        );

        const { findByText, queryByText } = render(
          <BalanceCard balance={balance} enabledRemindBalance={enabledRemindBalance} title="a title" />
        );

        if (expected) {
          expect(await findByText(remindMessage)).toBeTruthy();
        } else {
          expect(queryByText(remindMessage)).toBeNull();
        }
      }
    );

    describe('currency as points', () => {
      it('should render correctly', () => {
        const { getByText } = render(<BalanceCard balance={1234} title="a title" currency="POINTS" />);

        expect(getByText('1,234')).toBeTruthy();
        expect(getByText('PTS')).toBeTruthy();
      });
    });
  });
});
