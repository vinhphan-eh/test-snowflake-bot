import { mockInstoreOffersGroupByAdvertisers } from '../../../../../new-graphql/handlers/custom-mock/cashback';
import { formatAdvertiserName, getNearByLocationsFromAdvertisers } from '../offer';

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const mockAdvertisers = mockInstoreOffersGroupByAdvertisers.me!.cashback!.allAdvertisers.edges.map(e => e.node);

describe('offer tests', () => {
  describe('formatAdvertiserName', () => {
    test.each([
      ['Adidas In-store', 'Adidas'],
      ['Nike InStore', 'Nike'],
      ['Instore merchant', 'merchant'],
      ['merchant (In-store)', 'merchant'],
    ])('should format advertiser %p correctly', (origin, expected) => {
      const received = formatAdvertiserName(origin);
      expect(received).toEqual(expected);
    });
  });

  describe('getNearByLocationsFromAdvertisers', () => {
    it('should return correct nearby locations', () => {
      const locations = getNearByLocationsFromAdvertisers(mockAdvertisers, -33.877, 151.205);
      expect(locations.length).toBe(30);
    });
  });
});
