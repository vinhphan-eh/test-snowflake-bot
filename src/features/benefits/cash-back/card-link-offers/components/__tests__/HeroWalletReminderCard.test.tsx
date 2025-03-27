import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import { HeroWalletReminderCard } from '../HeroWalletReminderCard';

describe('HeroWalletReminderCard', () => {
  const onPressedMock = jest.fn();

  it('should call onPress prop', () => {
    const { getByText } = render(<HeroWalletReminderCard onPress={onPressedMock} />);
    const button = getByText('Open a Spend account');
    fireEvent.press(button);
    expect(onPressedMock).toHaveBeenCalled();
  });

  test.each([
    { cashbackBalance: 0, text: 'Claim your cash!' },
    { cashbackBalance: 4, text: 'Grab a coffee.' },
    { cashbackBalance: 15, text: 'Catch a movie.' },
    { cashbackBalance: 75, text: 'Go out for dinner.' },
    { cashbackBalance: 110, text: 'Okay, Elon...' },
  ])(
    'should display correctly $text text when cashback balance is $cashbackBalance',
    async ({ cashbackBalance, text }) => {
      const { getByText } = render(
        <HeroWalletReminderCard onPress={onPressedMock} cashbackBalance={cashbackBalance} />
      );
      expect(getByText(text)).toBeTruthy();
    }
  );
});
