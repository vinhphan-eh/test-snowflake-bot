import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { PaySplitIntroScreen } from '../PaySplitIntroScreen';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';

jest.mock('../../../../../common/stores/useSessionStore');

const setup = ({ isRebrand = false }: { isRebrand?: boolean }) => {
  (useSessionStore as unknown as jest.Mock).mockReturnValue({
    swagTextAndImageRebrandEnabled: isRebrand,
    map: jest.fn().mockReturnValue([]),
  });
};

describe('Pay Account Switch Intro Screen', () => {
  describe('when rebranding is enabled', () => {
    it('should render properly', () => {
      setup({ isRebrand: true });
      const { getByLabelText, getByText } = render(<PaySplitIntroScreen />);

      expect(getByLabelText('PaySplit Intro')).toBeTruthy();
      expect(
        getByText(
          'Spend less time on admin by automatically topping up your account funds. Use them to spend smart in our Perks Store, and save more on Cashback offers.'
        )
      ).toBeTruthy();
    });
  });

  describe('when rebranding is disabled', () => {
    it('should render properly', () => {
      setup({});
      const { getByLabelText, getByText } = render(<PaySplitIntroScreen />);

      expect(getByLabelText('PaySplit Intro')).toBeTruthy();
      expect(
        getByText(
          'Spend less time on admin by automatically topping up your account funds. Use them to spend smart in our Swag Store, and save more on Cashback offers.'
        )
      ).toBeTruthy();
    });
  });
});
