import React from 'react';
import { AppState } from 'react-native';
import { render, waitFor } from '../../utils/testing';
import { useLoadDeviceLocation } from '../useLoadDeviceLocation';
import { useLocation } from '../useLocation';

const mockOnCannotRequestPermission = jest.fn();
const mockOnLocationTurnOnBySetting = jest.fn();
const mockOnLocationTurnOffBySetting = jest.fn();
const mockGetCurrentLocation = jest.fn();
const mockResetLocation = jest.fn();

const mockUseLocation = useLocation as jest.MockedFunction<typeof useLocation>;
jest.mock('../useLocation');

const TestComp = () => {
  useLoadDeviceLocation({
    onCannotRequestPermission: mockOnCannotRequestPermission,
    onLocationTurnOnBySetting: mockOnLocationTurnOnBySetting,
    onLocationTurnOffBySetting: mockOnLocationTurnOffBySetting,
  });
  return null;
};

describe('useLoadDeviceLocation', () => {
  it('should work correctly when go to setting and grant permission', async () => {
    mockUseLocation.mockReturnValue({
      checkPermission: () => Promise.resolve('granted'),
      getCurrentLocation: mockGetCurrentLocation,
      keyedAddress: undefined,
      resetLocation: jest.fn(),
      setKeyedAddress: jest.fn(),
      keyedLocation: jest.fn(),
      requestPermission: jest.fn(),
    });

    render(<TestComp />);

    const appStateSpy = jest.spyOn(AppState, 'addEventListener');
    appStateSpy.mock.calls[0][1]('active');

    await waitFor(() => {
      expect(mockOnLocationTurnOnBySetting).toBeCalledTimes(1);
      expect(mockGetCurrentLocation).toBeCalledTimes(1);
    });
  });

  it('should work correctly when go to setting and clear permission', async () => {
    mockUseLocation.mockReturnValue({
      checkPermission: () => Promise.resolve('denied'),
      getCurrentLocation: mockGetCurrentLocation,
      keyedAddress: {
        name: 'test address',
        latitude: 12.23,
        longitude: 1.23,
        isCurrentLocation: true,
      },
      resetLocation: mockResetLocation,
      setKeyedAddress: jest.fn(),
      keyedLocation: jest.fn(),
      requestPermission: jest.fn(),
    });

    render(<TestComp />);

    const appStateSpy = jest.spyOn(AppState, 'addEventListener');
    appStateSpy.mock.calls[0][1]('active');

    await waitFor(() => {
      expect(mockOnLocationTurnOffBySetting).toBeCalledTimes(1);
      expect(mockResetLocation).toBeCalledTimes(1);
    });
  });
});
