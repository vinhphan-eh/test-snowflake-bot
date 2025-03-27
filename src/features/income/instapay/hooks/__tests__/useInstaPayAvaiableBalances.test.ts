import { waitFor } from '@testing-library/react-native';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseIsAccountUK } from '../../../../../common/hooks/__mocks__/useIsAccountUK';
import { EventTrackingCategory } from '../../../../../common/stores/useSessionStore';
import { renderHook } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockGetAllInstapayAvailableBalancesQuery } from '../../../../../new-graphql/generated';
import { REQUEST_GET_ALL_INSTAPAY_AVAILABLE_BALANCES } from '../../../../support/constants/mixpanel';
import { INSTAPAY_MODULE_NAME } from '../../constants/trackingEvents';
import { TestGetInstaPayAvailableBalancesQueryData } from '../../utils/test-objects';
import { useInstaPayAvailableBalances } from '../useInstaPayAvailableBalances';

beforeEach(() => {
  mockServerNode.use(
    mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
      return res(ctx.data(TestGetInstaPayAvailableBalancesQueryData));
    })
  );
});

describe('useInstaPayAvaiableBalances', () => {
  it('should calculate sum of balances which reach minimum', async () => {
    const { result } = renderHook(() => useInstaPayAvailableBalances({ enabled: true, location: 'in test' }));

    await waitFor(() => {
      expect(result.current.sumReachedMinimumBalances).toEqual(90);
    });
  });

  it('should return only orgs having access to InstaPay', async () => {
    const { result } = renderHook(() => useInstaPayAvailableBalances({ enabled: true, location: 'in test' }));
    await waitFor(() => {
      expect(result.current.orgs.map(org => org.uuid)).toContain('org-has-permission');
      expect(result.current.orgs.map(org => org.uuid)).not.toContain('org-has-no-permission');
    });
  });

  it('send event to Mixpanel', async () => {
    renderHook(() => useInstaPayAvailableBalances({ enabled: true, location: 'in test' }));
    await waitFor(() => {
      expect(mockedEventTracking).toHaveBeenCalledWith({
        event: REQUEST_GET_ALL_INSTAPAY_AVAILABLE_BALANCES,
        categoryName: EventTrackingCategory.NETWORK,
        metaData: {
          module: INSTAPAY_MODULE_NAME,
          location: 'in test',
        },
      });
    });
  });

  describe('fallback to ebfCountry if workCountry is not available', () => {
    beforeEach(() => {
      const mockData = { ...TestGetInstaPayAvailableBalancesQueryData };
      const firstMember = mockData.me?.orgs[0].member;
      if (firstMember) {
        firstMember.work_country = undefined;
      }

      mockServerNode.use(
        mockGetAllInstapayAvailableBalancesQuery((_, res, ctx) => {
          return res(ctx.data(mockData));
        })
      );
    });
    it('should fallback to GB', async () => {
      mockUseIsAccountUK.mockReturnValue(true);
      const { result } = renderHook(() => useInstaPayAvailableBalances({ enabled: true, location: 'in test' }));
      await waitFor(() => {
        expect(result.current.country).toEqual('GB');
      });
    });
    it('should fallback to AU', async () => {
      mockUseIsAccountUK.mockReturnValue(false);
      const { result } = renderHook(() => useInstaPayAvailableBalances({ enabled: true, location: 'in test' }));
      await waitFor(() => {
        expect(result.current.country).toEqual('AU');
      });
    });
  });
});
