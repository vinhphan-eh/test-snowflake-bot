import React from 'react';
import { useRoute } from '@react-navigation/native';
import { render } from '../../../../../common/utils/testing';
import { useBmSubmitSubscriptionMutation } from '../../../../../new-graphql/generated';
import { BillSignUpWebViewScreen } from '../BillSignUpWebViewScreen';

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const mockUseBmSubmitSubscriptionMutation = useBmSubmitSubscriptionMutation as jest.MockedFunction<
  typeof useBmSubmitSubscriptionMutation
>;

const mockToastShow = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => {
  return {
    ...jest.requireActual('../../../../../new-graphql/generated'),
    useBmSubmitSubscriptionMutation: jest.fn(),
  };
});

jest.mock('react-native-webview', () => ({
  WebView: ({ onLoadEnd }: { onLoadEnd: (event: { nativeEvent: { url: string } }) => void }) => {
    onLoadEnd({ nativeEvent: { url: 'checkout/thankyou' } });
    return null;
  },
}));

jest.mock('../../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({
    show: mockToastShow,
  }),
}));

describe('BillSignUpWebViewScreen', () => {
  beforeEach(() => {
    mockUseRoute.mockReturnValue({
      params: {
        url: 'signup link',
      },
    } as never);
  });
  it('at completion step, should work correctly when mutation success', () => {
    const mockSubmitSubscription = jest.fn(() => Promise.resolve());
    mockUseBmSubmitSubscriptionMutation.mockReturnValue({
      mutateAsync: mockSubmitSubscription,
    } as never);

    render(<BillSignUpWebViewScreen />);

    expect(mockSubmitSubscription).toBeCalled();
    expect(mockToastShow).not.toBeCalled();
  });

  it('at completion step, should work correctly when mutation failed', () => {
    const mockSubmitSubscription = jest.fn(() => {
      throw new Error();
    });
    mockUseBmSubmitSubscriptionMutation.mockReturnValue({
      mutateAsync: mockSubmitSubscription,
    } as never);

    render(<BillSignUpWebViewScreen />);

    expect(mockSubmitSubscription).toBeCalled();
    expect(mockToastShow).toBeCalled();
  });
});
