import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack, mockReset } from '../../../../../__mocks__/react-navigation';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../../common/constants/payment';
import { createCurrencyFormatter } from '../../../../common/utils/numbers';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { useDepositToStashMutation } from '../../../../new-graphql/generated';
import { aStashItem } from '../../../../new-graphql/mocks/generated-mocks';
import { useGetSpendAmount } from '../../../spend-account/hooks/useGetSpendAmount';
import { StashDepositCashScreen } from '../StashDepositCashScreen';

jest.mock('../../../spend-account/hooks/useGetSpendAmount');
jest.mock('../../../../new-graphql/generated', () => ({
  useDepositToStashMutation: jest.fn(),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockUseGetSpendAmount = useGetSpendAmount as jest.MockedFunction<typeof useGetSpendAmount>;

describe('StashDepositCashScreen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseRoute.mockReturnValue({
      params: {
        stash: aStashItem({ name: 'name', imageUrl: 'https://a.com' }),
      },
      key: '',
      name: '',
    });
    (useDepositToStashMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ depositToStash: true }),
      isLoading: false,
    });
  });

  it('should render properly', () => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 1000,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });
    const { getByText } = render(<StashDepositCashScreen />);

    expect(getByText('How much would you like to Stash into name?')).toBeTruthy();
    expect(getByText('Amount')).toBeTruthy();
    expect(getByText('Stash cash')).toBeTruthy();
  });

  it('should show error if user enter amount less than lower limit', async () => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 100,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });
    const formatCurrency = createCurrencyFormatter();
    const expectedError = `Amount must be ${formatCurrency(MINIMUM_TRANSFERRED_AMOUNT_PER_TIME)} or more`;
    const amount = '0.00';

    const { getByDisplayValue, getByTestId, getByText } = render(<StashDepositCashScreen />);

    const amountInput = getByTestId(addInputSuffix('amount'));
    fireEvent.changeText(amountInput, amount);

    await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

    fireEvent(amountInput, 'blur');

    await waitFor(() => {
      expect(getByText(expectedError)).toBeTruthy();
    });
  });

  it('should show error if user enters amount higher than upper limit', async () => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 100,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });
    const expectedError = `You don't have enough funds in your Spend account. Please reduce amount.`;
    const amount = '501';

    const { getByDisplayValue, getByTestId, getByText } = render(<StashDepositCashScreen />);

    const amountInput = getByTestId(addInputSuffix('amount'));
    fireEvent.changeText(amountInput, amount);

    await waitFor(() => expect(getByDisplayValue(amount)).toBeTruthy());

    fireEvent(amountInput, 'blur');

    await waitFor(() => {
      expect(getByText(expectedError)).toBeTruthy();
    });
  });

  it('should navigate Success without error', async () => {
    (useDepositToStashMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValue({ depositToStash: true }),
      isLoading: false,
    });
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 1000,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });

    const { getByTestId, getByText } = render(<StashDepositCashScreen />);
    const confirmButton = getByText('Confirm');

    fireEvent.changeText(getByTestId(addInputSuffix('amount')), '1');

    await waitFor(() => {
      expect(confirmButton.props.disabled).toBeFalsy();
      fireEvent.press(confirmButton);
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'StashDepositSuccess', params: expect.anything() }],
      });
    });
  });

  it('should navigate Failed with Api error', async () => {
    (useDepositToStashMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValue({ depositToStash: true }),
      isLoading: false,
    });
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 1000,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });

    const { getByTestId, getByText } = render(<StashDepositCashScreen />);
    const confirmButton = getByText('Confirm');

    fireEvent.changeText(getByTestId(addInputSuffix('amount')), '1');

    await waitFor(() => {
      expect(confirmButton.props.disabled).toBeFalsy();
      fireEvent.press(confirmButton);
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [{ name: 'StashFailed' }],
      });
    });
  });

  it('should navigate back to Stash dashboard if clicked on back icon', () => {
    mockUseGetSpendAmount.mockReturnValue({
      availableAmount: 1000,
      availableBalance: 500,
      stashedAmount: 500,
      walletLoading: false,
    });
    const { getByTestId } = render(<StashDepositCashScreen />);
    const backIcon = getByTestId('topbar-back-icon');

    fireEvent.press(backIcon);

    expect(mockedGoBack).toBeCalled();
  });
});
