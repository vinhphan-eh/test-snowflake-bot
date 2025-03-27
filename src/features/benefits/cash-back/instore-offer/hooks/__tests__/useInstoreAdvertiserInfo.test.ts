import { renderHook } from '../../../../../../common/utils/testing';
import { mockInstoreOffersGroupByAdvertisers } from '../../../../../../new-graphql/handlers/custom-mock/cashback';
import { useInstoreAdvertiserInfo } from '../useInstoreAdvertiserInfo';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockAdvertiser = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges[0]!.node;

describe('useInstoreAdvertiserInfo', () => {
  let props = {
    item: mockAdvertiser,
    latitude: -33.877,
    longitude: 151.205,
  };

  const setup = () => renderHook(() => useInstoreAdvertiserInfo(props));

  beforeEach(() => {
    props = {
      item: mockAdvertiser,
      latitude: -33.877,
      longitude: 151.205,
    };
  });

  it('should return correct data', () => {
    const { result } = setup();

    const { imageUrl, logoUrl, numStores, title } = result.current;

    expect(logoUrl).toBe(mockAdvertiser.offers[0]?.logoUrl);
    expect(imageUrl).toBe(mockAdvertiser.offers[0]?.imageUrl);
    expect(numStores).toBe(13);
    expect(title).toBe(mockAdvertiser.offers[0]?.title);
  });

  it('should display "Various offers available" if there are multiple offers', () => {
    props.item = {
      ...mockAdvertiser,
      offers: [mockAdvertiser.offers[0], mockAdvertiser.offers[0]],
    };

    const { result } = setup();
    const { title } = result.current;
    expect(title).toBe('Various offers available');
  });
});
