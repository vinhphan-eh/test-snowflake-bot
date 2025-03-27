import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { useLoadDeviceLocation } from '../../../../../common/hooks/useLoadDeviceLocation';
import { render, fireEvent, waitFor } from '../../../../../common/utils/testing';
import { SearchLocationBottomSheet } from '../SearchLocationBottomSheet';

const mockUseLoadDeviceLocation = useLoadDeviceLocation as jest.MockedFunction<typeof useLoadDeviceLocation>;

jest.mock('../../../../../common/hooks/useLoadDeviceLocation');

describe('SearchLocationBottomSheet', () => {
  it('should render correctly', () => {
    mockUseLoadDeviceLocation.mockReturnValue({
      loadCurrentLocation: jest.fn(),
      keyedAddress: undefined,
      setKeyedAddress: jest.fn(),
    });

    const { getByText } = render(<SearchLocationBottomSheet btsRef={undefined as never} onAddressSelect={() => {}} />);
    expect(getByText('Use current location')).toBeTruthy();
    expect(getByText('Go to settings')).toBeTruthy();
    expect(
      getByText('To search using your live location, please enable location services in your device settings.')
    ).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
  });

  it('should trigger load current location correctly', () => {
    const mockLoadCurrentLocation = jest.fn();
    mockUseLoadDeviceLocation.mockReturnValue({
      loadCurrentLocation: mockLoadCurrentLocation,
      keyedAddress: undefined,
      setKeyedAddress: jest.fn(),
    });
    const { getByText } = render(<SearchLocationBottomSheet btsRef={undefined as never} onAddressSelect={() => {}} />);

    fireEvent.press(getByText('Use current location'));

    expect(mockLoadCurrentLocation).toBeCalled();
    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click Use current location',
      metaData: {
        module: 'Cashback',
      },
    });
  });

  it('normal search offer', async () => {
    const mockLoadCurrentLocation = jest.fn();
    mockUseLoadDeviceLocation.mockReturnValue({
      loadCurrentLocation: mockLoadCurrentLocation,
      keyedAddress: undefined,
      setKeyedAddress: jest.fn(),
    });
    const { getByTestId } = render(
      <SearchLocationBottomSheet btsRef={undefined as never} onAddressSelect={() => {}} />
    );

    const searchBar = getByTestId('auto-complete-address-input-search-input');
    fireEvent.changeText(searchBar, { nativeEvent: { text: 'Cotton' } });

    await waitFor(() => {
      expect(mockedEventTracking).toHaveBeenCalledWith({
        categoryName: 'user action',
        event: 'Type in location search bar',
        metaData: {
          module: 'Cashback',
          searchTerm: 'Cotton',
        },
      });
    });
  });
});
