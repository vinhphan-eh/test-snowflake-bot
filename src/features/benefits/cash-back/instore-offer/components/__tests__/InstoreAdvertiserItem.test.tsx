import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { InstoreAdvertiserItem } from '../InstoreAdvertiserItem';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockAdvertiser = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges[0]!.node;

describe('InstoreAdvertiserItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <InstoreAdvertiserItem item={mockAdvertiser} onPress={() => {}} latitude={-33.877} longitude={151.205} />
    );
    expect(getByText('6% cashback on all purchases')).toBeTruthy();
    expect(getByText('13 stores near you')).toBeTruthy();
    expect(getByText('Forever New')).toBeTruthy();
  });
});
