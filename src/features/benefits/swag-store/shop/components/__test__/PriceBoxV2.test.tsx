import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { PriceBoxV2 } from '../PriceBox';

describe('Price Box V2', () => {
  it('should render correctly', () => {
    const { getByText } = render(<PriceBoxV2 priceInPoints={209} discountPrice={95} />);
    expect(getByText('$95')).toBeTruthy();
    expect(getByText('209 PTS')).toBeTruthy();
  });

  it("should render 'From' when multiVariants = true", () => {
    const { getByText } = render(<PriceBoxV2 priceInPoints={209} discountPrice={95} multiVariants />);
    expect(getByText('From')).toBeTruthy();
  });
});
