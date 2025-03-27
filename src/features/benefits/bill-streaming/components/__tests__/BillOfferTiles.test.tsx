import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { BillOfferTiles } from '../BillOfferTiles';

describe('WaitlistCard', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <BillOfferTiles offerTiles={[{ content: 'unlock', subContent: 'the electricity reference price' }]} />
    );

    expect(getByText('unlock')).toBeTruthy();
    expect(getByText('the electricity reference price')).toBeTruthy();
  });
});
