import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { SecondPage } from '../SecondPage';

describe('SecondPage', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SecondPage />);

    expect(getByText('Access InstaPay Now after 2 pay runs')).toBeTruthy();
    expect(
      getByText(
        "You can access InstaPay Now after completing two pay runs with your employer. Don't worry, we'll notify you when it's available."
      )
    ).toBeTruthy();
    expect(getByText('InstaPay Now also depends on your pay cycle.')).toBeTruthy();
    expect(getByText('I get paid:')).toBeTruthy();
    expect(getByText('Monthly')).toBeTruthy();
    expect(getByText('Fortnightly')).toBeTruthy();
    expect(getByText('Weekly')).toBeTruthy();
  });
});
