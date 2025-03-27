import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockReset } from '../../../../../__mocks__/react-navigation';
import { MINIMUM_TRANSFERRED_AMOUNT_PER_TIME } from '../../../../common/constants/payment';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockCloseStashMutation, mockWithdrawFromStashMutation } from '../../../../new-graphql/generated';
import { StashWithdrawAmountScreen } from '../StashWithdrawAmountScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Stash Withdraw Amount Screen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        id: '123',
        name: 'Holiday',
        balance: 100,
      },
      key: '',
      name: '',
    });
  });

  it('should render properly', async () => {
    const { getByText } = render(<StashWithdrawAmountScreen />);
    expect(getByText('How much would you like to withdraw to your Swag Spend account?')).toBeTruthy();

    await waitFor(() => expect(getByText('Holiday balance: $100.00')).toBeTruthy());
  });

  it('should disable close button if amount input does not equal the stash balance', async () => {
    const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');

    fireEvent.changeText(inputStashWithdrawAmount, '80');

    await waitFor(() => expect(getByDisplayValue('80')).toBeTruthy());

    fireEvent(inputStashWithdrawAmount, 'blur');

    await waitFor(() => {
      expect(getByLabelText('Confirm & close Stash')).toBeDisabled();
    });
  });

  it('should display error if input amount is greater than stash balance', async () => {
    const { getByDisplayValue, getByTestId, queryByText } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');

    fireEvent.changeText(inputStashWithdrawAmount, '50001');

    await waitFor(() => expect(getByDisplayValue('50001')).toBeTruthy());

    fireEvent(inputStashWithdrawAmount, 'blur');

    await waitFor(() => {
      expect(queryByText('You cannot withdraw more than $100.00')).toBeTruthy();
    });
  });

  it('should display error if input amount is less than the minimum withdraw amount', async () => {
    const { getByDisplayValue, getByTestId, queryByText } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');

    fireEvent.changeText(inputStashWithdrawAmount, '0');

    await waitFor(() => expect(getByDisplayValue('0')).toBeTruthy());

    fireEvent(inputStashWithdrawAmount, 'blur');

    await waitFor(() => {
      expect(queryByText(`Amount must be $${MINIMUM_TRANSFERRED_AMOUNT_PER_TIME} or more`)).toBeTruthy();
    });
  });

  it('should close stash and pass response to withdraw outcome screen', async () => {
    mockServerNode.use(
      mockCloseStashMutation((_, res, ctx) => {
        return res(ctx.status(201), ctx.delay(100), ctx.data({}));
      })
    );

    const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');
    const closeBtn = getByLabelText('Confirm & close Stash');

    fireEvent.changeText(inputStashWithdrawAmount, '100');

    await waitFor(() => expect(getByDisplayValue('100')).toBeTruthy());
    fireEvent(inputStashWithdrawAmount, 'blur');

    fireEvent.press(closeBtn);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id: '123',
              amount: '100',
              isClosed: true,
              isError: false,
              name: 'Holiday',
            },
          },
        ],
      });
    });
  });

  it('should pass close error if close to withdraw outcome screen', async () => {
    mockServerNode.use(
      mockCloseStashMutation((_, res, ctx) => res(ctx.status(400), ctx.errors([{ message: 'Something went wrong' }])))
    );

    const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');
    const closeBtn = getByLabelText('Confirm & close Stash');

    fireEvent.changeText(inputStashWithdrawAmount, '100');

    await waitFor(() => expect(getByDisplayValue('100')).toBeTruthy());
    fireEvent(inputStashWithdrawAmount, 'blur');

    fireEvent.press(closeBtn);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id: '123',
              isClosed: false,
              isError: true,
              name: 'Holiday',
            },
          },
        ],
      });
    });
  });

  it('should withdraw funds and pass response to withdraw outcome screen', async () => {
    mockServerNode.use(
      mockWithdrawFromStashMutation((_, res, ctx) => {
        return res(ctx.status(201), ctx.delay(100), ctx.data({}));
      })
    );

    const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');
    const confirmBtn = getByLabelText('Confirm');

    fireEvent.changeText(inputStashWithdrawAmount, '10');

    await waitFor(() => expect(getByDisplayValue('10')).toBeTruthy());

    fireEvent(inputStashWithdrawAmount, 'blur');

    fireEvent.press(confirmBtn);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id: '123',
              amount: '10',
              isClosed: false,
              isError: false,
              name: 'Holiday',
            },
          },
        ],
      });
    });
  });

  it('should pass withdraw error to withdraw outcome screen', async () => {
    mockServerNode.use(
      mockWithdrawFromStashMutation((_, res, ctx) =>
        res(ctx.status(400), ctx.errors([{ message: 'Something went wrong' }]))
      )
    );

    const { getByDisplayValue, getByLabelText, getByTestId } = render(<StashWithdrawAmountScreen />);
    const inputStashWithdrawAmount = getByTestId('amount-input');
    const confirmBtn = getByLabelText('Confirm');

    fireEvent.changeText(inputStashWithdrawAmount, '10');

    await waitFor(() => expect(getByDisplayValue('10')).toBeTruthy());

    fireEvent(inputStashWithdrawAmount, 'blur');

    fireEvent.press(confirmBtn);

    await waitFor(() => {
      expect(mockReset).toHaveBeenCalledWith({
        index: 0,
        routes: [
          {
            name: 'StashWithdrawOutcome',
            params: {
              id: '123',
              amount: '10',
              isClosed: false,
              isError: true,
              name: 'Holiday',
            },
          },
        ],
      });
    });
  });
});
