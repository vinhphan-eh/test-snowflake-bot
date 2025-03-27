import React from 'react';
import dayjs from 'dayjs';
import { mockUseIsAccountUK } from '../../../../../common/hooks/__mocks__/useIsAccountUK';
import { render } from '../../../../../common/utils/testing';
import { EstBalanceImageContentV3 } from '../InstapayNowEstBalanceImageContentV3';

describe('EstBalanceImageContentV3', () => {
  beforeEach(() => {
    mockUseIsAccountUK.mockReturnValue(false);
  });
  describe('when shouldShowAvailableBalance is true', () => {
    it('displays the correct balance', () => {
      const { getByText } = render(<EstBalanceImageContentV3 availableBalance={1234.56} shouldShowAvailableBalance />);
      expect(getByText('$1,234')).toBeTruthy();
    });

    test.each([
      {
        country: 'AU',
        symbol: '$',
      },
      {
        country: 'UK',
        symbol: '£',
      },
    ])('displays the correct balance and symbal in $country', ({ country, symbol }) => {
      mockUseIsAccountUK.mockReturnValue(country === 'UK');
      const { getByText } = render(<EstBalanceImageContentV3 availableBalance={1234.56} shouldShowAvailableBalance />);
      expect(getByText(`${symbol}1,234`)).toBeTruthy();
    });

    it('shows updating message when updatedAt is not provided', () => {
      const { getByText } = render(<EstBalanceImageContentV3 availableBalance={1000} shouldShowAvailableBalance />);
      expect(getByText('Updating your live balance')).toBeTruthy();
    });

    it('shows minutes ago when last update was less than an hour ago', () => {
      const updatedAt = dayjs().subtract(30, 'minute').toDate();
      const { getByText, queryByTestId } = render(
        <EstBalanceImageContentV3 availableBalance={1000} updatedAt={updatedAt} shouldShowAvailableBalance />
      );
      expect(queryByTestId('updated-at-text-block')).toBeTruthy();
      expect(getByText('Updated 30 minutes ago')).toBeTruthy();
    });

    it('shows hours ago when last update was more than an hour ago', () => {
      const updatedAt = dayjs().subtract(3, 'hour').toDate();
      const { getByText, queryByTestId } = render(
        <EstBalanceImageContentV3 availableBalance={1000} updatedAt={updatedAt} shouldShowAvailableBalance />
      );
      expect(queryByTestId('updated-at-text-block')).toBeTruthy();
      expect(getByText('Updated 3 hours ago')).toBeTruthy();
    });

    it('displays prefixText when provided', () => {
      const { getByText } = render(
        <EstBalanceImageContentV3
          availableBalance={1000}
          shouldShowAvailableBalance
          prefixText="Your current balance:"
        />
      );
      expect(getByText('Your current balance:')).toBeTruthy();
    });

    it('displays postfixText when provided', () => {
      const { getByText } = render(
        <EstBalanceImageContentV3 availableBalance={1000} shouldShowAvailableBalance postfixText="available now" />
      );
      expect(getByText('available now')).toBeTruthy();
    });
  });

  describe('when shouldShowAvailableBalance is false', () => {
    it('should display alternative content', () => {
      const { queryByTestId, queryByText } = render(
        <EstBalanceImageContentV3
          availableBalance={1000}
          shouldShowAvailableBalance={false}
          prefixText="Check your"
          postfixText="balance now"
        />
      );
      expect(queryByText('Check your')).toBeTruthy();
      expect(queryByText('balance now')).toBeTruthy();
      expect(queryByTestId('updated-at-text-block')).toBeNull();
    });

    it('should NOT display balance', () => {
      const { queryByTestId, queryByText } = render(
        <EstBalanceImageContentV3 availableBalance={1000} shouldShowAvailableBalance={false} />
      );
      expect(queryByText('$1,000')).toBeNull();
      expect(queryByText('Your latest balance is')).toBeNull();
      expect(queryByTestId('updated-at-text-block')).toBeNull();
    });
  });
});
