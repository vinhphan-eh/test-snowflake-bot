import { WalletTabKeys } from '../../constants/navigation';
import { renderHook } from '../../utils/testing';
import { useGetMoneyTabs } from '../useGetMoneyTabs';
import { useGetMoneyTabsWithIcon } from '../useGetMoneyTabsWithIcon';

const mockUseGetMoneyTabs = useGetMoneyTabs as jest.MockedFn<typeof useGetMoneyTabs>;

jest.mock('../useGetMoneyTabs');

describe('useGetMoneyTabsWithIcon', () => {
  it('should return an array of tabs with icon', () => {
    mockUseGetMoneyTabs.mockReturnValue([
      {
        key: WalletTabKeys.SPEND,
        name: 'Spend',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.STASH,
        name: 'Stash',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.INCOME,
        name: 'Income',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.BILL_MANAGEMENT,
        name: 'Bill Management',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.HERO_DOLLARS,
        name: 'Hero Dollars',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.HERO_POINTS,
        name: 'Points',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.CARD,
        name: 'Card',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.SUPER,
        name: 'Super',
        module: 'money',
        onPress: expect.any(Function),
      },
      {
        key: WalletTabKeys.SUPPORT,
        name: 'Support',
        module: 'money',
        onPress: expect.any(Function),
      },
    ]);
    const { result } = renderHook(() => useGetMoneyTabsWithIcon());

    expect(result.current).toEqual([
      {
        key: WalletTabKeys.SPEND,
        name: 'Spend',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'wallet-outlined',
      },
      {
        key: WalletTabKeys.STASH,
        name: 'Stash',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'stash-outlined',
      },
      {
        key: WalletTabKeys.INCOME,
        name: 'Income',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'bank',
      },
      {
        key: WalletTabKeys.BILL_MANAGEMENT,
        name: 'Bill Management',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'bill-management-outlined',
      },
      {
        key: WalletTabKeys.HERO_POINTS,
        name: 'Points',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'hero-points',
      },
      {
        key: WalletTabKeys.CARD,
        name: 'Card',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'credit-card-outlined',
      },
      {
        key: WalletTabKeys.SUPER,
        name: 'Super',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'piggy-bank-outlined',
      },
      {
        key: WalletTabKeys.SUPPORT,
        name: 'Support',
        module: 'money',
        onPress: expect.any(Function),
        icon: 'circle-question-outlined',
      },
    ]);
  });

  it('should render empty array if useGetMoneyTabs returns empty array', () => {
    mockUseGetMoneyTabs.mockReturnValue([]);
    const { result } = renderHook(() => useGetMoneyTabsWithIcon());

    expect(result.current).toEqual([]);
  });
});
