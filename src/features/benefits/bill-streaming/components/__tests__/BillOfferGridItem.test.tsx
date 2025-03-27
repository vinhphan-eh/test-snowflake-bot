import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { mockBillOfferList } from '../../../../../new-graphql/handlers/custom-mock/billManangement';
import { BillOfferGridItem } from '../BillOfferGridItem';

describe('BillOffer', () => {
  it('should render correctly for SE offer', () => {
    const { getByText } = render(
      <BillOfferGridItem item={mockBillOfferList[0]} showBillTooltip={() => {}} onPress={() => {}} />
    );
    expect(getByText('Shrink your energy bill with Swag')).toBeTruthy();
    expect(getByText('Community Sourced')).toBeTruthy();
  });
});
