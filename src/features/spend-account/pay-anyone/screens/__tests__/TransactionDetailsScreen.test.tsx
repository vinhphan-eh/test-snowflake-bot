import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import type { BsbTransferPeerDetails, FasterPaymentsTransferPeerDetails } from '../../../../../new-graphql/generated';
import { CurrencyType, TransactionType } from '../../../../../new-graphql/generated';
import { aFinancialTransaction } from '../../../../../new-graphql/mocks/generated-mocks';
import { TransactionDetailsScreen } from '../TransactionDetailsScreen';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';

jest.mock('../../../../../common/stores/useSessionStore');
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Transaction Details Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });

    mockedUseRoute.mockReturnValue({
      params: {
        transaction: aFinancialTransaction(),
      },
      key: '',
      name: '',
    });
  });

  it('should render properly with card transaction', () => {
    const { getByText } = render(<TransactionDetailsScreen />);
    const titles = ['You spent', 'When', 'At this merchant'];
    titles.forEach(item => expect(getByText(item)).toBeTruthy());
  });

  it('should show full information when positive amount', () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transaction: { ...aFinancialTransaction({ cardId: '' }) },
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<TransactionDetailsScreen />);
    const titles = ['You received', 'Description', 'From'];
    titles.forEach(item => expect(getByText(item)).toBeTruthy());
  });

  it('should show full information when negative amount', () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transaction: {
          ...aFinancialTransaction({ cardId: '' }),
          currencyAmount: {
            type: CurrencyType.CurrencyTypeAud,
            units: -100,
            subUnits: 0,
          },
        },
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<TransactionDetailsScreen />);
    const titles = ['You sent', 'Description', 'To this account'];
    titles.forEach(item => expect(getByText(item)).toBeTruthy());
  });

  it('should go to Wallet Dashboard screen by clicking Done button', () => {
    const { getByLabelText } = render(<TransactionDetailsScreen />);
    const button = getByLabelText('Done');
    fireEvent.press(button);
    expect(mockNavigateToTopTabs).toBeCalledWith('spend-tab');
  });

  describe('should format transfer peer details properly', () => {
    it('case of BSBPeerTransfer', async () => {
      mockedUseRoute.mockReturnValue({
        params: {
          transaction: {
            dateTimeUTC: '2023-05-10T00:00:00Z',
            id: '1',
            type: TransactionType.TransferOut,
            currencyAmount: {
              type: CurrencyType.CurrencyTypeAud,
              units: -1,
              subUnits: 25,
            },
            transferPeerDetails: {
              accountNumber: '12345678',
              bsb: '123456',
              name: 'AccountName',
            } as BsbTransferPeerDetails,
          },
        },
        key: '',
        name: '',
      });

      const { getByText } = render(<TransactionDetailsScreen />);
      expect(getByText('123-456 12345678')).toBeTruthy();
    });

    it('case of FasterPaymentPeerTransfer', async () => {
      mockedUseRoute.mockReturnValue({
        params: {
          transaction: {
            dateTimeUTC: '2023-05-10T00:00:00Z',
            id: '2',
            type: TransactionType.TransferOut,
            currencyAmount: {
              type: CurrencyType.CurrencyTypeAud,
              units: -1,
              subUnits: 25,
            },
            transferPeerDetails: {
              accountNumber: '12345678',
              sortCode: '123456',
              name: 'AccountName',
            } as FasterPaymentsTransferPeerDetails,
          },
        },
        key: '',
        name: '',
      });

      const { getByText } = render(<TransactionDetailsScreen />);
      expect(getByText('12-34-56 12345678')).toBeTruthy();
    });
  });

  describe('non card transaction from PokitPal', () => {
    beforeEach(() => {
      mockedUseRoute.mockReturnValue({
        params: {
          transaction: {
            ...aFinancialTransaction({
              cardId: '',
              transferPeerDetails: {
                name: 'pokitpal',
              },
            }),
          },
        },
        key: '',
        name: '',
      });
    });

    describe('when rebranding is enabled', () => {
      it('should render correctly', () => {
        (useSessionStore as unknown as jest.Mock).mockReturnValue({
          swagTextAndImageRebrandEnabled: true,
        });
        const { getByText } = render(<TransactionDetailsScreen />);
        const titles = ['You received', 'Description', 'From', 'Employment Hero Cashback Program'];
        titles.forEach(item => expect(getByText(item)).toBeTruthy());
      });
    });

    describe('when rebranding is disabled', () => {
      it('should render correctly', () => {
        const { getByText } = render(<TransactionDetailsScreen />);
        const titles = ['You received', 'Description', 'From', 'Swag Cashback Program'];
        titles.forEach(item => expect(getByText(item)).toBeTruthy());
      });
    });
  });
});
