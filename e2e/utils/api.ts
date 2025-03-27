import axios, { type AxiosError, type AxiosResponse } from 'axios';
import type { Dayjs } from 'dayjs';
import * as keypayApi from './instapay/keypay-api';
import type { EHAccountDetails } from './instapay/prepare-instapay-account';
import type { SupportedCountries } from './instapay/utils';
import { getRandomIntDigit, randomAlphaString } from './utils';
import { generateUUID } from '../../src/common/utils/numbers';
import { personalInfo, withActivatedCardAccount } from '../data/personal-info';
import {
  IdentityDocumentType,
  type GetEWalletAuAccountDetailsQuery,
  type GetStashesQuery,
} from '../new-graphql/generated';

const SWAG_PERSONAL_AUTH_API_URL = process.env.SWAG_PERSONAL_AUTH_API_URL as string;
const EH_AUTH_API_URL = process.env.EH_AUTH_API_URL as string;
export const SWAG_PERSONAL_NEW_API_URL = process.env.SWAG_PERSONAL_NEW_API_URL as string;
const MAIN_APP_ENDPOINT = process.env.MAIN_APP_ENDPOINT as string;
const { CLIENT_ID } = process.env;

interface LeaveRequest {
  id: number;
  status: string;
  start_date: string;
  end_date: string;
  leave_category_id: number;
}

interface LeaveRequestResponse {
  data: {
    items: LeaveRequest[];
  };
}

axios.defaults.timeout = 30_000; // 30 seconds

type Token = {
  eBenToken: string;
  ehToken?: string;
  kpToken?: string;
};

const createAuthHeader = ({ eBenToken, ehToken, kpToken }: Token): Record<string, string> => {
  const baseHeader = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${eBenToken}`,
  };

  if (ehToken) {
    return {
      ...baseHeader,
      'x-eh-session-token': ehToken,
    };
  }

  if (kpToken) {
    return {
      ...baseHeader,
      'x-keypay-token': kpToken,
    };
  }

  return baseHeader;
};

export const authenticateEhMobile = async (account: { username: string; password: string }) => {
  const { password, username } = account;
  const receiverRes = await axios.post(
    EH_AUTH_API_URL,
    {
      data: {
        attributes: {
          email: username,
          password,
          device_id: 'device_id_from_mobile_phone',
          device_info: {
            app_version: 0,
            platform: 'ebf_dev',
          },
          workzone_client_id: CLIENT_ID,
        },
      },
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  const ehAuthData = receiverRes.data;
  const { eh_account: ehAccount } = ehAuthData.data;
  let ehToken;
  let included;
  if (ehAccount) {
    ehToken = ehAccount.data.attributes?.session_token;
    included = ehAccount?.included || [];
  }

  return { ehToken, included };
};

type ExchangeEbfTokenResponse = {
  access_token: string;
  refresh_token: string;
  id_token: string;
};

export const exchangeEhToken = async (ehToken: string) => {
  const exchangeRes = await axios.post<never, AxiosResponse<ExchangeEbfTokenResponse>>(
    `${SWAG_PERSONAL_AUTH_API_URL}/auth/exchange`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${ehToken}`,
        'X-Device-Type': 'ios',
        'X-Device-Id': device.id,
      },
    }
  );

  return exchangeRes.data;
};

export const exchangeKpToken = async (kpAccessToken: string, country: `${SupportedCountries}` = 'AU') => {
  const regionHeader = country === 'GB' ? 'en-GB' : 'en-AU';

  const exchangeRes = await axios.post<never, AxiosResponse<ExchangeEbfTokenResponse>>(
    `${SWAG_PERSONAL_AUTH_API_URL}/auth/keypay-exchange`,
    {},
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: kpAccessToken,
        'X-Device-Type': 'ios',
        'X-Device-Id': device.id,
        'X-KeyPay-Region': regionHeader,
      },
    }
  );

  return exchangeRes.data;
};

const GetEWalletAuAccountDetailsDocument = `
  query GetEWalletAUAccountDetails {
    me {
      wallet {
        details {
          accountNumber
          bsb
          name
          availableBalance {
            type
            sign
            units
            subUnits
          }
        }
      }
    }
  }
`;

export const getWalletData = async ({ eBenToken, ehToken, kpToken }: Token) => {
  const walletRes = await axios.post<
    never,
    AxiosResponse<{
      data: GetEWalletAuAccountDetailsQuery;
    }>
  >(
    SWAG_PERSONAL_NEW_API_URL,
    {
      query: GetEWalletAuAccountDetailsDocument,
    },
    {
      headers: createAuthHeader({ eBenToken, ehToken, kpToken }),
    }
  );

  return walletRes?.data?.data;
};

interface BankAccountDetail {
  account_name: string;
  account_number: number;
  amount: string;
  bsb: string;
}

/**
 * Add new banking details (different from Hero Wallet) for an account
 * @param orgId: organization ID of the account
 * @param memberId: member ID of the account
 * @param bankAccountDetails: info of the bank accounts
 * @param sessionToken: EH's session token for authentication
 */

export const addBankingDetail = async (
  orgId: string,
  memberId: string,
  bankAccountDetails: BankAccountDetail[],
  sessionToken: string
) => {
  await axios.post(
    `${MAIN_APP_ENDPOINT}/api/v3/organisations/${orgId}/members/${memberId}/bank_accounts`,
    {
      bank_split_type: 0,
      bank_accounts: bankAccountDetails,
    },
    {
      headers: {
        'Session-Token': sessionToken,
      },
    }
  );
};

const PatchProfileDocument = `
  mutation PatchProfile($patch: EhProfilePatchInput!) {
    user {
      patchProfile(input: $patch) {
        userId
        userUuid
        avatarUrl
        firstName
        lastName
        email
        phoneNumber
        countryCode
        stateCode
      }
    }
  }
`;

const setCountry = async ({ eBenToken, ehToken, kpToken }: Token, countryCode: string) => {
  await axios.post(
    SWAG_PERSONAL_NEW_API_URL,
    {
      query: PatchProfileDocument,
      variables: {
        ehToken,
        patch: { countryCode },
      },
    },
    {
      headers: createAuthHeader({ ehToken, eBenToken, kpToken }),
    }
  );
};

export type TestAccountInfo = {
  orgId: string;
};

/**
 * Setup banking details for freshly created test account to properly enable PaySplit
 * @param testAccount newly freshly test account
 */
export const setupWalletForPaySplit = async (testAccount: {
  username: string;
  password: string;
}): Promise<TestAccountInfo> => {
  // eslint-disable-next-line no-console
  console.log('Setting up Hero Wallet and banking details');
  const { ehToken, included } = await authenticateEhMobile(testAccount);
  const exchangeData = await exchangeEhToken(ehToken);

  const eBenToken = exchangeData.access_token;

  await setCountry({ eBenToken, ehToken }, 'AUS');

  let orgId = '';
  let memberId = '';
  included.forEach(({ id, type }: { id: string; type: string }) => {
    if (type === 'organisations') {
      orgId = id;
    }
    if (type === 'members') {
      memberId = id;
    }
  });

  if (orgId && memberId) {
    // make sure new banking detail has different BSB and account number than Spend Account
    await addBankingDetail(
      orgId,
      memberId,
      [
        {
          account_name: 'Swag Personal E2E Test',
          account_number: 12345678,
          amount: '100',
          bsb: '220636',
        },
        {
          account_name: 'E2E Spend Account',
          account_number: 87654321,
          amount: '0',
          bsb: '636220',
        },
      ],
      ehToken
    );
  }

  // eslint-disable-next-line no-console
  console.log('Finished setting up Hero Wallet and banking details');
  return { orgId };
};

const GetStashesDocument = `
  query getStashes {
    me {
      wallet {
        stash {
          items {
            id
          }
        }
      }
    }
  }
`;

const CloseStashDocument = `
  mutation closeStash($stashId: ID!) {
    closeStash(stashId: $stashId)
  }
`;

export const closeStashReq = async (eBenToken: string, ehToken: string) => {
  const headers = createAuthHeader({ eBenToken, ehToken });
  // Get all stashes
  const response = await axios.post<never, AxiosResponse<{ data: GetStashesQuery }>>(
    SWAG_PERSONAL_NEW_API_URL,
    { query: GetStashesDocument },
    { headers }
  );
  const stashes = response.data?.data?.me?.wallet?.stash?.items || [];
  await Promise.all(
    stashes.map(stash =>
      axios.post(
        SWAG_PERSONAL_NEW_API_URL,
        { query: CloseStashDocument, variables: { stashId: stash?.id } },
        { headers }
      )
    )
  );
};

export const createRandomUser = async (customData?: { firstName?: string; lastName?: string }) => {
  const email = `e2e-eben-${generateUUID()}@gmail.com`;
  const password = '1234asdf!?';
  const firstName = customData?.firstName || 'First';
  const lastName = customData?.lastName || 'Last';

  await axios.post(
    'https://mobile.staging.ehrocks.com/sign_up/create_user',
    {
      user: {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        partner_code: 'tester',
      },
      via_promo_url: true,
      company_phone: '000000000',
      estimated_number_of_employees: 10,
      employing_entity_name: 'N/A',
      country: 'AU',
      reCaptchaToken: 'staging-recaptcha-token',
      via_sea_free_form: false,
      organisation_name: 'Test Org',
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  // eslint-disable-next-line no-console
  console.log(`Successfully created user ${email}!`);

  return {
    email,
    password,
    firstName,
    lastName,
  };
};

interface SuperfundMemberInfo {
  fund_choice: string;
  fund_name: string;
  fund_abn: string;
  product_id_number: string;
  usi: string;
  member_number: string;
}

/**
 * Setup superfund member for swag superfund account
 * @param orgId: organization ID of the account
 * @param memberId: member ID of the account
 * @param superfundMember: superfund member info
 * @param sessionToken: EH's session token for authentication
 */
export const addSuperfundMemberInfo = async (
  orgId: string,
  memberId: string,
  superfundMember: SuperfundMemberInfo,
  sessionToken: string
) => {
  await axios.post(
    `${MAIN_APP_ENDPOINT}/api/v3/organisations/${orgId}/members/${memberId}/superfund`,
    {
      superfund_member: { ...superfundMember },
    },
    {
      headers: {
        'Session-Token': sessionToken,
      },
    }
  );
};

export const createSwagSuperfundAccount = async () => {
  const { email, firstName, lastName, password } = await createRandomUser({
    firstName: `First${randomAlphaString(6)}`,
    lastName: `Last${randomAlphaString(6)}`,
  });
  const { ehToken, included } = await authenticateEhMobile({ username: email, password });
  const exchangeData = await exchangeEhToken(ehToken);

  const eBenToken = exchangeData?.access_token;
  await setCountry({ eBenToken, ehToken }, 'AUS');

  let orgId = '';
  let memberId = '';
  included.forEach(({ id, type }: { id: string; type: string }) => {
    if (type === 'organisations') {
      orgId = id;
    }
    if (type === 'members') {
      memberId = id;
    }
  });

  if (orgId && memberId) {
    await addSuperfundMemberInfo(
      orgId,
      memberId,
      {
        fund_name: 'Spaceship',
        member_number: '89898989',
        fund_abn: '74559365913',
        fund_choice: 'Regulated',
        product_id_number: 'MTA0100AU',
        usi: '609 051 15063003',
      },
      ehToken
    );
  }

  // eslint-disable-next-line no-console
  console.log(`Successfully created swag superfund account ${email}`);

  return {
    email,
    password,
    firstName,
    lastName,
  };
};

export const onboardUser = async (accessToken: string, email: string) => {
  const payload = {
    dateOfBirth: personalInfo.dateOfBirth,
    firstName: randomAlphaString(10),
    hasConsentedPrivacyPolicy: true,
    hasConsentedIdentityVerificationTerms: true,
    hasConsentedTermsConditions: true,
    lastName: randomAlphaString(10),
    middleName: personalInfo.userInfo.middleName,
    mailingAddress: {
      addressLine1: personalInfo.address.addressLine1,
      addressLine2: '',
      country: personalInfo.address.country,
      postcode: personalInfo.address.postcode,
      region: personalInfo.address.state,
      townOrCity: personalInfo.address.townOrCity,
    },
    phoneNumber: {
      countryCode: '+61',
      number: getRandomIntDigit(11).toString(),
    },
    residentialAddress: {
      country: personalInfo.address.country,
      postcode: personalInfo.address.postcode,
      region: personalInfo.address.state,
      townOrCity: personalInfo.address.townOrCity,
      streetName: personalInfo.address.streetName,
      streetNumber: personalInfo.address.streetNumber,
      streetType: personalInfo.address.streetType,
      unitNumber: '',
    },
    identityDocumentNumber: personalInfo.passport,
    identityDocumentType: IdentityDocumentType.Passport,
  };

  await axios.post('/e-wallet/setup-details/v1', payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    baseURL: SWAG_PERSONAL_AUTH_API_URL,
  });

  // eslint-disable-next-line no-console
  console.log(`Successfully onboarded user ${email}`);
};

export const orderCard = async (accessToken: string, email: string) => {
  const payload = {
    pin: withActivatedCardAccount.cardPassCode,
    idempotencyKey: generateUUID(),
  };

  await axios.post('/cards', payload, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    baseURL: SWAG_PERSONAL_AUTH_API_URL,
  });

  // eslint-disable-next-line no-console
  console.log(`Successfully ordered a card for user ${email}`);
};

export const createAndOnboardAUWallet = async () => {
  const { email, password } = await createRandomUser();
  const { ehToken } = await authenticateEhMobile({
    username: email,
    password,
  });
  const exchangeData = await exchangeEhToken(ehToken);
  const ebenToken = exchangeData?.access_token;

  // Onboard
  await onboardUser(ebenToken, email);

  // Order card
  await orderCard(ebenToken, email);

  return { email, password };
};

export const createLeaveRequest = async (
  account: EHAccountDetails,
  leaveData: { startDate: Dayjs; endDate: Dayjs; leaveCategoryId: number; unitType?: 'days' | 'hours' }
) => {
  const { ehToken } = await authenticateEhMobile({
    username: account.email,
    password: account.password,
  });
  const unitType = leaveData.unitType || 'hours';
  const leaveHours: { date: string; hours?: number }[] = [];

  const dateFormat = 'YYYY-MM-DD';
  let currentDate = leaveData.startDate;

  // Construct the leave request payload
  const basePayload = {
    leave_category_id: leaveData.leaveCategoryId,
    start_date: leaveData.startDate.format(dateFormat),
    end_date: leaveData.endDate.format(dateFormat),
    comment: '',
    unit_type: unitType,
    created_by: account.memberId,
  };

  while (currentDate.diff(leaveData.endDate) <= 0) {
    if (unitType === 'hours') {
      leaveHours.push({
        date: currentDate.format(dateFormat),
        hours: 7.6,
      });
    }

    // Move to the next date
    currentDate = currentDate.add(1, 'day');
  }

  const finalPayload =
    unitType === 'hours'
      ? { ...basePayload, leave_hours: leaveHours }
      : {
          ...basePayload,
          total_units: leaveData.endDate.diff(leaveData.startDate, 'day') + 1,
        };

  try {
    const existingLeaveRequests = await axios.get<LeaveRequestResponse>(
      `${MAIN_APP_ENDPOINT}/api/v3/organisations/${account.orgId}/members/${
        account.memberId
      }/leave_requests?leave_category_id=${leaveData.leaveCategoryId}&date[start]=${leaveData.startDate.format(
        dateFormat
      )}&date[end]=${leaveData.endDate.format(dateFormat)}`,
      {
        headers: {
          'Session-Token': ehToken,
        },
      }
    );
    if (existingLeaveRequests?.data?.data?.items?.length > 0) {
      console.log('Employee has existing leave request, skipping');
      return existingLeaveRequests?.data?.data?.items[0]?.id;
    }
    const leaveRequestRes = await axios.post(
      `${MAIN_APP_ENDPOINT}/api/v3/organisations/${account.orgId}/members/${account.memberId}/leave_requests`,
      {
        leave_request: finalPayload,
      },
      {
        headers: {
          'Session-Token': ehToken,
        },
      }
    );
    console.log('Leave request created successfully', leaveRequestRes?.data?.data?.id);
    return leaveRequestRes?.data?.data?.id;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error creating leave request', JSON.stringify((error as AxiosError).response?.data));
    throw new Error("Can't create leave request");
  }
};

export const deleteLeaveRequest = async (account: EHAccountDetails, leaveRequestId: number) => {
  const { ehToken } = await authenticateEhMobile({
    username: account.email,
    password: account.password,
  });

  await axios.delete(
    `${MAIN_APP_ENDPOINT}/api/v3/organisations/${account.orgId}/members/${account.memberId}/leave_requests/${leaveRequestId}`,
    {
      headers: {
        'Session-Token': ehToken,
      },
    }
  );
};

export const getEHAuthTokens = async (account: { username: string; password: string }) => {
  const { ehToken, included } = await authenticateEhMobile(account);
  const exchangeData = await exchangeEhToken(ehToken);

  /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
  const ebenToken = exchangeData.access_token;

  return { ebenToken, ehToken, included };
};

export const getKPAuthTokens = async (account: { email: string; password: string }) => {
  const loginKpResponse = await keypayApi.login({
    email: account.email,
    password: account.password,
  });
  const kpToken = loginKpResponse.access_token;
  const ebfTokenExchangeResponse = await exchangeKpToken(kpToken);
  const ebenToken = ebfTokenExchangeResponse.access_token;

  return { ebenToken, kpToken };
};
