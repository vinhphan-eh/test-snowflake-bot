import React from 'react';
import { mockedGoBack, mockedReplace } from '../../../../../../__mocks__/react-navigation';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { render, fireEvent, waitFor, renderHook } from '../../../../../common/utils/testing';
import { useBsJoinWaitListMutation } from '../../../../../new-graphql/generated';
import { useBillStreamingWaitlistStore } from '../../stores/useBillStreamingWaitlistStore';
import { BillStreamWaitlistSignupScreen } from '../BillStreamWaitlistSignupScreen';

const mockUseBsJoinWaitListMutation = useBsJoinWaitListMutation as jest.MockedFn<typeof useBsJoinWaitListMutation>;

jest.mock('../../../../../new-graphql/generated');

const mockUseInAppBrowser = useInAppBrowser as jest.MockedFn<typeof useInAppBrowser>;

jest.mock('../../../../../common/shared-hooks/useInAppBrowser');
const mockOpenUrl = jest.fn();

const mockMutate = jest.fn();
const mockFinishRegistration = jest.fn();

describe('BillStreamWaitlistSignupScreen', () => {
  beforeEach(() => {
    const store = renderHook(() => useBillStreamingWaitlistStore());
    store.result.current.finishRegistration = mockFinishRegistration;

    mockUseBsJoinWaitListMutation.mockReturnValue({
      mutateAsync: mockMutate,
    } as never);

    mockUseInAppBrowser.mockReturnValue({
      openUrl: mockOpenUrl,
    });
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<BillStreamWaitlistSignupScreen />);
    expect(getByText('Be one of the first to set up Bill Management')).toBeTruthy();
    expect(getByText('Save time with automated payments')).toBeTruthy();
    expect(getByText('Manage and track your usage')).toBeTruthy();
    expect(getByText('See important bills on one platform')).toBeTruthy();
    expect(getByText('Get the best discounts')).toBeTruthy();
    expect(getByText('Join our waitlist to be one of the first to set up Bill Management.')).toBeTruthy();
    expect(getByText('I read and agree to', { exact: false })).toBeTruthy();
    expect(getByText('Privacy Policy')).toBeTruthy();
    expect(
      getByText('I consent to receiving marketing communications, promotions/offers and content from the', {
        exact: false,
      })
    ).toBeTruthy();
    expect(getByText('Join the waitlist')).toBeTruthy();
    expect(getByTestId('joint_waitlist_btn')).toBeDisabled();
  });

  it('should open link correctly', () => {
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);
    fireEvent.press(getByTestId('privacy_policy_btn'));

    expect(mockOpenUrl).toBeCalledWith('https://employmenthero.com/legals/privacy-policy/');
  });

  it('should open link correctly', () => {
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);
    fireEvent.press(getByTestId('eh_group_btn'));

    expect(mockOpenUrl).toBeCalledWith('https://employmenthero.com/legals/privacy-policy/data-processing/affiliates/');
  });

  it('should dismiss correctly', () => {
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);
    fireEvent.press(getByTestId('close_btn'));

    expect(mockedGoBack).toBeCalled();
  });

  it('should work correctly when selecting check boxes', () => {
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();
  });

  it('should work correctly when joining waitlist with consent mkt', async () => {
    mockMutate.mockResolvedValueOnce({
      bsJoinWaitList: {
        success: true,
      },
    });
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockMutate).toBeCalledWith({
      input: {
        isAcceptConsentMarketing: true,
      },
    });
    await waitFor(() => {
      expect(mockFinishRegistration).toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistSuccessScreen');
    });
  });

  it('should work correctly when joining waitlist without consent mkt', async () => {
    mockMutate.mockResolvedValueOnce({
      bsJoinWaitList: {
        success: true,
      },
    });
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockMutate).toBeCalledWith({
      input: {
        isAcceptConsentMarketing: false,
      },
    });
    await waitFor(() => {
      expect(mockFinishRegistration).toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistSuccessScreen');
    });
  });

  it('should work correctly when failed to register', async () => {
    mockMutate.mockResolvedValueOnce({
      bsJoinWaitList: {
        success: false,
      },
    });
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockMutate).toBeCalledWith({
      input: {
        isAcceptConsentMarketing: true,
      },
    });
    await waitFor(() => {
      expect(mockFinishRegistration).not.toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistFailedScreen');
    });
  });

  it('should work correctly when failed to register due to network error', async () => {
    mockMutate.mockResolvedValueOnce(new Error());
    const { getByTestId } = render(<BillStreamWaitlistSignupScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockMutate).toBeCalledWith({
      input: {
        isAcceptConsentMarketing: true,
      },
    });
    await waitFor(() => {
      expect(mockFinishRegistration).not.toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistFailedScreen');
    });
  });
});
