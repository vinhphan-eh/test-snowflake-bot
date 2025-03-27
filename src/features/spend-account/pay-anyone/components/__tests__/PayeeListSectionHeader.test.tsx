import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { PayeeListSectionHeader } from '../PayeeListSectionHeader';

describe('PayeeListSectionHeader', () => {
  it('should render properly', () => {
    const { getByText } = render(<PayeeListSectionHeader letter="D" />);

    expect(getByText('D')).toBeTruthy();
  });
});
