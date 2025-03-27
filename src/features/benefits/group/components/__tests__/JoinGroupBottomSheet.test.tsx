import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render } from '../../../../../common/utils/testing';
import { JoinGroupBottomSheet } from '../JoinGroupBottomSheet';

jest.mock('../../../../../common/stores/useSessionStore');

const mockOnConfirm = jest.fn();

describe('JoinGroupBottomSheet', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });
  });

  it('should render correctly', () => {
    const { getByText } = render(<JoinGroupBottomSheet onConfirm={mockOnConfirm} isLoading={false} />);
    expect(
      getByText(
        'Would you like to subscribe to receiving updates and content from the Employment Hero Group about Swag groups you join via email, text and in-app notifications.'
      )
    ).toBeVisible();
    expect(getByText('No thanks')).toBeVisible();
    expect(getByText('Yes')).toBeVisible();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });

    const { getByText } = render(<JoinGroupBottomSheet onConfirm={mockOnConfirm} isLoading={false} />);
    expect(
      getByText(
        'Would you like to subscribe to receiving updates and content from the Employment Hero Group about Employment Hero groups you join via email, text and in-app notifications.'
      )
    ).toBeVisible();
    expect(getByText('No thanks')).toBeVisible();
    expect(getByText('Yes')).toBeVisible();
  });
});
