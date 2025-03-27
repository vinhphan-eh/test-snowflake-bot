import React from 'react';
import { useLoadDeviceLocation } from '../../../../../common/hooks/useLoadDeviceLocation';
import { render } from '../../../../../common/utils/testing';
import type { SearchLocationContainerChildrenProps } from '../SearchLocationContainer';
import { SearchLocationContainer } from '../SearchLocationContainer';

const mockUseLoadDeviceLocation = useLoadDeviceLocation as jest.MockedFunction<typeof useLoadDeviceLocation>;

jest.mock('../../../../../common/hooks/useLoadDeviceLocation');

const getMockedUseLoadDeviceLocation = () => {
  return {
    loadCurrentLocation: jest.fn(),
    keyedAddress: undefined,
    setKeyedAddress: jest.fn(),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;
};

describe('SearchLocationContainer', () => {
  let childProps: SearchLocationContainerChildrenProps | null = null;
  const mockOnFinish: ((() => void) | undefined)[] = [];
  const mockOnCannotRequestPermission: ((() => void) | undefined)[] = [];
  let mockUseLoadDeviceLocationRes = getMockedUseLoadDeviceLocation();

  const setup = () => {
    return render(
      <SearchLocationContainer>
        {({ allowDataToLoad, keyedAddress, openSearchLocationBottomSheet, setKeyedAddress }) => {
          childProps = { allowDataToLoad, keyedAddress, openSearchLocationBottomSheet, setKeyedAddress };
          return <></>;
        }}
      </SearchLocationContainer>
    );
  };

  beforeEach(() => {
    mockUseLoadDeviceLocationRes = getMockedUseLoadDeviceLocation();
    mockUseLoadDeviceLocation.mockImplementation(({ onCannotRequestPermission, onFinish }) => {
      mockOnFinish.push(onFinish);
      mockOnCannotRequestPermission.push(onCannotRequestPermission);

      return mockUseLoadDeviceLocationRes;
    });
  });

  it('should use default location', () => {
    setup();
    expect(childProps?.keyedAddress).toBeDefined();
  });

  it('should set allowDataToLoad to false initially', () => {
    setup();
    expect(childProps?.allowDataToLoad).toBe(false);
  });

  it('should set allowDataToLoad to true when keyed address is ready', () => {
    mockUseLoadDeviceLocationRes.keyedAddress = {
      name: '123 street, city, state, code',
      isCurrentLocation: false,
      latitude: -33.877,
      longitude: 151.205,
    };
    setup();
    expect(childProps?.allowDataToLoad).toBe(true);
  });

  it('should set allowDataToLoad to true when onFinish is called', () => {
    setup();
    mockOnFinish.forEach(fn => fn?.());
    expect(childProps?.allowDataToLoad).toBe(true);
  });

  it('should call loadCurrentLocation when no keyedAddress is stored', () => {
    setup();
    expect(mockUseLoadDeviceLocationRes.loadCurrentLocation).toHaveBeenCalled();
  });

  it('should not call loadCurrentLocation when keyedAddress is stored', () => {
    mockUseLoadDeviceLocationRes.keyedAddress = {
      name: '123 street, city, state, code',
      isCurrentLocation: false,
      latitude: -33.877,
      longitude: 151.205,
    };
    setup();
    expect(mockUseLoadDeviceLocationRes.loadCurrentLocation).not.toHaveBeenCalled();
  });
});
