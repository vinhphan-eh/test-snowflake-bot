import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack } from '../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import { render, fireEvent, waitFor, addInputSuffix, renderHook } from '../../../../../../common/utils/testing';
import { mockCashbackBanks } from '../../../../../../graphql/handlers/custom-mock/cashbackBanks';
import { useGetEnrolCardDetailScreenQuery } from '../../../../../../new-graphql/generated';
import { EnrolCardDetailsScreen } from '../EnrolCardDetailsScreen';

const mockEnrolCard = jest.fn().mockResolvedValue({});

jest.mock('../../hooks/useEnrolCardFlow', () => ({
  useEnrolCardFlow: () => ({
    enrolCard: mockEnrolCard,
  }),
}));

jest.mock('../../../../../../new-graphql/generated', () => ({
  useGetEnrolCardDetailScreenQuery: jest.fn(),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

beforeEach(() => {
  mockedUseRoute.mockReturnValue({
    params: { haveHeroWallet: false },
    key: '',
    name: '',
  });
  (useGetEnrolCardDetailScreenQuery as unknown as jest.Mock).mockReturnValue({
    data: {
      me: {
        cashback: {
          banks: mockCashbackBanks,
          ehProviderId: {
            id: '999',
          },
        },
        wallet: {
          ehBinRange: {
            from: '4925370010000000',
            to: '4925370019999999',
          },
        },
      },
    },
  });
});

describe.skip('Enrol Card Details Screen', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<EnrolCardDetailsScreen />);

    expect(getByText('Add card')).toBeTruthy();
    expect(getByText('You can enrol up to 4 Visa cards and 5 Mastercards.')).toBeTruthy();
    expect(getByTestId('topbar-right-icon')).toBeTruthy();
    expect(getByText('Card number*')).toBeTruthy();
    expect(getByText('Expiry date*')).toBeTruthy();
    expect(getByText('Bank provider*')).toBeTruthy();
    expect(getByText('Add')).toBeTruthy();
    expect(getByText('Add')).toBeDisabled();
  });

  it('should enter card number correctly', async () => {
    const { getByDisplayValue, getByTestId } = render(<EnrolCardDetailsScreen />);
    fireEvent.changeText(getByTestId(addInputSuffix('card-number')), '1111222233334444');

    await waitFor(() => {
      expect(getByDisplayValue('1111 2222 3333 4444')).toBeTruthy();
    });
  });

  it('should choose expiry date correctly', async () => {
    const { getByDisplayValue, getByLabelText, getByTestId } = render(<EnrolCardDetailsScreen />);
    const dobInput = getByTestId(addInputSuffix('dob'));
    const nextYear = (new Date().getFullYear() + 1).toString();
    const formattedNextYear = nextYear.substring(2);

    await waitFor(() => {
      fireEvent.press(dobInput);

      fireEvent(getByTestId('month-select'), 'onItemChange', {
        key: 'september',
        label: 'September',
      });
      fireEvent(getByTestId('year-select'), 'onItemChange', {
        key: nextYear,
        label: nextYear,
      });

      fireEvent.press(getByLabelText('Confirm'));
    });
    expect(getByDisplayValue(`09/${formattedNextYear}`)).toBeTruthy();
  });

  it('should select bank provider correctly', async () => {
    const { getByLabelText, getByTestId, getByText } = render(<EnrolCardDetailsScreen />);
    fireEvent.press(getByTestId('bank-provider'));

    await waitFor(() => {
      const bankOption = getByLabelText('Adelaide Bank');
      fireEvent.press(bankOption);
    });
    expect(getByText('Adelaide Bank')).toBeTruthy();
  });

  it('should dismiss correctly', async () => {
    const { getByTestId } = render(<EnrolCardDetailsScreen />);
    fireEvent.press(getByTestId('topbar-right-icon'));
    expect(mockedGoBack).toBeCalled();
  });

  it('should enrol a card successfully', async () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '123';

    const { getByLabelText, getByTestId } = render(<EnrolCardDetailsScreen />);
    fireEvent.changeText(getByTestId(addInputSuffix('card-number')), '4556134743506922');

    const dobInput = getByTestId(addInputSuffix('dob'));
    const nextYear = (new Date().getFullYear() + 1).toString();
    fireEvent.press(dobInput);

    fireEvent(getByTestId('month-select'), 'onItemChange', {
      key: 'september',
      label: 'September',
    });

    fireEvent(getByTestId('year-select'), 'onItemChange', {
      key: nextYear,
      label: nextYear,
    });

    fireEvent.press(getByLabelText('Confirm'));

    fireEvent.press(getByTestId('bank-provider'));

    await waitFor(() => {
      const bankOption = getByLabelText('Adelaide Bank');
      fireEvent.press(bankOption);
    });

    const addButton = getByLabelText('Add');
    expect(addButton).toBeTruthy();
    fireEvent.press(addButton);

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        event: 'Click add',
        categoryName: 'user action',
        metaData: {
          module: 'Cashback',
        },
      });
      expect(mockEnrolCard).toBeCalled();
    });

    expect(mockedGoBack).toBeCalled();
  });

  it('should automatically pick Employment Hero bank when entering correct Hero Wallet', async () => {
    const { getByDisplayValue, getByTestId, getByText } = render(<EnrolCardDetailsScreen />);
    const input = getByTestId('card-number-input');

    fireEvent.changeText(input, '4925370011900306');
    await waitFor(() => {
      expect(getByDisplayValue('4925 3700 1190 0306')).toBeTruthy();
      expect(getByText('Employment Hero')).toBeTruthy();
    });
  });
});

describe('Card Number field', () => {
  it('show required field error correctly', async () => {
    const { getByDisplayValue, getByTestId, getByText, queryByDisplayValue, queryByTestId } = render(
      <EnrolCardDetailsScreen />
    );
    const input = getByTestId(addInputSuffix('card-number'));

    fireEvent.changeText(input, 'haha');
    await waitFor(() => {
      expect(getByDisplayValue('haha')).toBeTruthy();
    });

    fireEvent.changeText(input, '');
    await waitFor(() => {
      expect(queryByDisplayValue('haha')).toBeNull();
    });

    fireEvent(input, 'blur');
    await waitFor(() => {
      expect(getByText('This field is required')).toBeTruthy();
      expect(queryByTestId('card_img')).toBeNull();
    });
  });

  it('show invalid card error when entering wrong card number', async () => {
    const { getByDisplayValue, getByTestId, getByText, queryByTestId } = render(<EnrolCardDetailsScreen />);
    const input = getByTestId(addInputSuffix('card-number'));

    fireEvent.changeText(input, '312312323');
    await waitFor(() => {
      expect(getByDisplayValue('3123 1232 3')).toBeTruthy();
    });

    fireEvent(input, 'blur');
    await waitFor(() => {
      expect(getByText('Card number invalid')).toBeTruthy();
      expect(queryByTestId('card_img')).toBeNull();
    });
  });

  it('show invalid card error when entering correct card number but not visa/mastercard', async () => {
    const { getByDisplayValue, getByTestId, getByText, queryByTestId } = render(<EnrolCardDetailsScreen />);
    const input = getByTestId(addInputSuffix('card-number'));

    fireEvent.changeText(input, '6011000990139424');
    await waitFor(() => {
      expect(getByDisplayValue('6011 0009 9013 9424')).toBeTruthy();
    });

    fireEvent(input, 'blur');
    await waitFor(() => {
      expect(getByText('Card number invalid')).toBeTruthy();
      expect(queryByTestId('card_img')).toBeNull();
    });
  });

  it('show no error when entering valid card', async () => {
    const { getByDisplayValue, getByTestId, queryByTestId, queryByText } = render(<EnrolCardDetailsScreen />);
    const input = getByTestId(addInputSuffix('card-number'));

    fireEvent.changeText(input, '4012888888881881');
    await waitFor(() => {
      expect(getByDisplayValue('4012 8888 8888 1881')).toBeTruthy();
    });

    fireEvent(input, 'blur');
    await waitFor(() => {
      expect(queryByText('Card number invalid')).toBeNull();
      expect(queryByTestId('card_img')).not.toBeNull();
    });
  });

  it('show Swag Visa Debit card already enrolled error when trying to enrol another hero wallet', async () => {
    mockedUseRoute.mockReturnValue({
      params: { haveHeroWallet: true },
      key: '',
      name: '',
    });
    const { getByDisplayValue, getByTestId, getByText, queryByTestId } = render(<EnrolCardDetailsScreen />);
    const input = getByTestId('card-number-input');

    fireEvent.changeText(input, '4925370011900306');
    await waitFor(() => {
      expect(getByDisplayValue('4925 3700 1190 0306')).toBeTruthy();
    });

    fireEvent(input, 'blur');
    await waitFor(() => {
      expect(getByText('Swag Visa Debit card already enrolled')).toBeTruthy();
      expect(queryByTestId('card_img')).not.toBeNull();
    });
  });
});
