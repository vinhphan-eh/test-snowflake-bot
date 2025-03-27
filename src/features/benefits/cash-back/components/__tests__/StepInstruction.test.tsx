import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { StepInstruction } from '../StepInstruction';

describe('StepInstruction', () => {
  it('should render correctly', () => {
    const { getByText } = render(<StepInstruction data={['step one', 'step two', 'step three']} />);

    expect(getByText('1')).toBeTruthy();
    expect(getByText('step one')).toBeTruthy();
    expect(getByText('2')).toBeTruthy();
    expect(getByText('step two')).toBeTruthy();
    expect(getByText('3')).toBeTruthy();
    expect(getByText('step three')).toBeTruthy();
  });
});
