import React from 'react';
import { render, fireEvent } from '../../../../../../../common/utils/testing';
import { AttributeRow } from '../AttributeRow';

describe('Attribute Row', () => {
  it('should render correctly', () => {
    const { getByText } = render(<AttributeRow label="Status" content="Processing" />);
    expect(getByText('Status')).toBeTruthy();
    expect(getByText('Processing')).toBeTruthy();
  });

  it('can call action correctly', () => {
    const mockOnActionPress = jest.fn();
    const { getByTestId } = render(
      <AttributeRow
        onActionPress={mockOnActionPress}
        actionIcon="file-copy-outlined"
        label="Status"
        content="Processing"
      />
    );
    const iconBtn = getByTestId('Status_action');

    fireEvent.press(iconBtn);

    expect(iconBtn).toBeTruthy();
    expect(mockOnActionPress).toBeCalledTimes(1);
  });

  it('should render nothing when no content', () => {
    const { queryByTestId } = render(<AttributeRow label="Status" content="" />);
    expect(queryByTestId('attribute_row')).toBeNull();
  });
});
