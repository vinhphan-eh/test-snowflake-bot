import {mockGetStashesQuery, mockGetStashTransactionsQuery} from "../generated";
import {aStash, aStashTransaction} from "../mocks/generated-mocks";


export const stashHandlers = [
    mockGetStashesQuery((_, res, ctx) => {
       return res(ctx.delay(100),ctx.data({
           getStashes:[
               aStash({
                   imageUrl: 'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/CoverShot/advertiser_cover_image.1652861436_1652861436.Jpeg',
               })
           ]
       }))
   }),
    mockGetStashTransactionsQuery((_, res, ctx) => {
      return res(ctx.delay(100),ctx.data({
        getStashTransactions:[aStashTransaction()]
      }));
    })
]
