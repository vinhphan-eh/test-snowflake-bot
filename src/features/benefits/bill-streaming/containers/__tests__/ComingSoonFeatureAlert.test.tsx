import React from 'react';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { useBillManagementStore } from '../../stores/useBillManagementStore';
import { ComingSoonFeatureAlert } from '../ComingSoonFeatureAlert';

const mockTracking = jest.fn();
jest.mock('../../hooks/useBenefitsBillMgmtTracking', () => ({
  useBenefitsBillMgmtTracking: () => ({
    trackClickOnComingSoon: mockTracking,
  }),
}));

describe('ComingSoonFeatureAlert', () => {
  it('should render correctly when all conditions met', () => {
    const store = renderHook(() => useBillManagementStore());
    store.result.current.showFeatureComingSoonAlert = true;
    store.result.current.hasHydrate = true;

    const { getByTestId, getByText } = render(<ComingSoonFeatureAlert />);

    expect(getByText('Exciting', { exact: false })).toBeTruthy();
    expect(getByText('features')).toBeTruthy();
    expect(getByText(' coming soon!', { exact: false })).toBeTruthy();
    expect(
      getByText('Recurring payments can be set up such that you can pay off your bills automatically')
    ).toBeTruthy();
    expect(
      getByText('Break down your bills into even and predictable payments that are aligned to your pay cycle')
    ).toBeTruthy();
    expect(getByTestId('alert-close-icon')).toBeTruthy();
  });

  it('should not render when have not hydrated', () => {
    const store = renderHook(() => useBillManagementStore());
    store.result.current.showFeatureComingSoonAlert = true;
    store.result.current.hasHydrate = false;

    const { queryByTestId, queryByText } = render(<ComingSoonFeatureAlert />);

    expect(queryByText('Exciting', { exact: false })).toBeNull();
    expect(queryByText('features')).toBeNull();
    expect(queryByText(' coming soon!', { exact: false })).toBeNull();
    expect(queryByTestId('alert-close-icon')).toBeNull();
  });

  it('should close alert correctly', async () => {
    const store = renderHook(() => useBillManagementStore());
    const mockSetAlert = jest.fn();
    store.result.current.showFeatureComingSoonAlert = true;
    store.result.current.hasHydrate = true;
    store.result.current.setComingSoonAlertVisibility = mockSetAlert;

    const { getByTestId } = render(<ComingSoonFeatureAlert />);

    fireEvent.press(getByTestId('alert-close-icon'));

    expect(mockSetAlert).toBeCalledWith(false);
  });

  it('should track clicking into coming soon', () => {
    const store = renderHook(() => useBillManagementStore());
    store.result.current.showFeatureComingSoonAlert = true;
    store.result.current.hasHydrate = true;

    const { getByText } = render(<ComingSoonFeatureAlert />);

    fireEvent.press(getByText('features'));

    expect(mockTracking).toBeCalled();
  });
});
