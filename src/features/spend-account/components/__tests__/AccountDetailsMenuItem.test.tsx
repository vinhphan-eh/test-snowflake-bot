import React from 'react';
import { Share } from 'react-native';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { anEWalletDetails } from '../../../../graphql/mocks/generated-mocks';
import { anUkWalletDetails, aUserDetails } from '../../../../new-graphql/mocks/generated-mocks';
import { useGetSSADetails } from '../../hooks/useGetSSADetails';
import { AccountDetailsMenuItem } from '../AccountDetailsMenuItem';

const mockUserDetails = aUserDetails();
const mockWalletDetails = anEWalletDetails();
const mockUKWalletDetails = anUkWalletDetails();

jest.mock('../../hooks/useGetSSADetails', () => ({
  useGetSSADetails: jest.fn(),
}));

describe('Account Details Menu Item', () => {
  it('does not call Share.share if user details is missing', async () => {
    (useGetSSADetails as jest.Mock).mockReturnValue({
      data: undefined,
      currentRegion: 'AU',
    });
    const mockShare = jest.spyOn(Share, 'share');
    const { getByText } = render(<AccountDetailsMenuItem userDetails={undefined} />);
    fireEvent.press(getByText('Account details'));
    expect(mockShare).toBeCalledTimes(0);
  });

  it('does not call Share.share if wallet details is missing', async () => {
    (useGetSSADetails as jest.Mock).mockReturnValue({
      data: undefined,
      currentRegion: 'AU',
    });
    const mockShare = jest.spyOn(Share, 'share');
    const { getByText } = render(<AccountDetailsMenuItem userDetails={{ me: { details: mockUserDetails } }} />);
    fireEvent.press(getByText('Account details'));
    expect(mockShare).toBeCalledTimes(0);
  });

  describe('calls Share.share with both user & wallet details if given', () => {
    it('AU users', async () => {
      (useGetSSADetails as jest.Mock).mockReturnValue({
        data: {
          ...mockWalletDetails,
          currency: 'AUD',
        },
        currentRegion: 'AU',
      });
      const mockShare = jest.spyOn(Share, 'share');
      const { findByText } = render(<AccountDetailsMenuItem userDetails={{ me: { details: mockUserDetails } }} />);
      expect(mockShare).toBeCalledTimes(0);

      fireEvent.press(await findByText('Account details'));

      await waitFor(() => {
        expect(mockShare).toBeCalledTimes(1);
        expect(mockShare).toHaveBeenCalledWith({
          message: `Here are my Swag Spend account details:\nName: ${mockUserDetails.firstName} ${mockUserDetails.lastName}\nBSB: ${mockWalletDetails.bsb}\nAccount number: ${mockWalletDetails.accountNumber}`,
        });
      });
    });

    it('UK users', async () => {
      (useGetSSADetails as jest.Mock).mockReturnValue({
        data: {
          ...mockUKWalletDetails,
          sortCode: '112233',
        },
        currentRegion: 'GB',
      });
      const mockShare = jest.spyOn(Share, 'share');
      const { findByText } = render(<AccountDetailsMenuItem userDetails={{ me: { details: mockUserDetails } }} />);
      expect(mockShare).toBeCalledTimes(0);

      fireEvent.press(await findByText('Account details'));

      await waitFor(() => {
        expect(mockShare).toBeCalledTimes(1);
        expect(mockShare).toHaveBeenCalledWith({
          message: `Here are my Swag Spend account details:\nName: ${mockUserDetails.firstName} ${mockUserDetails.lastName}\nSort code: 11-22-33\nAccount number: ${mockUKWalletDetails.accountNumber}`,
        });
      });
    });
  });
});
