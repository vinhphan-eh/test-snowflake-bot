import React from 'react';
import { Text } from 'react-native';
import { useSessionStore } from '../../stores/useSessionStore';
import { render, renderHook } from '../../utils/testing';
import { useUserType } from '../useUserType';

const TestComp = () => {
  const userType = useUserType();
  return <Text>{userType}</Text>;
};

describe('useUserType', () => {
  it('should work correctly for kp', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'kp',
      userID: '1',
    };
    const { getByText } = render(<TestComp />);
    expect(getByText('Workzone')).toBeTruthy();
  });

  it('should work correctly for eh', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentUser = {
      loginProvider: 'eh',
      userID: '1',
    };
    const { getByText } = render(<TestComp />);
    expect(getByText('Employee')).toBeTruthy();
  });
});
