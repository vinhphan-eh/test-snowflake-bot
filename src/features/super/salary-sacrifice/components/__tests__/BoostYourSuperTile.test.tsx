import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { useSalarySacrificeNavigation } from '../../../hooks/useSalarySacrificeNavigation';
import BoostYourSuperTile from '../BoostYourSuperTile';

jest.mock('../../../hooks/useSalarySacrificeNavigation');

describe('BoostYourSuperTile', () => {
  const mockNavigateToSalarySacrifice = jest.fn();
  const mockImage = { uri: 'test-image' };

  beforeEach(() => {
    (useSalarySacrificeNavigation as jest.Mock).mockReturnValue({
      navigateToSalarySacrifice: mockNavigateToSalarySacrifice,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with given props', () => {
    const { getByText } = render(<BoostYourSuperTile image={mockImage} />);

    expect(getByText('Boost your super with salary sacrifice')).toBeTruthy();
    expect(getByText('Boost now')).toBeTruthy();
  });

  it('calls navigateToSalarySacrifice when button is pressed', () => {
    const { getByText } = render(<BoostYourSuperTile image={mockImage} />);

    fireEvent.press(getByText('Boost now'));

    expect(mockNavigateToSalarySacrifice).toHaveBeenCalled();
  });

  it('disables the button when disabled prop is true', () => {
    const { getByText } = render(<BoostYourSuperTile image={mockImage} disabled />);

    fireEvent.press(getByText('Boost now'));

    expect(mockNavigateToSalarySacrifice).not.toHaveBeenCalled();
  });

  it('passes trackingAttributes to useSalarySacrificeNavigation', () => {
    const trackingAttributes = { someAttribute: 'someValue' };
    render(<BoostYourSuperTile image={mockImage} trackingAttributes={trackingAttributes} />);

    expect(useSalarySacrificeNavigation).toHaveBeenCalledWith(trackingAttributes);
  });
});
