import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { InstaPayDrawdownSurveyScreen } from '../InstaPayDrawdownSurveyScreen';

describe('InstaPayDrawdownSurveyScreen', () => {
  it('can render', () => {
    render(<InstaPayDrawdownSurveyScreen />);
  });

  it('disables and enables the submit button according to the answers', () => {
    const { getByTestId, getByText } = render(<InstaPayDrawdownSurveyScreen />);
    expect(getByText('Submit').props.disabled).toBeTruthy();

    fireEvent.press(getByText('Savings'));
    expect(getByText('Submit').props.disabled).toBeTruthy();

    // Has enough answers now, enable the button
    fireEvent.press(getByText('Fortnightly'));
    expect(getByText('Submit').props.disabled).toBeFalsy();

    // Select "Other" without entering the reason => disable again
    fireEvent.press(getByText('Other'));
    expect(getByText('Submit').props.disabled).toBeTruthy();

    // Enters the reason => enable
    fireEvent.changeText(getByTestId('reason'), 'Lorem ipsum');
    expect(getByText('Submit').props.disabled).toBeFalsy();
  });
});
