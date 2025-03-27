import React from 'react';
import { regionLocalisationMockUtil } from '../../../../../../test-setup/utils/regionLocalisationMockUtil';
import { render } from '../../../../../common/utils/testing';
import { SwagIntroCarousel } from '../SwagIntroCarousel';

describe('Swag Intro Carousel', () => {
  describe('for AU', () => {
    it('should render correctly', () => {
      regionLocalisationMockUtil('AU');

      const { getByText } = render(<SwagIntroCarousel onCancel={jest.fn()} onContinue={jest.fn()} />);
      expect(getByText('Be aged 16 years or older')).toBeTruthy();
      expect(getByText(/Be an Australian citizen or permanent resident/)).toBeTruthy();
    });
  });

  describe('for UK', () => {
    it('should render correctly', () => {
      regionLocalisationMockUtil('GB');

      const { getByText } = render(<SwagIntroCarousel onCancel={jest.fn()} onContinue={jest.fn()} />);
      expect(getByText('Be aged 18 years or older')).toBeTruthy();
      expect(getByText(/Be a UK citizen or permanent resident/)).toBeTruthy();
    });
  });
});
