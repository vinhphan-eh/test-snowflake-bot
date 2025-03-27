import { mockServerNode } from '../../../mock-server/mockServerNode';
import {
  WalletSetupStatus,
  mockGetInstapaySchedulingVisibilityQuery,
  mockGetInstapayVisibilityQuery,
  mockGetOrgsQuery,
  mockGetWalletStatusQuery,
} from '../../../new-graphql/generated';
import { aHrOrg } from '../../../new-graphql/mocks/generated-mocks';
import { renderHook, waitFor } from '../../utils/testing';
import { useIncomeVisibility } from '../useIncomeVisibility';
import * as useIsWorkzoneModule from '../useIsWorkzone';

describe('useIncomeVisibility', () => {
  beforeEach(() => {
    mockServerNode.use(
      mockGetOrgsQuery((_, res, ctx) =>
        res(
          ctx.data({
            me: {
              orgs: [aHrOrg({ isIndependentContractor: false })],
            },
          })
        )
      )
    );
  });

  it.each`
    featureVisibilityShowInstapay | showEstIncome | expectedShowInstapay
    ${false}                      | ${true}       | ${false}
    ${false}                      | ${true}       | ${false}
    ${true}                       | ${true}       | ${true}
    ${true}                       | ${true}       | ${false}
    ${false}                      | ${true}       | ${false}
    ${false}                      | ${true}       | ${false}
    ${true}                       | ${true}       | ${false}
    ${true}                       | ${true}       | ${false}
  `(
    `showInstapay should work correctly when isCandidate is $isCandidate, featureVisibilityShowInstapay is $featureVisibilityShowInstapay`,
    async ({ expectedShowInstapay, featureVisibilityShowInstapay, showEstIncome }) => {
      mockServerNode.use(
        mockGetInstapayVisibilityQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                featureVisibility: {
                  instapayNow: {
                    showInstapay: featureVisibilityShowInstapay,
                    showEstIncome,
                    underMaintenance: false,
                  },
                },
              },
            })
          );
        }),
        mockGetWalletStatusQuery((_, res, ctx) =>
          res(
            ctx.data({
              me: {
                wallet: {
                  details: {
                    setupStatus: { status: WalletSetupStatus.Completed },
                    status: '',
                  },
                },
              },
            })
          )
        ),
        mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                featureVisibility: {
                  instapayScheduling: {
                    __typename: 'Permission',
                    view: true,
                  },
                },
              },
            })
          );
        })
      );

      const hook = renderHook(() => useIncomeVisibility());

      await waitFor(() => {
        expect(hook.result.current.showInstapay).toBe(expectedShowInstapay);
      });
    }
  );

  describe.each`
    instapayNowMaintenance | expectedInstaPayNowMaintenance
    ${true}                | ${true}
    ${false}               | ${false}
  `(
    'when instapayNowMaintenance from API is $instapayNowMaintenance',
    ({ expectedInstaPayNowMaintenance, instapayNowMaintenance }) => {
      beforeEach(() => {
        mockServerNode.use(
          mockGetInstapayVisibilityQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  featureVisibility: {
                    instapayNow: {
                      showInstapay: true,
                      showEstIncome: true,
                      underMaintenance: instapayNowMaintenance,
                    },
                  },
                },
              })
            );
          }),
          mockGetWalletStatusQuery((_, res, ctx) =>
            res(
              ctx.data({
                me: {
                  wallet: { details: { setupStatus: { status: WalletSetupStatus.Completed }, status: 'APPROVED' } },
                },
              })
            )
          ),
          mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
            return res(
              ctx.data({
                me: {
                  featureVisibility: {
                    instapayScheduling: {
                      __typename: 'Permission',
                      view: true,
                    },
                  },
                },
              })
            );
          })
        );
      });

      it(`return correct maintenance mode as returned from API`, async () => {
        const hook = renderHook(() => useIncomeVisibility());

        await waitFor(() => {
          expect(hook.result.current.instapayNowUnderMaintenance).toBe(expectedInstaPayNowMaintenance);
        });
      });
    }
  );

  describe('when one of APIs is failed', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockGetInstapayVisibilityQuery((_, res) => {
          return res.networkError('Oh no!!!');
        })
      );
    });

    it('should not show Income tab', async () => {
      const { result } = renderHook(() => useIncomeVisibility());
      await waitFor(() => {
        expect(result.current.showIncomeTab).toBe(false);
        expect(result.current.isError).toBe(true);
      });
    });
  });

  describe('when only having pay split but instapay visibility', () => {
    // This test is added since Pay Split has been moved to Spend tab
    it('should not show income tab', async () => {
      mockServerNode.use(
        mockGetInstapayVisibilityQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                featureVisibility: {
                  instapayNow: {
                    showInstapay: false,
                    showEstIncome: false,
                    underMaintenance: false,
                  },
                },
              },
            })
          );
        }),
        mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
          return res(
            ctx.data({
              me: {
                featureVisibility: {
                  instapayScheduling: {
                    __typename: 'Permission',
                    view: false,
                  },
                },
              },
            })
          );
        })
      );

      jest.spyOn(useIsWorkzoneModule, 'useIsWorkzone').mockReturnValue(false);

      const hook = renderHook(() => useIncomeVisibility());

      await waitFor(async () => {
        expect(hook.result.current.showIncomeTab).toBeFalsy();
      });
    });
  });
});

describe('checking InstaPay Scheduling visibility', () => {
  beforeEach(() => {
    mockServerNode.use(
      mockGetOrgsQuery((_, res, ctx) =>
        res(
          ctx.data({
            me: {
              orgs: [aHrOrg({ isIndependentContractor: false })],
            },
          })
        )
      )
    );
  });

  it('should return proper loading state when fetching the permission', async () => {
    mockServerNode.use(
      mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
        return res(ctx.delay(3000));
      })
    );

    const hook = renderHook(() => useIncomeVisibility());

    await waitFor(() => {
      expect(hook.result.current.instaPayScheduling).toStrictEqual({
        isLoading: true,
        isEligible: false,
      });
    });
  });

  it('should return visibility of false if failed the checking request', async () => {
    mockServerNode.use(
      mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
        return res(ctx.status(400), ctx.errors([{ message: 'Errors fetching permission' }]));
      })
    );

    const hook = renderHook(() => useIncomeVisibility());

    await waitFor(() => {
      expect(hook.result.current.instaPayScheduling).toStrictEqual({
        isLoading: false,
        isEligible: false,
      });
    });
  });

  it('should return correct visibility if successfully fetched the permission', async () => {
    mockServerNode.use(
      mockGetInstapaySchedulingVisibilityQuery((_, res, ctx) => {
        return res(
          ctx.data({
            me: {
              featureVisibility: {
                instapayScheduling: {
                  __typename: 'Permission',
                  view: true,
                },
              },
            },
          })
        );
      })
    );

    const hook = renderHook(() => useIncomeVisibility());

    await waitFor(() => {
      expect(hook.result.current.instaPayScheduling).toStrictEqual({
        isLoading: false,
        isEligible: true,
      });
    });
  });
});
