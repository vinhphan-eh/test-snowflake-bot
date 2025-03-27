import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { InstaPayDrawdownSurveyCTA } from '../InstaPayDrawdownSurveyCTA';

describe('InstaPayDrawdownSurveyCTA', () => {
  it('renders correctly with formatted messages', () => {
    const onContinue = jest.fn();
    const { getByText, queryByText } = render(<InstaPayDrawdownSurveyCTA onContinue={onContinue} />);

    expect(queryByText('Your feedback is important to us')).toBeVisible();
    expect(queryByText('Please let us know your thoughts')).toBeVisible();
    expect(queryByText('Share your feedback')).toBeVisible();

    fireEvent.press(getByText('Share your feedback'));
    expect(onContinue).toHaveBeenCalled();
  });
});
