import React from 'react';
import { fireEvent, render, waitFor, act } from '../../../../../../../common/utils/testing';
import { HowToRedeemItem } from '../../HowToRedeemItem';

describe('How To Redeem Item', () => {
  it('should display bottom sheet when click', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<HowToRedeemItem content="Redeem instruction" />);
    const howToRedeemBtn = getByTestId('how_to_redeem');

    act(() => {
      fireEvent.press(howToRedeemBtn);
    });

    await waitFor(() => {
      expect(getByLabelText('How to redeem content scroll view')).toBeTruthy();
      expect(getByText('Redeem instruction')).toBeTruthy();
    });
  });
});
