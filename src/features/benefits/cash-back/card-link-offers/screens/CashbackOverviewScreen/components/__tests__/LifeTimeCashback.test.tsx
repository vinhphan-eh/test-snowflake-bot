import React from 'react';
import { render } from '../../../../../../../../common/utils/testing';
import { LifeTimeCashback } from '../LifeTimeCashback';

describe('LifeTimeCashback', () => {
  it('Should render properly', () => {
    const { getByText } = render(<LifeTimeCashback amount={1.23} />);
    expect(getByText('$1')).toBeTruthy();
    expect(getByText('.23')).toBeTruthy();
    expect(getByText('lifetime cashback')).toBeTruthy();
  });

  it('Should render spinner while loading', () => {
    const { getByTestId } = render(<LifeTimeCashback isLoading amount={1.23} />);
    expect(getByTestId('spinner')).toBeTruthy();
  });
});
