import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { useGetHeroPointsTransactionDetailQuery } from '../../../../new-graphql/generated';
import { mockHeroPointsTransactionDetail } from '../../../../new-graphql/handlers/custom-mock/heroPoints';
import { TransactionDetailsScreen } from '../TransactionDetailsScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
jest.mock('../../../../new-graphql/generated', () => ({
  useGetHeroPointsTransactionDetailQuery: jest.fn(),
  HeroPointsClientType: {
    Nomination: 'NOMINATION',
    EmployeeMilestone: 'EMPLOYEE_MILESTONE',
    Marketplace: 'MARKETPLACE',
    EbfShaype: 'EBF_SHAYPE',
  },
  HeroPointsReasonType: {
    TransactionFee: 'TRANSACTION_FEE',
  },
}));

describe('Transaction Details Screen', () => {
  beforeEach(() => {
    (useGetHeroPointsTransactionDetailQuery as unknown as jest.Mock).mockImplementation(({ id }: { id: string }) => ({
      data: {
        me: {
          heroPoints: {
            transactionDetails: mockHeroPointsTransactionDetail(id),
          },
        },
      },
    }));

    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('1'),
      },
      key: '',
      name: '',
    });
  });

  it('should render properly with nomination transaction', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('3'),
      },
      key: '',
      name: '',
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText('You received')).toBeTruthy();
    expect(await findByText('When')).toBeTruthy();
    expect(await findByText('Recognised by')).toBeTruthy();
    expect(await findByText('At')).toBeTruthy();
  });
  it('should render properly with card transaction', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('4'),
      },
      key: '',
      name: '',
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText('You spent')).toBeTruthy();
    expect(await findByText('When')).toBeTruthy();
    expect(await findByText('At this merchant')).toBeTruthy();
  });

  it('should render properly with card transaction', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('5'),
      },
      key: '',
      name: '',
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText('You received')).toBeTruthy();
    expect(await findByText('When')).toBeTruthy();
    expect(await findByText('From')).toBeTruthy();
    expect(await findByText('For')).toBeTruthy();
  });
  it('should render properly with card transaction', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('6'),
      },
      key: '',
      name: '',
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText('You received')).toBeTruthy();
    expect(await findByText('When')).toBeTruthy();
    expect(await findByText('For')).toBeTruthy();
  });

  it('should render properly with transaction fee', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('1'),
      },
      key: '',
      name: '',
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText('You spent')).toBeTruthy();
    expect(await findByText('When')).toBeTruthy();
    expect(await findByText('Description')).toBeTruthy();
  });

  it('should render properly with HD Redeem transaction', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('2'),
      },
      key: '',
      name: '',
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText('You spent')).toBeTruthy();
    expect(await findByText('When')).toBeTruthy();
    expect(await findByText('Description')).toBeTruthy();
    expect(await findByText('For your purchase at')).toBeTruthy();
  });

  it('should go back when click on done', async () => {
    const { getByLabelText } = render(<TransactionDetailsScreen />);
    const button = getByLabelText('Done');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should go back when click on back', async () => {
    const { getByTestId } = render(<TransactionDetailsScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should render error screen if there is a query failed', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        transactionData: mockHeroPointsTransactionDetail('4'),
      },
      key: '',
      name: '',
    });

    (useGetHeroPointsTransactionDetailQuery as unknown as jest.Mock).mockReturnValue({
      isError: true,
    });

    const { findByText } = render(<TransactionDetailsScreen />);
    expect(await findByText("We're sorry, something went wrong")).toBeTruthy();
  });
});
