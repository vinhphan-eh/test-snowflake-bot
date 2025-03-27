import React from 'react';
import { useCheckVersionToForceUpdate } from '../../../../../common/hooks/useCheckVersionToForceUpdate';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render, renderHook } from '../../../../../common/utils/testing';
import { ForceUpdateBts } from '../ForceUpdateBts';

jest.mock('react-native-device-info', () => ({
  getVersion: jest.fn(),
}));
jest.mock('../../../../../common/stores/useSessionStore');

describe('ForceUpdateBts', () => {
  beforeEach(() => {
    const versionCheck = renderHook(() => useCheckVersionToForceUpdate());
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
    versionCheck.result.current.shouldUpdate = true;
  });

  it('should render correctly', () => {
    const { getByText } = render(<ForceUpdateBts />);

    expect(getByText('Please update the Swag app to the latest version to access Perks.')).toBeTruthy();
    expect(getByText('I’ll do this later')).toBeTruthy();
    expect(getByText('Update now')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });
    const { getByText } = render(<ForceUpdateBts />);

    expect(getByText('Please update the Employment Hero Work app to the latest version to access Perks.')).toBeTruthy();
    expect(getByText('I’ll do this later')).toBeTruthy();
    expect(getByText('Update now')).toBeTruthy();
  });
});
