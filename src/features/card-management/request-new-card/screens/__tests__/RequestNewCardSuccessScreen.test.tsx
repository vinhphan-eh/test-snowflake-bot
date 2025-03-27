import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { RequestNewCardSuccessScreen } from '../RequestNewCardSuccessScreen';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';

jest.mock('../../../../../common/stores/useSessionStore');

const setup = ({ isRebrand = false }: { isRebrand?: boolean }) => {
  (useSessionStore as unknown as jest.Mock).mockReturnValue({
    swagTextAndImageRebrandEnabled: isRebrand,
    map: jest.fn().mockReturnValue([]),
  });
};

describe('Request New Card Success Screen', () => {
  describe('when rebranding is enabled', () => {
    it('should render properly', () => {
      setup({ isRebrand: true });
      const { getByText, queryByText } = render(<RequestNewCardSuccessScreen />);
      expect(getByText('Your card is on the way!')).toBeTruthy();
      expect(getByText('Done')).toBeTruthy();
      expect(
        getByText('Your old card has been cancelled and your new one should arrive within 7-10 business days.')
      ).toBeTruthy();
      expect(getByText('You can use your digital card in your Wallet straight away.')).toBeTruthy();
      expect(
        queryByText(
          'Please note that your card will be auto enrolled into the Employment Hero benefits cashback program. More information',
          { exact: false }
        )
      ).toBeNull();
    });
  });

  describe('when rebranding is disabled', () => {
    it('should render properly', () => {
      setup({});
      const { getByText, queryByText } = render(<RequestNewCardSuccessScreen />);
      expect(getByText('Your card is on the way!')).toBeTruthy();
      expect(getByText('Done')).toBeTruthy();
      expect(
        getByText('Your old card has been cancelled and your new one should arrive within 7-10 business days.')
      ).toBeTruthy();
      expect(getByText('You can use your digital card in your Wallet straight away.')).toBeTruthy();
      expect(
        queryByText(
          'Please note that your card will be auto enrolled into the Swag benefits cashback program. More information',
          { exact: false }
        )
      ).toBeNull();
    });
  });

  it('should go to Wallet dashboard', () => {
    setup({});
    const { getByText } = render(<RequestNewCardSuccessScreen />);
    const button = getByText('Done');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('card-tab');
  });
});
