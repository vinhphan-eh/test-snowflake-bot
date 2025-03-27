import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { InstoreCashbackAdvertiserCarouselItem } from '../InstoreCashbackAdvertiserCarouselItem';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockAdvertiser = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges[0]!.node;

describe('InstoreCashbackAdvertiserCarouselItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <InstoreCashbackAdvertiserCarouselItem
        isLastIndex={false}
        item={mockAdvertiser}
        onPress={() => {}}
        latitude={-33.877}
        longitude={151.205}
        index={0}
      />
    );
    expect(getByText('6% Cashback on All Purchases')).toBeTruthy();
    expect(getByText('13 stores near you')).toBeTruthy();
    expect(getByText('Forever New')).toBeTruthy();
  });
});
