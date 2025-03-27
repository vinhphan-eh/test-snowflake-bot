import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import CategorySurvey from '../CategorySurvey';

describe('CategorySurvey', () => {
  it('should render correctly', () => {
    const props = {
      categories: [
        { id: '1', name: 'First one' },
        { id: '2', name: 'Second one' },
      ],
      isFechingCategories: false,
      selectedCategories: {},
      toggleById: jest.fn(),
    };
    const { getByText } = render(<CategorySurvey {...props} />);

    expect(getByText('First one')).toBeTruthy();
    expect(getByText('Second one')).toBeTruthy();
    fireEvent.press(getByText('Second one'));
    expect(props.toggleById).toBeCalledWith('2');
  });
});
