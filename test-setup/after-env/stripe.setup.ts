export const mockPresentPaymentSheet = jest.fn();
export const mockInitPaymentSheet = jest.fn();

jest.mock('@stripe/stripe-react-native', () => {
  const originalMock = jest.requireActual('@stripe/stripe-react-native/jest/mock');
  return {
    ...originalMock,
    useStripe: () => ({
      presentPaymentSheet: mockPresentPaymentSheet,
      initPaymentSheet: mockInitPaymentSheet,
    }),
    presentPaymentSheet: mockPresentPaymentSheet,
    initPaymentSheet: mockInitPaymentSheet,
    PaymentSheetError: {
      Failed: 'Failed',
      Canceled: 'Canceled',
      Timeout: 'Timeout',
    },
    StripeProvider: ({ children }: never) => children,
  };
});
