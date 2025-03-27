import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { mockUseBillPromotionPermission } from '../../hooks/__mocks__/useBillPromotionPermission';
import { PromotionTnCApply } from '../PromotionTnCApply';

describe('WaitlistCard', () => {
  it('should render correctly', () => {
    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: true, isFetched: true });

    const { getByText } = render(<PromotionTnCApply />);

    expect(getByText('T&Cs apply.')).toBeTruthy();
  });
});
