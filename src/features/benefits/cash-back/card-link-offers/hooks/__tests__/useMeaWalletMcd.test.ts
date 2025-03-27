import { renderHook } from '../../../../../../common/utils/testing';
import { useGetOemProvisioningQuery } from '../../../../../../new-graphql/generated';
import { AutoEnrolStatus } from '../../constants/autoEnrol';
import { useMeaWalletMcd } from '../useMeaWalletMcd';

jest.mock('../../../../../../new-graphql/generated', () => ({
  useGetOemProvisioningQuery: jest.fn(),
}));

describe('useMeaWalletMcd hook', () => {
  it('should throw error when there is no OEM data', async () => {
    (useGetOemProvisioningQuery as unknown as jest.Mock).mockReturnValue({ data: undefined });

    const {
      result: {
        current: { getUserCardData },
      },
    } = renderHook(() => useMeaWalletMcd());

    await expect(getUserCardData()).rejects.toThrow(AutoEnrolStatus.NO_OEM_DATA);
  });
});
