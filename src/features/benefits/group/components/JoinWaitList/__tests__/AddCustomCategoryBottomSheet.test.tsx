import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import AddCustomCategoryBottomSheet from '../AddCustomCategoryBottomSheet';

describe('AddCustomCategoryBottomSheet', () => {
  it('should render and behave correctly', () => {
    const props = {
      onAddNewCategory: jest.fn(),
      onCloseAddNewCategory: jest.fn(),
    };
    const { getByTestId, getByText } = render(<AddCustomCategoryBottomSheet {...props} />);

    expect(getByText('Add category')).toBeTruthy();
    expect(getByText('Name')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
    fireEvent.changeText(getByTestId('name'), 'Something');
    fireEvent.press(getByText('Add'));
    expect(props.onAddNewCategory).toBeCalledWith('Something');
  });
});
