import { HeroPointsTransactionType, type HeroPointsTransactionHistories, HeroPointsClientType, HeroPointsReasonType } from "../../generated";
import { aHeroPointsTransaction, aHeroPointsTransactionHistories } from "../../mocks/generated-mocks";

const TOTAL_ITEMS = 8;
const ITEM_PER_PAGE = 5;

const mockTransactionList = [
  {
    id: '1',
    refId: '724ed3eb-d4b4-4078-aeca-6f6deda04bf7',
    points: -350,
    transactionType: HeroPointsTransactionType.Withdrawal,
    clientType: HeroPointsClientType.EbfShaype,
    transactionTimeUtc: '2023-05-17T10:51:22.694Z',
    reason: 'Transaction fee for xxxx-xxxx',
    reasonType: HeroPointsReasonType.TransactionFee,
  },
  {
    id: '2',
    refId: '724ed3eb-d4b4-4078-aeca-6f6deda04bf7',
    points: -200,
    transactionType: HeroPointsTransactionType.Withdrawal,
    clientType: HeroPointsClientType.EbfShaype,
    transactionTimeUtc: '2023-05-17T10:51:22.694Z',
    reason: 'Transfer to Spend Account',
    merchantName: 'Endota Spa',
    reasonType: HeroPointsReasonType.Default,
  },
  {
    id: '3',
    refId: 'ref-id',
    points: 1220,
    transactionTimeUtc: '2022-12-26T17:16:02.890Z',
    transactionType: HeroPointsTransactionType.Topup,
    clientType: HeroPointsClientType.Nomination,
    recognisedBy: 'John Smith',
    reason: 'Happy Workversarry!',
    reasonType: HeroPointsReasonType.Default,
  },
  {
    id: '4',
    refId: 'ref-id',
    points: -1200,
    transactionTimeUtc: '2022-12-19T17:15:02.890Z',
    transactionType: HeroPointsTransactionType.Withdrawal,
    clientType: HeroPointsClientType.Marketplace,
    merchantName: 'merchant name',
    reasonType: HeroPointsReasonType.Default,
  },
  {
    id: '5',
    refId: 'ref-id',
    points: 525,
    transactionTimeUtc: '2022-12-19T17:15:02.890Z',
    transactionType: HeroPointsTransactionType.Topup,
    clientType: HeroPointsClientType.EmployeeMilestone,
    reason: 'happy_birthday',
    organisationName: 'Org name',
    reasonType: HeroPointsReasonType.Default,
  },
  {
    id: '6',
    refId: 'ref-id',
    points: 100,
    transactionTimeUtc: '2022-12-19T17:15:02.890Z',
    transactionType: HeroPointsTransactionType.Topup,
    clientType: HeroPointsClientType.Sap,
    reason: 'Thank you for your hard work!',
    reasonType: HeroPointsReasonType.Default,
  },
  {
    id: '7',
    refId: 'ref-id',
    points: 20,
    transactionTimeUtc: '2022-12-17T17:15:02.890Z',
    transactionType: HeroPointsTransactionType.Topup,
    clientType: HeroPointsClientType.OrganisationIssuance,
    reason: 'Merry Christmas!',
    reasonType: HeroPointsReasonType.Default,
  },
  {
    id: '8',
    refId: 'ref-id',
    points: 30,
    transactionTimeUtc: '2022-12-15T17:16:02.890Z',
    transactionType: HeroPointsTransactionType.Topup,
    clientType: HeroPointsClientType.EmploymentHero,
    reason: 'Distributed by EH',
    reasonType: HeroPointsReasonType.Default,
  },
];

const getTransactionListByPage = (page = 1) => {
    const startIndex = (page - 1) * ITEM_PER_PAGE;
  
    return mockTransactionList.slice(startIndex, startIndex + ITEM_PER_PAGE);
  };

const mockTransactionHistory: { [key: number]: HeroPointsTransactionHistories } = {
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

export const mockHeroPointsTransactionHistories = (pageIndex = 1) => aHeroPointsTransactionHistories(mockTransactionHistory[pageIndex]);

export const mockHeroPointsTransactionDetail = (transactionId = '1') => {
  return aHeroPointsTransaction(mockTransactionList[parseInt(transactionId) - 1]);
};
