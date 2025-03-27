import React from 'react';
import axios from 'axios';
import { mockedGoBack, mockedReplace } from '../../../../../../__mocks__/react-navigation';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { render, fireEvent, waitFor, renderHook } from '../../../../../common/utils/testing';
import { useBillStreamingWaitlistStore } from '../../stores/useBillStreamingWaitlistStore';
import { HealthInsuranceJoinWaitlistScreen } from '../HealthInsuranceJoinWaitlistScreen';

jest.mock('../../../../../new-graphql/generated');

const mockUseInAppBrowser = useInAppBrowser as jest.MockedFn<typeof useInAppBrowser>;

jest.mock('../../../../../common/shared-hooks/useInAppBrowser');
const mockOpenUrl = jest.fn();

const finishHealthInsuranceRegistration = jest.fn();

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BillStreamWaitlistSignupScreen', () => {
  beforeEach(() => {
    const store = renderHook(() => useBillStreamingWaitlistStore());
    store.result.current.finishHealthInsuranceRegistration = finishHealthInsuranceRegistration;

    const mockTokenResponse = { token: 'fake-jwt-token', expired_at: '2024-12-31T23:59:59Z' };
    mockedAxios.post.mockResolvedValue({ data: mockTokenResponse });

    mockedAxios.put.mockResolvedValue({ data: { success: true } });

    mockUseInAppBrowser.mockReturnValue({
      openUrl: mockOpenUrl,
    });
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<HealthInsuranceJoinWaitlistScreen />);
    expect(getByText('Get exclusive access to health insurance deals')).toBeTruthy();
    expect(getByText('See important bills on one platform')).toBeTruthy();
    expect(getByText('Get best in market discounts')).toBeTruthy();
    expect(getByText('Secure your spot! Join the waitlist now for exclusive health insurance deals')).toBeTruthy();
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
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);
    fireEvent.press(getByTestId('privacy_policy_btn'));

    expect(mockOpenUrl).toBeCalledWith('https://employmenthero.com/legals/privacy-policy/');
  });

  it('should open link correctly', () => {
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);
    fireEvent.press(getByTestId('eh_group_btn'));

    expect(mockOpenUrl).toBeCalledWith('https://employmenthero.com/legals/privacy-policy/data-processing/affiliates/');
  });

  it('should dismiss correctly', () => {
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);
    fireEvent.press(getByTestId('close_btn'));

    expect(mockedGoBack).toBeCalled();
  });

  it('should work correctly when selecting check boxes', () => {
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);

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
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    await waitFor(() => {
      expect(finishHealthInsuranceRegistration).toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistSuccessScreen', {
        description: "You've joined the waitlist to be one of the first to access exclusive health insurance!",
      });
    });
  });

  it('should work correctly when joining waitlist without consent mkt', async () => {
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    await waitFor(() => {
      expect(finishHealthInsuranceRegistration).toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistSuccessScreen', {
        description: "You've joined the waitlist to be one of the first to access exclusive health insurance!",
      });
    });
  });

  it('should work correctly when failed to register', async () => {
    mockedAxios.put.mockRejectedValue({
      response: {
        data: { success: false },
        status: 403, // You can adjust the status code as needed
      },
    });
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    await waitFor(() => {
      expect(finishHealthInsuranceRegistration).not.toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistFailedScreen');
    });
  });

  it('should work correctly when failed to register due to network error', async () => {
    mockedAxios.put.mockRejectedValue({ data: { success: false } });
    const { getByTestId } = render(<HealthInsuranceJoinWaitlistScreen />);

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    await waitFor(() => {
      expect(finishHealthInsuranceRegistration).not.toBeCalled();
      expect(mockedReplace).toBeCalledWith('BillStreamWaitlistFailedScreen');
    });
  });
});
