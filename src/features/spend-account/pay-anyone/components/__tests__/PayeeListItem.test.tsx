import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import type { MockMutation } from '../../../../../common/types/react-query';
import { formatToBSBValue } from '../../../../../common/utils/numbers';
import { fireEvent, render, waitFor, within } from '../../../../../common/utils/testing';
import type { BsbTransferPayeeAddress } from '../../../../../new-graphql/generated';
import { useRemovePayeeAddressMutation } from '../../../../../new-graphql/generated';
import { PayeeListItem } from '../PayeeListItem';

const mockedSetPayeeDetails = jest.fn();
jest.mock('../../stores/usePayAnyoneStore', () => {
  return {
    usePayAnyoneStore: () => ({
      setPayeeDetails: mockedSetPayeeDetails,
    }),
  };
});

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useRemovePayeeAddressMutation: jest.fn(),
}));

const mockRemovePayeeAddressApi = jest.fn();
const mockUseRemovePayeeAddressMutation = useRemovePayeeAddressMutation as unknown as jest.Mock<MockMutation>;
const mockedBsbTransferPayeeAddress = {
  friendlyName: 'Friendly Name',
  bsb: '111111',
  accountNumber: '11111111',
  accountName: 'Account Name',
} as BsbTransferPayeeAddress;

describe('PayeeListItem', () => {
  beforeEach(() => {
    mockUseRemovePayeeAddressMutation.mockReturnValue({ mutateAsync: mockRemovePayeeAddressApi });
  });

  it('should render properly', async () => {
    const { getByText } = render(<PayeeListItem payee={mockedBsbTransferPayeeAddress} />);

    expect(getByText('Friendly Name')).toBeTruthy();
    expect(getByText('111-111 11111111')).toBeTruthy();
  });

  it('should store the payee details and navigate to the payment details screen if pressed', async () => {
    const { getByLabelText } = render(<PayeeListItem payee={mockedBsbTransferPayeeAddress} />);

    fireEvent.press(getByLabelText('payee-list-item'));

    await waitFor(() => {
      expect(mockedSetPayeeDetails).toHaveBeenCalledWith({
        accountName: mockedBsbTransferPayeeAddress.accountName,
        accountNumber: mockedBsbTransferPayeeAddress.accountNumber,
        bsb: formatToBSBValue(mockedBsbTransferPayeeAddress.bsb),
      });
      expect(mockedNavigate).toHaveBeenCalledWith('PaymentDetails');
    });
  });

  it("should highlight matched part of the payee's friendly name if search query is not empty", async () => {
    const { getByTestId } = render(<PayeeListItem payee={mockedBsbTransferPayeeAddress} searchQuery="endl" />);

    const { accountNumber, bsb } = mockedBsbTransferPayeeAddress;
    const highlightedPart = getByTestId(`payee-list-item-${bsb}-${accountNumber}-highlighted`);
    const { getByText } = within(highlightedPart);
    expect(getByText('endl')).toBeTruthy();
  });

  describe('Remove payee address', () => {
    test('should show confirmation modal when remove button is pressed', () => {
      const { getByTestId, getByText } = render(<PayeeListItem payee={mockedBsbTransferPayeeAddress} />);

      const item = getByText(mockedBsbTransferPayeeAddress.friendlyName);
      fireEvent(item, 'swipeableRightOpen');
      const deleteBtn = getByTestId('payee-list-item-swipeable-delete');
      fireEvent.press(deleteBtn);

      expect(getByText(/This action cannot be undone/)).toBeTruthy();
    });

    test('should call api after clicking on confirm button', async () => {
      mockUseRemovePayeeAddressMutation.mockReturnValue({
        mutateAsync: mockRemovePayeeAddressApi.mockResolvedValueOnce(true),
      });
      const { getByTestId, getByText } = render(<PayeeListItem payee={mockedBsbTransferPayeeAddress} />);

      const item = getByText(mockedBsbTransferPayeeAddress.friendlyName);
      fireEvent(item, 'swipeableRightOpen');
      const deleteBtn = getByTestId('payee-list-item-swipeable-delete');
      fireEvent.press(deleteBtn);

      const confirmBtn = getByTestId('confirmDetails');
      fireEvent.press(confirmBtn);

      await waitFor(() => {
        expect(mockRemovePayeeAddressApi).toHaveBeenCalled();
      });
    });
  });
});
