import images from '../../../../../common/assets/images';
import { mapCardIconSource } from '../card';

describe('card utils', () => {
  describe('mapCardIconSource', () => {
    it.each`
      issuer          | icon
      ${'visa'}       | ${images.visa}
      ${'mastercard'} | ${images.mastercard}
      ${'jcb'}        | ${images.jcb}
      ${'amex'}       | ${images.amex}
      ${'discover'}   | ${images.discover}
      ${'invalid'}    | ${undefined}
    `('returns correct icon when issuer is $issuer', ({ icon, issuer }) => {
      expect(mapCardIconSource(issuer)).toBe(icon);
    });
  });
});
