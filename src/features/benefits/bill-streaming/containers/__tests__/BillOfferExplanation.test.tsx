import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { BillOfferExplanation } from '../BillOfferExplanation';

describe('BillDisclaimer', () => {
  it('should render correctly', () => {
    const { getByText } = render(<BillOfferExplanation content="test-content" />);
    expect(getByText('Got it', { exact: false })).toBeTruthy();
    expect(getByText('test-content')).toBeTruthy();
  });
});
