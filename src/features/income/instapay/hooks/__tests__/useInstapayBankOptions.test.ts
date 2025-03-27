import { renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import {
  FeeType,
  InstapayBankAccountSource,
  mockGetBankAccountsForOrgQuery,
} from '../../../../../new-graphql/generated';
import { useInstapayBankOptions } from '../useInstapayBankOptions';

describe('useInstapayBankOptions', () => {
  describe('when API success', () => {
    describe('when has SSA in instapay bank_accounts', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockGetBankAccountsForOrgQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  org: {
                    instapay: {
                      bankAccounts: [
                        {
                          accountName: 'test',
                          accountNumber: '11209000',
                          bankAccountSource: InstapayBankAccountSource.Eh,
                          bsb: '123456',
                          feeV2: {
                            type: FeeType.Percentage,
                            percentage: 1.5,
                          },
                          externalId: '123456',
                          isSSA: false,
                        },
                        {
                          accountName: 'ssa',
                          accountNumber: '9999999',
                          bankAccountSource: InstapayBankAccountSource.Swag,
                          bsb: '621222',
                          feeV2: {
                            type: FeeType.Percentage,
                            percentage: 1.3,
                          },
                          externalId: '123456',
                          isSSA: true,
                        },
                      ],
                    },
                  },
                },
              })
            );
          })
        );
      });

      it('should push SSA to top and return correct', async () => {
        const { result } = renderHook(() => useInstapayBankOptions());
        await waitFor(() => {
          expect(result.current.isLoading).toBe(false);
          expect(result.current.accounts).toStrictEqual([
            {
              accountName: 'ssa',
              accountNumber: '9999999',
              bankAccountSource: InstapayBankAccountSource.Swag,
              bsb: '621222',
              feeV2: {
                type: FeeType.Percentage,
                percentage: 1.3,
              },
              externalId: '123456',
              isSSA: true,
            },
            {
              accountName: 'test',
              accountNumber: '11209000',
              bankAccountSource: InstapayBankAccountSource.Eh,
              bsb: '123456',
              feeV2: {
                type: FeeType.Percentage,
                percentage: 1.5,
              },
              externalId: '123456',
              isSSA: false,
            },
          ]);
        });
      });
    });

    describe('when not has SSA in instapay bank_accounts', () => {
      beforeEach(() => {
        mockServerNode.use(
          mockGetBankAccountsForOrgQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  org: {
                    instapay: {
                      bankAccounts: [
                        {
                          accountName: 'test',
                          accountNumber: '21213',
                          bankAccountSource: InstapayBankAccountSource.Eh,
                          bsb: '3232322',
                          feeV2: {
                            type: FeeType.Percentage,
                            percentage: 1.5,
                          },
                          externalId: '11232132',
                          isSSA: false,
                        },
                        {
                          accountName: 'test',
                          accountNumber: '11209000',
                          bankAccountSource: InstapayBankAccountSource.Swag,
                          bsb: '123456',
                          feeV2: {
                            type: FeeType.Percentage,
                            percentage: 1.5,
                          },
                          externalId: '123456',
                          isSSA: false,
                        },
                      ],
                    },
                  },
                },
              })
            );
          })
        );
      });

      it('should return correct', async () => {
        const { result } = renderHook(() => useInstapayBankOptions());
        await waitFor(() => {
          expect(result.current.isLoading).toBe(false);
          expect(result.current.accounts).toStrictEqual([
            {
              accountName: 'test',
              accountNumber: '21213',
              bankAccountSource: InstapayBankAccountSource.Eh,
              bsb: '3232322',
              feeV2: {
                type: FeeType.Percentage,
                percentage: 1.5,
              },
              externalId: '11232132',
              isSSA: false,
            },
            {
              accountName: 'test',
              accountNumber: '11209000',
              bankAccountSource: InstapayBankAccountSource.Swag,
              bsb: '123456',
              feeV2: {
                type: FeeType.Percentage,
                percentage: 1.5,
              },
              externalId: '123456',
              isSSA: false,
            },
          ]);
        });
      });
    });
  });
});
