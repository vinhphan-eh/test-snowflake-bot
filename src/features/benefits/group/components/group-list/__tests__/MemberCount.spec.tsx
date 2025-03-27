import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { MemberCount } from '../MemberCount';

describe('MemberCount', () => {
  it('should render correctly', () => {
    const { getByText } = render(<MemberCount memberCount={104327} />);
    expect(getByText('104K')).toBeTruthy();
    expect(getByText('users supported')).toBeTruthy();
  });
});
