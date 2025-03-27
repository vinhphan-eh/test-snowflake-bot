import React from 'react';
import { render, fireEvent, waitFor } from '../../../../common/utils/testing';
import { SettingToggle } from '../SettingToggle';

describe('Setting Toggle', () => {
  it('should render correctly', () => {
    const { getByLabelText } = render(<SettingToggle label="Test" value={false} onChange={() => {}} />);
    expect(getByLabelText('Test')).toBeTruthy();
    expect(getByLabelText('Test toggle')).toBeTruthy();
  });

  it('onChange works correctly', async () => {
    const mockOnChange = jest.fn();
    const { getByTestId } = render(<SettingToggle label="Test" value={false} onChange={mockOnChange} />);
    fireEvent.press(getByTestId('setting_toggle'));

    await waitFor(() => {
      expect(mockOnChange).toBeCalledWith(true);
    });
  });

  it('should render hyperlink icon if hyperlink param is passed', async () => {
    const { getByTestId } = render(
      <SettingToggle
        label="Test"
        value={false}
        onChange={jest.fn()}
        hyperlink={{
          icon: 'add',
          action: jest.fn(),
        }}
      />
    );

    await waitFor(() => {
      expect(getByTestId('setting_toggle_icon')).toBeTruthy();
    });
  });
});
