import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { mockUseBillPromotionPermission } from '../../hooks/__mocks__/useBillPromotionPermission';
import { PromotionTag } from '../PromotionTag';

describe('WaitlistCard', () => {
  it('should render correctly', () => {
    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: true, isFetched: true });

    const { getByTestId } = render(<PromotionTag />);

    expect(getByTestId('tag-content')).toBeTruthy();
    expect(getByTestId('left-icon')).toBeTruthy();
  });

  it('should render correctly without text', () => {
    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: true, isFetched: true });

    const { getByTestId } = render(<PromotionTag withoutText />);

    expect(getByTestId('left-icon')).toBeTruthy();
  });
});
