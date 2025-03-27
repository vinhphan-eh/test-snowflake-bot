import {
    IdvProfileStatus,
    mockAddBeneficiaryMutation,
    mockGetIdvProfileV2Query,
    mockGetWalletTransactionsV2Query
} from '../generated';
import {mockGetOemProvisioningDataWithoutOtpQuery, mockGetStashMetaQuery} from "../../graphql/generated";
import {aFinancialTransaction} from "../mocks/generated-mocks";

export const floatAccountHandlers = [
  mockAddBeneficiaryMutation((_, res, ctx) => {
    return res(
      ctx.delay(2000),
      ctx.data({
        floatAccount:{
          addBeneficiary:{
            __typename: "NewBeneficiaryPayload",
            beneficiaryId: '123',
          }
        }
      })
    );
  }),
    mockGetOemProvisioningDataWithoutOtpQuery((_, res, ctx) => {
      return res(
          ctx.delay(100),
          ctx.data({
              getOemProvisioningDataWithoutOTP: null,
          })
      );
    }),
    mockGetIdvProfileV2Query((_, res, ctx) => {
        return res(
            ctx.delay(100),
            ctx.data({
                me: {
                    wallet: {
                        IDVProfile: {
                            status: IdvProfileStatus.Pass,
                        }
                    }
                }
            })
        )
    }),
    mockGetStashMetaQuery((_, res, ctx) => {
        return res(
            ctx.delay(100),
            ctx.data({
                getStashMeta: {
                    isMarketingCardFinished:true,
                    isStashEntryButtonInSpendAccountHidden:true
                }
            })
        )
    }),
    mockGetWalletTransactionsV2Query((_, res, ctx) => {
        return res(
            ctx.delay(100),
            ctx.data({
                me:{
                    wallet:{
                        transactions: [
                            aFinancialTransaction()
                        ]
                    }
                }
            })
        )
    })
];
