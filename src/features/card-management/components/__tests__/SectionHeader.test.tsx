import React from 'react';
import { render } from '../../../../common/utils/testing';
import { SectionHeader } from '../SectionHeader';

describe('Section Header', () => {
  it('should render correctly', () => {
    const { getByText } = render(<SectionHeader title="Physical card" />);
    expect(getByText('Physical card')).toBeTruthy();
  });
});
