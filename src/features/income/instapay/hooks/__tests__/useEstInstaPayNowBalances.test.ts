import { renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  CurrencyType,
  InstapayErrorCode,
  Sign,
  mockGetEstInstapayBalancesQuery,
} from '../../../../../new-graphql/generated';
import { useEstInstaPayNowBalances } from '../useEstInstaPayNowBalances';

describe('useEstInstaPayNowBalances', () => {
  it('should return balance and updatedAt when has estBalance', async () => {
    mockServerNode.use(
      mockGetEstInstapayBalancesQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              orgs: [
                {
                  instapay: {
                    estBalance: {
                      __typename: 'InstapayEstBalance',
                      id: 'uuid',
                      balance: {
                        units: 150,
                        subUnits: 10,
                        type: CurrencyType.CurrencyTypeAud,
                        sign: Sign.Positive,
                      },
                      createdAt: '2021-09-01T00:00:00Z',
                    },
                  },
                },
              ],
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useEstInstaPayNowBalances());
    await waitFor(() => {
      expect(result.current.estBalance).toEqual(150.1);
      expect(result.current.updatedAt).toEqual(new Date('2021-09-01T00:00:00Z'));
      expect(result.current.hasEstBalance).toBe(true);
    });
  });

  it('should return no balance when error', async () => {
    mockServerNode.use(
      mockGetEstInstapayBalancesQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              orgs: [
                {
                  instapay: {
                    estBalance: {
                      __typename: 'InstapayEstBalanceError',
                      code: InstapayErrorCode.EstInstapayBalanceNotFound,
                    },
                  },
                },
              ],
            },
          })
        );
      })
    );

    const { result } = renderHook(() => useEstInstaPayNowBalances());
    await waitFor(() => {
      expect(result.current.hasEstBalance).toBe(false);
    });
  });
});
