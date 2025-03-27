import React from 'react';
import { openSettings } from 'react-native-permissions';
import { render, fireEvent, waitFor } from '../../../../../common/utils/testing';
import { NoLocationServiceBottomSheet } from '../NoLocationServiceBottomSheet';

describe('No Location Service Bottom Sheet', () => {
  it('should render correctly', () => {
    const { getByText } = render(<NoLocationServiceBottomSheet />);
    expect(
      getByText('To search using your live location, please enable location services in your device settings.')
    ).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Go to settings')).toBeTruthy();
  });

  it('should open setting correctly', async () => {
    const { getByText } = render(<NoLocationServiceBottomSheet />);
    fireEvent.press(getByText('Go to settings'));
    await waitFor(() => expect(openSettings).toBeCalled());
  });
});
