import { getEnvConfig } from '../common/utils/env';
import { apiKeyHandlers } from '../graphql/handlers/apiKeyHandler';
import { cardManagementHandlers } from '../graphql/handlers/cardManagementHandlers';
import { cashbackOffersHandlers } from '../graphql/handlers/cashbackOffersHandlers';
import { eWalletHandlers } from '../graphql/handlers/eWalletHandlers';
import { heroDollarHandlers } from '../graphql/handlers/heroDollarHandlers';
import { heroShopHandlers } from '../graphql/handlers/heroShopHandlers';
import { incomeHandlers } from '../graphql/handlers/incomeHandlers';
import { profileHandlers } from '../graphql/handlers/profileHandlers';
import { stashHandlers } from '../graphql/handlers/stashHandlers';
import { transactionV2Handlers } from '../graphql/handlers/transactionV2Handler';
import { userHandlers } from '../graphql/handlers/userHandlers';
import { benefitHandlers } from '../new-graphql/handlers/benefitHandlers';
import { billManagementHandlers } from '../new-graphql/handlers/billManagementHandlers';
import { bsWaitlistHandlers } from '../new-graphql/handlers/bsWaitlistHandlers';
import { cashbackHandlers } from '../new-graphql/handlers/cashbackHandlers';
import { experimentHandlers } from '../new-graphql/handlers/experimentHandlers';
import { floatAccountHandlers } from '../new-graphql/handlers/floatAccountHandlers';
import { groupHandlers } from '../new-graphql/handlers/groupHandlers';
import { heroPointsHandlers } from '../new-graphql/handlers/heroPointsHandlers';
import { instapayHandlers } from '../new-graphql/handlers/instapayHandlers';
import { restHandlers } from '../new-graphql/handlers/rest';
import { superHandlers } from '../new-graphql/handlers/superHandlers';
import { authApiHandlers } from '../restful/handlers/authApiHandlers';

export const handlers = [
  ...authApiHandlers(getEnvConfig().SWAG_PERSONAL_AUTH_API_URL),
  ...userHandlers,
  ...eWalletHandlers,
  ...incomeHandlers,
  ...heroShopHandlers,
  ...heroDollarHandlers,
  ...cashbackOffersHandlers,
  ...profileHandlers,
  ...transactionV2Handlers,
  ...superHandlers,
  ...groupHandlers,
  ...instapayHandlers,
  ...cardManagementHandlers,
  ...bsWaitlistHandlers,
  ...heroPointsHandlers,
  ...billManagementHandlers,
  ...floatAccountHandlers,
  ...experimentHandlers,
  ...apiKeyHandlers,
  ...groupHandlers,
  ...cashbackHandlers,
  ...restHandlers,
  ...stashHandlers,
  ...benefitHandlers,
];
