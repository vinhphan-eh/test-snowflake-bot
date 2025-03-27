import React from 'react';
import { act, render, renderHook } from '../../../../common/utils/testing';
import type { InstapayTransaction } from '../../../../new-graphql/generated';
import { CurrencyType, Sign } from '../../../../new-graphql/generated';
import { anInstapayTransaction } from '../../../../new-graphql/mocks/generated-mocks';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { useInstaPayDrawdownStore } from '../../../income/instapay/stores/useInstaPayDrawdownStore';
import { InstaPayTransactionItem } from '../InstaPayTransactionItem';

describe('InstaPayTransactionItem', () => {
  beforeEach(() => {
    const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
    act(() => {
      drawdownStore.current.setWorkCountry(Region.au);
    });
  });

  describe('InstaPay Now', () => {
    it('should render correctly', () => {
      const transaction: InstapayTransaction = {
        id: '61349b19-e59f-4030-8711-fbc96dd4e0aa',
        bankAccount: {
          accountName: 'bank account',
        },
        amount: {
          units: 100,
          subUnits: 2,
          type: CurrencyType.CurrencyTypeAud,
        },
        createdAt: '2024-04-24T14:25:04.011Z',
        abaLodgementReference: 'IP0000004JFGR7JRJSZ81W2210ZB',
        __typename: 'InstapayTransaction',
        memberId: 'e95e12c7-9ab6-4a7b-b34e-2eedaf1c0f1e',
        adminFee: {
          units: 2,
          subUnits: 2,
          type: CurrencyType.CurrencyTypeAud,
          sign: Sign.Negative,
        },
      };
      const { getByText, queryByText } = render(<InstaPayTransactionItem transaction={transaction} index={0} />);

      expect(getByText('Earned Pay')).toBeVisible();
      expect(getByText('24 Apr 2024, 02:25PM')).toBeVisible();
      expect(getByText('Amount')).toBeVisible();
      expect(getByText('$100.02')).toBeVisible();
      expect(getByText('Account')).toBeVisible();
      expect(getByText('bank account')).toBeVisible();
      expect(getByText('BSB')).toBeVisible();
      expect(queryByText('Sort code')).not.toBeTruthy();
    });

    it('should render Sort code label instead of BSB if user is from UK', () => {
      const { result: drawdownStore } = renderHook(() => useInstaPayDrawdownStore());
      act(() => {
        drawdownStore.current.setWorkCountry(Region.gb);
      });

      const transaction = anInstapayTransaction({
        amount: {
          units: 100,
          subUnits: 2,
          type: CurrencyType.CurrencyTypeGbp,
        },
      });
      const { getByText, queryByText } = render(<InstaPayTransactionItem transaction={transaction} index={0} />);

      expect(getByText('£100.02')).toBeVisible();
      expect(queryByText('BSB')).not.toBeTruthy();
      expect(getByText('Sort code')).toBeVisible();
    });
  });

  describe('InstaPay Daily', () => {
    it('should render correctly', () => {
      const transaction: InstapayTransaction = {
        id: '61349b19-e59f-4030-8711-fbc96dd4e0aa',
        bankAccount: {
          accountName: 'bank account',
        },
        amount: {
          units: 100,
          subUnits: 2,
          type: CurrencyType.CurrencyTypeAud,
        },
        createdAt: '2024-04-24T16:44:45.951Z',
        abaLodgementReference: 'DP0000004JFGR7JRJSZ81W2210ZB',
        __typename: 'InstapayTransaction',
        memberId: 'e95e12c7-9ab6-4a7b-b34e-2eedaf1c0f1e',
        adminFee: {
          units: 2,
          subUnits: 2,
          type: CurrencyType.CurrencyTypeGbp,
          sign: Sign.Negative,
        },
      };
      const { getByText } = render(<InstaPayTransactionItem transaction={transaction} index={0} />);

      expect(getByText('Earned Pay Daily')).toBeVisible();
      expect(getByText('24 Apr 2024, 04:44PM')).toBeVisible();
      expect(getByText('Amount')).toBeVisible();
      expect(getByText('$100.02')).toBeVisible();
      expect(getByText('Account')).toBeVisible();
      expect(getByText('bank account')).toBeVisible();
    });
  });
});
