import {
  HeroDollarClientType,
  HeroDollarReasonType,
  HeroDollarTransactionType,
  type HeroDollarTransactions,
} from '../../../graphql/generated';
import { aHeroDollarBalance, aHeroDollarTransactionDetail, aHeroDollarTransactions } from '../../mocks/generated-mocks';

const TOTAL_ITEMS = 8;
const ITEM_PER_PAGE = 5;

const mockTransactionList = [
  {
    id: '1',
    refId: '724ed3eb-d4b4-4078-aeca-6f6deda04bf7',
    amount: -0.35,
    transactionType: HeroDollarTransactionType.Withdrawal,
    clientType: HeroDollarClientType.EbfShaype,
    transactionTimeUtc: '2023-05-17T10:51:22.694Z',
    reason: 'Transaction fee for xxxx-xxxx',
    reasonType: HeroDollarReasonType.TransactionFee,
  },
  {
    id: '2',
    refId: '724ed3eb-d4b4-4078-aeca-6f6deda04bf7',
    amount: -10,
    transactionType: HeroDollarTransactionType.Withdrawal,
    clientType: HeroDollarClientType.EbfShaype,
    transactionTimeUtc: '2023-05-17T10:51:22.694Z',
    reason: 'Transfer to Spend Account',
    merchant_name: 'Endota Spa',
    reasonType: HeroDollarReasonType.Default,
  },
  {
    id: '3',
    refId: 'ref-id',
    amount: 20.0,
    transactionTimeUtc: '2022-12-26T17:16:02.890Z',
    transactionType: HeroDollarTransactionType.Topup,
    clientType: HeroDollarClientType.Nomination,
    reason: 'Happy Workversarry!',
    reasonType: HeroDollarReasonType.Default,
  },
  {
    id: '4',
    refId: 'ref-id',
    amount: -20.0,
    transactionTimeUtc: '2022-12-19T17:15:02.890Z',
    transactionType: HeroDollarTransactionType.Withdrawal,
    clientType: HeroDollarClientType.Marketplace,
    merchant_name: 'merchant name',
    reasonType: HeroDollarReasonType.Default,
  },
  {
    id: '5',
    refId: 'ref-id',
    amount: 25.0,
    transactionTimeUtc: '2022-12-19T17:15:02.890Z',
    transactionType: HeroDollarTransactionType.Topup,
    clientType: HeroDollarClientType.EmployeeMilestone,
    reason: 'happy_birthday',
    organization_name: 'Org name',
    reasonType: HeroDollarReasonType.Default,
  },
  {
    id: '6',
    refId: 'ref-id',
    amount: 100.0,
    transactionTimeUtc: '2022-12-19T17:15:02.890Z',
    transactionType: HeroDollarTransactionType.Topup,
    clientType: HeroDollarClientType.Sap,
    reason: 'Thank you for your hard work!',
    reasonType: HeroDollarReasonType.Default,
  },
  {
    id: '7',
    refId: 'ref-id',
    amount: 20.0,
    transactionTimeUtc: '2022-12-17T17:15:02.890Z',
    transactionType: HeroDollarTransactionType.Topup,
    clientType: HeroDollarClientType.OrganisationIssuance,
    reason: 'Merry Christmas!',
    reasonType: HeroDollarReasonType.Default,
  },
  {
    id: '8',
    refId: 'ref-id',
    amount: 30.0,
    transactionTimeUtc: '2022-12-15T17:16:02.890Z',
    transactionType: HeroDollarTransactionType.Topup,
    clientType: HeroDollarClientType.EmploymentHero,
    reason: 'Distributed by EH',
    reasonType: HeroDollarReasonType.Default,
  },
];

const getTransactionListByPage = (page = 1) => {
  const startIndex = (page - 1) * ITEM_PER_PAGE;

  return mockTransactionList.slice(startIndex, startIndex + ITEM_PER_PAGE);
};

const mockTransactionHistory: { [key: number]: HeroDollarTransactions } = {
  1: {
    itemPerPage: ITEM_PER_PAGE,
    pageIndex: 1,
    totalItems: TOTAL_ITEMS,
    totalPages: 2,
    items: getTransactionListByPage(1),
  },
  2: {
    itemPerPage: ITEM_PER_PAGE,
    pageIndex: 2,
    totalItems: TOTAL_ITEMS,
    totalPages: 2,
    items: getTransactionListByPage(2),
  },
};

export const mockHDBalance = (balance = 1000) => aHeroDollarBalance({ balance });

export const mockHDTransactions = (pageIndex = 1) => aHeroDollarTransactions(mockTransactionHistory[pageIndex]);

export const mockHDTransactionDetail = (transactionId = '1') => {
  return aHeroDollarTransactionDetail(mockTransactionList[parseInt(transactionId) - 1]);
};
