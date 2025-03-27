import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import { PaymentMethod } from '../PaymentMethod';

describe('Payment method', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={() => {}}
        creditCardLabel="Credit card"
        isLoading={false}
        payByHeroPoints={10}
        payByCard={20}
        cardFeeAmount={0.5}
        isFulFill
      />
    );
    expect(getByText('Payment details')).toBeTruthy();
    expect(getByText('Hero points')).toBeTruthy();
    expect(getByText('10 PTS')).toBeTruthy();
    expect(getByText('Credit card')).toBeTruthy();
    expect(getByText('$20.00')).toBeTruthy();
    expect(getByText('Credit/debit card fee (0.99%)')).toBeTruthy();
    expect(getByText('$0.50')).toBeTruthy();
  });

  it('should render when loading', () => {
    const { getByLabelText } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={() => {}}
        creditCardLabel="Credit card"
        isLoading
        payByHeroPoints={0}
        payByCard={20}
        cardFeeAmount={0.5}
        isFulFill
      />
    );
    expect(getByLabelText('spinner')).toBeTruthy();
  });

  it('should render correctly when not fulfill', () => {
    const { getByText } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={() => {}}
        creditCardLabel="Credit card"
        isLoading={false}
        payByHeroPoints={10}
        payByCard={20}
        cardFeeAmount={0.5}
        isFulFill={false}
      />
    );
    expect(getByText('Payment details')).toBeTruthy();
    expect(getByText('Hero points')).toBeTruthy();
    expect(getByText('10 PTS')).toBeTruthy();
    expect(getByText('Credit card')).toBeTruthy();
    expect(getByText('$20.00')).toBeTruthy();
    expect(getByText('Credit/debit card fee (0.99%)')).toBeTruthy();
    expect(getByText('$0.50')).toBeTruthy();
    expect(getByText('Add payment method')).toBeTruthy();
  });

  it('should render correctly when no hero points', () => {
    const { getByText, queryByText } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={() => {}}
        creditCardLabel="Credit card"
        isLoading={false}
        payByHeroPoints={0}
        payByCard={20}
        cardFeeAmount={0.5}
        isFulFill
      />
    );
    expect(getByText('Payment details')).toBeTruthy();
    expect(queryByText('Hero points')).toBeNull();
    expect(getByText('Credit card')).toBeTruthy();
    expect(getByText('$20.00')).toBeTruthy();
    expect(getByText('Credit/debit card fee (0.99%)')).toBeTruthy();
    expect(getByText('$0.50')).toBeTruthy();
  });

  it('should render correctly with hero points', () => {
    const { getByText } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={() => {}}
        creditCardLabel="Credit card"
        isLoading={false}
        payByHeroPoints={10}
        payByCard={20}
        cardFeeAmount={0.5}
        isFulFill
      />
    );
    expect(getByText('Payment details')).toBeTruthy();
    expect(getByText('Hero points')).toBeTruthy();
    expect(getByText('10 PTS')).toBeTruthy();
    expect(getByText('Credit card')).toBeTruthy();
    expect(getByText('$20.00')).toBeTruthy();
    expect(getByText('Credit/debit card fee (0.99%)')).toBeTruthy();
    expect(getByText('$0.50')).toBeTruthy();
  });

  it('should render correctly when no card payment', () => {
    const { getByText, queryByText } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={() => {}}
        creditCardLabel="Credit card"
        isLoading={false}
        payByHeroPoints={10}
        payByCard={0}
        cardFeeAmount={0}
        isFulFill
      />
    );
    expect(getByText('Payment details')).toBeTruthy();
    expect(getByText('Hero points')).toBeTruthy();
    expect(getByText('10 PTS')).toBeTruthy();
    expect(queryByText('Credit card')).toBeNull();
    expect(queryByText('Credit/debit card fee (0.99%)')).toBeNull();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <PaymentMethod
        currency="AUD"
        cardFee={0.99}
        onPress={mockOnPress}
        creditCardLabel="Credit card"
        isLoading={false}
        payByHeroPoints={0}
        payByCard={0}
        cardFeeAmount={0}
        isFulFill
      />
    );

    fireEvent.press(getByTestId('payment_method'));
    expect(mockOnPress).toBeCalled();
  });
});
