/* eslint-disable import/first */
const mockDeeplink = jest.fn();

import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useEbfPillarPermission } from '../../../../common/hooks/useEbfPillarPermission';
import { useIsCandidateV2 } from '../../../../common/hooks/useIsCandidate';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { render, renderHook, fireEvent } from '../../../../common/utils/testing';
import { mockUseCashbackPermission } from '../../../benefits/common/hooks/__mocks__/useCashbackPermission';
import type { BenefitsItemType } from '../constants';
import { useBenefitsTiles } from '../useBenefitsTiles';

jest.mock('@ehrocks/react-native-superapp-communication', () => ({
  DeepLinkEvent: {
    dispatchOpenDeepLinkEvent: mockDeeplink,
  },
}));

jest.mock('../../../../common/hooks/useIsCandidate', () => ({
  useIsCandidateV2: jest.fn(),
}));

jest.mock('../../../../common/hooks/useEbfPillarPermission', () => ({
  useEbfPillarPermission: jest.fn(),
}));

jest.mock('../CashbackTile', () => ({
  CashbackTile: (props: BenefitsItemType) => (
    <TouchableOpacity onPress={props.action}>
      <Text>{props.title}</Text>
    </TouchableOpacity>
  ),
}));

const TestComp = () => {
  const tiles = useBenefitsTiles();
  return <View>{tiles.map(e => e.component())}</View>;
};

describe('useBenefitsTiles', () => {
  beforeEach(() => {
    mockUseCashbackPermission.mockReturnValue({
      isFetched: true,
      permission: true,
      isLoading: false,
    });

    (useEbfPillarPermission as jest.Mock).mockReturnValue({
      benefitsPillarPermission: true,
      isFetchedBenefits: true,
    });
  });

  it('should work correctly when is candidate', () => {
    (useIsCandidateV2 as jest.Mock).mockReturnValue(true);

    const tiles = renderHook(() => useBenefitsTiles());

    expect(tiles.result.current.length).toBe(5);
  });

  it('should work correctly when is EH and do not have cashback permission', () => {
    mockUseCashbackPermission.mockReturnValue({
      isFetched: true,
      permission: false,
      isLoading: false,
    });
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
      userID: '1',
    };

    const tiles = renderHook(() => useBenefitsTiles());

    expect(tiles.result.current.length).toBe(0);
  });

  it('should work correctly when is EH', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
      userID: '1',
    };

    const tiles = renderHook(() => useBenefitsTiles());

    expect(tiles.result.current.length).toBe(2);
  });

  it('should work correctly when is EH and benefits permission is loading', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
      userID: '1',
    };

    (useEbfPillarPermission as jest.Mock).mockReturnValue({
      benefitsPillarPermission: true,
      isBenefitsLoading: true,
    });

    const tiles = renderHook(() => useBenefitsTiles());

    expect(tiles.result.current.length).toBe(0);
  });

  it('should work correctly when is KP', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'kp',
      userID: '1',
    };

    const tiles = renderHook(() => useBenefitsTiles());

    expect(tiles.result.current.length).toBe(2);
  });

  it('should work correctly when performing action', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'kp',
      userID: '1',
    };

    const { getByText } = render(<TestComp />);

    fireEvent.press(getByText('Hello Fresh'));

    expect(mockDeeplink).toBeCalledWith({ url: 'platform_redirect/benefits/cashback-offers/936843' });
  });

  it('should render correctly with Xmas23 Campaign when is kp', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'kp',
      userID: '1',
    };

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsXmas23Cashback: {
        view: true,
      },
    } as never;

    const { getByText } = render(<TestComp />);

    fireEvent.press(getByText('The Iconic'));
    fireEvent.press(getByText('Booking.com'));
  });

  it('should render correctly with Xmas23 Campaign when is omop', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'omop',
      userID: '1',
    };

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsXmas23Cashback: {
        view: true,
      },
    } as never;

    const { getByText } = render(<TestComp />);

    fireEvent.press(getByText('The Iconic'));
    fireEvent.press(getByText('Booking.com'));
  });

  it('should render correctly with Xmas23 Campaign when is eh', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
      userID: '1',
    };

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsXmas23Cashback: {
        view: true,
      },
    } as never;

    const { getByText } = render(<TestComp />);

    fireEvent.press(getByText('The Iconic'));
    fireEvent.press(getByText('Booking.com'));
  });

  it('should render correctly with Xmas23 Campaign when is candidate', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
      userID: '1',
    };

    const permissionStore = renderHook(() => usePermissionStore());
    permissionStore.result.current.permissions = {
      benefitsXmas23Cashback: {
        view: true,
      },
    } as never;

    (useIsCandidateV2 as jest.Mock).mockReturnValue(true);

    const { getByText } = render(<TestComp />);

    fireEvent.press(getByText('The Iconic'));
    fireEvent.press(getByText('Booking.com'));
    fireEvent.press(getByText('Adore Beauty'));
    fireEvent.press(getByText('Red Balloon'));
    fireEvent.press(getByText('Myer'));
  });
});
