import React from 'react';
import { View } from 'react-native';
import { render, renderHook } from '../../../utils/testing';
import { useBrazeStore } from '../../stores/useBrazeStore';
import { RemovalEventWrapper } from '../RemovalEventWrapper';

describe('RemovalEventWrapper', () => {
  it('should return children when event does not match pending event', () => {
    const store = renderHook(() => useBrazeStore());
    store.result.current.pendingEvents = [];
    const { queryByTestId } = render(
      <RemovalEventWrapper event="click_instapay_popup_banner_at_swagdb">
        <View testID="children" />
      </RemovalEventWrapper>
    );

    expect(queryByTestId('children')).not.toBeNull();
  });

  it('should return emptu when event matches pending event', () => {
    const store = renderHook(() => useBrazeStore());
    store.result.current.pendingEvents = ['click_instapay_popup_banner_at_swagdb'];
    const { queryByTestId } = render(
      <RemovalEventWrapper event="click_instapay_popup_banner_at_swagdb">
        <View testID="children" />
      </RemovalEventWrapper>
    );

    expect(queryByTestId('children')).toBeNull();
  });
});
