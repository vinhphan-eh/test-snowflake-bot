import { FeeType } from '../../../../new-graphql/generated';
import { anInstapayBankAccount } from '../../../../new-graphql/mocks/generated-mocks';

export const mockedSSABankAccount = {
  ...anInstapayBankAccount({
    externalId: '1',
    feeV2: {
      type: FeeType.Percentage,
      percentage: 1.3,
    },
  }),
  isSSA: true,
};

export const mockedNonSSABankAccount = {
  ...anInstapayBankAccount({
    externalId: '2',
    feeV2: {
      type: FeeType.Percentage,
      percentage: 1.5,
    },
  }),
  isSSA: false,
};
