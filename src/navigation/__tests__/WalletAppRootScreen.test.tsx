import React from 'react';
import MeaPushProvisioning from '@meawallet/react-native-mpp';
import * as secureComponentsReactNative from '@weavr-io/secure-components-react-native';
import { useCheckUKPermission } from '../../common/hooks/useCheckUKPermission';
import { queryClient } from '../../common/libs/queryClient';
import { render } from '../../common/utils/testing';
import { WalletAppRootScreen } from '../WalletAppRootScreen';

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useIsFocused: () => true,
}));

jest.mock('../../common/libs/queryClient', () => ({
  ...jest.requireActual('../../common/libs/queryClient'),
  queryClient: {
    getQueryState: jest.fn(),
  },
}));

jest.mock('../../common/hooks/useCheckUKPermission', () => ({
  useCheckUKPermission: jest.fn(),
}));

describe('WalletAppRootScreen', () => {
  test('should not load any library if profile is still fetching', () => {
    (queryClient.getQueryState as jest.Mock).mockReturnValue({
      isFetching: true,
      status: 'loading',
    });
    (useCheckUKPermission as jest.Mock).mockReturnValue(false);
    const initialize = jest.spyOn(MeaPushProvisioning, 'initialize');
    const initializeUXComponents = jest.spyOn(secureComponentsReactNative, 'initializeUXComponents');

    render(<WalletAppRootScreen />);

    expect(initialize).not.toBeCalled();
    expect(initializeUXComponents).not.toBeCalled();
  });

  test('should initalise MeaPushProvisioning', () => {
    (queryClient.getQueryState as jest.Mock).mockReturnValue({
      isFetching: false,
      status: 'success',
    });
    (useCheckUKPermission as jest.Mock).mockReturnValue(false);
    const spy = jest.spyOn(MeaPushProvisioning, 'initialize');

    render(<WalletAppRootScreen />);

    expect(spy).toBeCalled();
  });

  it('should initialise Weavr UI module', () => {
    (queryClient.getQueryState as jest.Mock).mockReturnValue({
      isFetching: false,
      status: 'success',
    });
    (useCheckUKPermission as jest.Mock).mockReturnValue(true);
    const spy = jest.spyOn(secureComponentsReactNative, 'initializeUXComponents');

    render(<WalletAppRootScreen />);

    expect(spy).toBeCalled();
  });
});
