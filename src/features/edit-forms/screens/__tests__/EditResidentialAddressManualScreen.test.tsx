import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { EditResidentialAddressManualScreen } from '../EditResidentialAddressManualScreen';

describe('Edit Residential Address Manually', () => {
  const mockUseRoute = useRoute as jest.Mock;
  let updateCallback: jest.Mock;

  beforeEach(() => {
    updateCallback = jest.fn().mockResolvedValue(1);
    mockUseRoute.mockReturnValue({
      params: {
        updateCallback,
      },
    });
  });

  it('renders', () => {
    render(<EditResidentialAddressManualScreen />);
  });

  it('can submit valid residential address', async () => {
    const { getByLabelText, getByTestId } = render(<EditResidentialAddressManualScreen />);

    fireEvent.changeText(getByTestId('unitNumber'), 'a');
    fireEvent.changeText(getByTestId('streetNumber'), 'a');
    fireEvent.changeText(getByTestId('streetName'), 'a');
    fireEvent.changeText(getByTestId('streetType'), 'a');
    fireEvent.changeText(getByTestId('townOrCity'), 'a');
    fireEvent(getByTestId('region-input'), 'onConfirm', 'WA');
    fireEvent.changeText(getByTestId('postcode'), '7000');

    await waitFor(() => {
      fireEvent.press(getByLabelText('Save'));
      expect(updateCallback).toBeCalledTimes(1);
    });
  });
});
