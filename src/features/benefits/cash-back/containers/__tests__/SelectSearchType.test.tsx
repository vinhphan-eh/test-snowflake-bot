import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { SelectSearchType } from '../SelectSearchType';

describe('SelectSearchType', () => {
  it('should render correctly', () => {
    const { getByTestId } = render(<SelectSearchType selectedType={undefined} onSelect={() => {}} />);

    expect(getByTestId('online-pill')).toBeTruthy();
    expect(getByTestId('instore-pill')).toBeTruthy();
  });

  it('should render correctly when online is selected', () => {
    const { getByTestId } = render(<SelectSearchType selectedType="online" onSelect={() => {}} />);

    expect(getByTestId('online-pill-selected')).toBeTruthy();
    expect(getByTestId('instore-pill')).toBeTruthy();
  });

  it('should render correctly when instore is selected', () => {
    const { getByTestId } = render(<SelectSearchType selectedType="instore" onSelect={() => {}} />);

    expect(getByTestId('online-pill')).toBeTruthy();
    expect(getByTestId('instore-pill-selected')).toBeTruthy();
  });

  it('should work correctly when selecting online', () => {
    const mockOnSelect = jest.fn();
    const { getByTestId } = render(<SelectSearchType selectedType={undefined} onSelect={mockOnSelect} />);

    fireEvent.press(getByTestId('online-pill'));

    expect(mockOnSelect).toBeCalledWith('online');
  });

  it('should work correctly when selecting instore', () => {
    const mockOnSelect = jest.fn();
    const { getByTestId } = render(<SelectSearchType selectedType={undefined} onSelect={mockOnSelect} />);

    fireEvent.press(getByTestId('instore-pill'));

    expect(mockOnSelect).toBeCalledWith('instore');
  });
});
