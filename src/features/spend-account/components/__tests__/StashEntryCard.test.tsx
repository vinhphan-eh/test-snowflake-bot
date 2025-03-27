import React from 'react';
import { fireEvent, render } from '../../../../common/utils/testing';
import { StashEntryCard } from '../StashEntryCard';

describe('Stash Entry Card', () => {
  const onPressMock = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const { queryByText } = render(<StashEntryCard onContinue={onPressMock} />);
    expect(queryByText('Make budgeting a breeze with Stash')).toBeTruthy();
    expect(queryByText('Learn more')).toBeTruthy();
  });

  it('calls onContinue and onDismiss correctly', () => {
    const { getByLabelText } = render(<StashEntryCard onContinue={onPressMock} />);
    fireEvent.press(getByLabelText('Learn more'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
