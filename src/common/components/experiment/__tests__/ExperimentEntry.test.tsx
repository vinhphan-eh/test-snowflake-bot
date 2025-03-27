import React from 'react';
import { render, fireEvent } from '../../../utils/testing';
import { ExperimentEntry } from '../ExperimentEntry';

describe('ExperimentEntry', () => {
  it('should display all given content', () => {
    const mockOnPress = jest.fn();

    const { getByText } = render(
      <ExperimentEntry
        thumbnailName="expEntry"
        title="Want pay every time you clock off?"
        description="Find out more"
        onPress={mockOnPress}
      />
    );

    getByText('Want pay every time you clock off?');
    getByText('Find out more');
  });

  it('should call onPress when press', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(
      <ExperimentEntry
        thumbnailName="expEntry"
        title="Want pay every time you clock off?"
        description="Find out more"
        onPress={mockOnPress}
      />
    );

    const component = getByText('Want pay every time you clock off?');
    fireEvent.press(component);

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
