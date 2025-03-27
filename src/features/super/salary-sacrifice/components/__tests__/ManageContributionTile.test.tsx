import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { useSalarySacrificeNavigation } from '../../../hooks/useSalarySacrificeNavigation';
import { SALARY_SACRIFICE_TITLE } from '../../constants';
import ManageContributionTile from '../ManageContributionTile';

jest.mock('../../../hooks/useSalarySacrificeNavigation');

describe('ManageContributionTile', () => {
  const mockNavigateToManageContributions = jest.fn();
  const mockUseSalarySacrificeNavigation = useSalarySacrificeNavigation as jest.Mock;

  beforeEach(() => {
    mockUseSalarySacrificeNavigation.mockReturnValue({
      navigateToManageContributions: mockNavigateToManageContributions,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with default props', () => {
    const { getByTestId, getByText } = render(<ManageContributionTile />);

    expect(getByTestId('manage-contributions-pressable')).toBeTruthy();
    expect(getByText(SALARY_SACRIFICE_TITLE)).toBeTruthy();
    expect(getByText('Manage your contributions')).toBeTruthy();
  });

  it('calls navigateToManageContributions when pressed', () => {
    const { getByTestId } = render(<ManageContributionTile />);

    fireEvent.press(getByTestId('manage-contributions-pressable'));

    expect(mockNavigateToManageContributions).toHaveBeenCalled();
  });

  it('does not call navigateToManageContributions when disabled', () => {
    const { getByTestId } = render(<ManageContributionTile disabled />);

    fireEvent.press(getByTestId('manage-contributions-pressable'));

    expect(mockNavigateToManageContributions).not.toHaveBeenCalled();
  });
});
