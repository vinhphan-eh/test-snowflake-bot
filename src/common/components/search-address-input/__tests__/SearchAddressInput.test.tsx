import React from 'react';
import type { RenderAPI } from '../../../utils/testing';
import { act, addInputSuffix, fireEvent, render } from '../../../utils/testing';
import type { SearchAddressInputRef } from '../SearchAddressInput';
import { SearchAddressInput } from '../SearchAddressInput';

const mockOnLocationSelect = jest.fn();
const mockOpenManualInput = jest.fn();

describe('Search Address Input', () => {
  let renderAPI: RenderAPI;
  beforeEach(() => {
    renderAPI = render(
      <SearchAddressInput
        maxScreenHeight={1}
        onAddressSelected={mockOnLocationSelect}
        onOpenManualInput={mockOpenManualInput}
      />
    );
  });

  it('should render correctly', () => {
    const { getByTestId } = renderAPI;

    expect(getByTestId('address-display')).toBeTruthy();
  });

  it('should select location successfully', async () => {
    const { getByTestId } = renderAPI;

    const input = getByTestId(addInputSuffix('auto-complete'));

    const address = {
      addressLine: '123 A Street',
      townOrCity: 'City',
      postCode: '0000',
      region: 'NSW',
      country: 'AUS',
      formattedAddress: '123 A St, City NSW 2000, Australia',
    };

    await act(() => fireEvent(input, 'onLocationSelect', address));

    expect(mockOnLocationSelect).toBeCalledWith(address);
    expect(getByTestId('text-input')).toHaveProperty('props.value', address.formattedAddress);
  });

  it('should open manual input', async () => {
    const { getByTestId } = renderAPI;

    const cantFindAddressText = getByTestId('not-find-address-btn');

    await act(() => fireEvent.press(cantFindAddressText));

    expect(mockOpenManualInput).toBeCalled();
  });

  it('should set address', async () => {
    const ref = React.createRef<SearchAddressInputRef>();
    const { getByTestId } = render(
      <SearchAddressInput maxScreenHeight={1} onAddressSelected={mockOnLocationSelect} ref={ref} />
    );

    const address = '123 Street A, City 000';
    ref.current?.setAddress(address);

    expect(getByTestId('text-input')).toHaveProperty('props.value', address);
  });

  it('should render error message', () => {
    const { getByText } = render(
      <SearchAddressInput
        maxScreenHeight={1}
        onAddressSelected={mockOnLocationSelect}
        onOpenManualInput={mockOpenManualInput}
        isInvalid
        errorMessage="Error message"
      />
    );

    expect(getByText('Error message')).toBeTruthy();
  });
});
