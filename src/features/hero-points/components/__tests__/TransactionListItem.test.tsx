import React from 'react';
import { render } from '../../../../common/utils/testing';
import type {
  HeroPointsClientType,
  HeroPointsReasonType,
  HeroPointsTransactionType,
} from '../../../../new-graphql/generated';
import { aHeroPointsTransactionItem } from '../../../../new-graphql/mocks/generated-mocks';
import { TransactionListItem } from '../TransactionListItem';
import { useSessionStore } from '../../../../common/stores/useSessionStore';

jest.mock('../../../../common/stores/useSessionStore');

const setup = (isRebrand = false) => {
  (useSessionStore as unknown as jest.Mock).mockReturnValue({
    swagTextAndImageRebrandEnabled: isRebrand,
  });
};

const mockTransaction = aHeroPointsTransactionItem({
  id: '2',
  refId: 'ref2',
  clientType: 'marketplace' as HeroPointsClientType,
  transactionType: 'withdrawal' as HeroPointsTransactionType,
  transactionTimeUtc: '2022-12-26T17:16:02.890Z',
  points: 100,
  reason: 'a reason',
});

describe('Hero Points Transaction List Item', () => {
  it('should render correctly', () => {
    setup();
    const transaction = mockTransaction;
    const { getByText } = render(<TransactionListItem transaction={transaction} />);

    expect(getByText('a reason')).toBeTruthy();
    expect(getByText('05:16pm')).toBeTruthy();
    expect(getByText('+')).toBeTruthy();
    expect(getByText('100', { exact: false })).toBeTruthy();
    expect(getByText('Withdrawal')).toBeTruthy();
  });

  describe('when reasonType is TRANSACTION_FEE', () => {
    it('should render correctly', () => {
      setup();
      const transaction = {
        ...mockTransaction,
        reasonType: 'TRANSACTION_FEE' as HeroPointsReasonType,
      };
      const { getByText, queryByText } = render(<TransactionListItem transaction={transaction} />);

      expect(queryByText('a reason')).not.toBeTruthy();
      expect(getByText('Transaction Fee')).toBeTruthy();
    });
  });

  describe('when clientType is EBF_SHAYPE', () => {
    it('should render correctly', () => {
      setup();
      const transaction = {
        ...mockTransaction,
        clientType: 'EBF_SHAYPE' as HeroPointsClientType,
      };
      const { getByText, queryByText } = render(<TransactionListItem transaction={transaction} />);

      expect(queryByText('a reason')).not.toBeTruthy();
      expect(getByText('Reimbursed to Spend account')).toBeTruthy();
    });
  });

  describe('when clientType is Marketplace', () => {
    describe('when rebranding is enabled', () => {
      it('should render correctly', () => {
        setup(true);

        const transaction = {
          ...mockTransaction,
          reason: undefined,
        };
        const { getByText } = render(<TransactionListItem transaction={transaction} />);

        expect(getByText('Perks Store')).toBeTruthy();
      });
    });

    describe('when rebranding is disabled', () => {
      it('should render correctly', () => {
        setup();

        const transaction = {
          ...mockTransaction,
          reason: undefined,
        };
        const { getByText } = render(<TransactionListItem transaction={transaction} />);

        expect(getByText('Swag Store')).toBeTruthy();
      });
    });
  });

  describe('when clientType is other one', () => {
    it.each`
      clientType                 | expectedText
      ${'EMPLOYEE_MILESTONE'}    | ${'Employee Milestone'}
      ${'EMPLOYMENT_HERO'}       | ${'Employment Hero'}
      ${'HERO_DOLLAR_PURCHASE'}  | ${'Hero Points Purchase'}
      ${'NOMINATION'}            | ${'Recognition'}
      ${'ORGANISATION_ISSUANCE'} | ${'Organisation Issuance'}
      ${'SAP'}                   | ${'SAP'}
    `('should render correctly when clientType is $clientType', ({ clientType, expectedText }) => {
      setup();
      const transaction = {
        ...mockTransaction,
        clientType: clientType as HeroPointsClientType,
        reason: undefined,
      };
      const { getByText } = render(<TransactionListItem transaction={transaction} />);

      expect(getByText(expectedText)).toBeTruthy();
    });
  });
});
