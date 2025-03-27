import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { useGetSpendAmount } from '../../../hooks/useGetSpendAmount';
import { PayeeAddressBookScreen } from '../PayeeAddressBookScreen';

jest.mock('../../../hooks/useGetSpendAmount');

const mockUseGetSpendAmount = useGetSpendAmount as jest.MockedFunction<typeof useGetSpendAmount>;

describe('Payee address book screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 100,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });
  });

  it('should render properly', async () => {
    const { getByTestId } = render(<PayeeAddressBookScreen />);

    await waitFor(() => {
      expect(getByTestId(addInputSuffix('searchQuery'))).toBeTruthy();
      expect(getByTestId('add-payee-fab')).toBeTruthy();
    });
  });

  it('should go back previous screen by using back chevron', async () => {
    const { getByTestId } = render(<PayeeAddressBookScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should navigate to add new payee flow if clicked on the FAB', async () => {
    const { getByTestId } = render(<PayeeAddressBookScreen />);
    const fab = getByTestId('add-payee-fab');
    fireEvent.press(fab);
    expect(mockedNavigate).toHaveBeenCalledWith('NewPayee');
  });
});
