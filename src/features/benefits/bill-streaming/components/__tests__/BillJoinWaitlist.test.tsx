import React from 'react';
import images from '../../../../../common/assets/images';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { render, fireEvent, renderHook } from '../../../../../common/utils/testing';
import { useBsJoinWaitListMutation } from '../../../../../new-graphql/generated';
import { useBillStreamingWaitlistStore } from '../../stores/useBillStreamingWaitlistStore';
import { BillJoinWaitList } from '../BillJoinWaitlist';

const mockUseBsJoinWaitListMutation = useBsJoinWaitListMutation as jest.MockedFn<typeof useBsJoinWaitListMutation>;

jest.mock('../../../../../new-graphql/generated');

const mockUseInAppBrowser = useInAppBrowser as jest.MockedFn<typeof useInAppBrowser>;

jest.mock('../../../../../common/shared-hooks/useInAppBrowser');
const mockOpenUrl = jest.fn();

const mockMutate = jest.fn();
const mockFinishRegistration = jest.fn();
const mockJoinWaitList = jest.fn();
const mockOnClose = jest.fn();

describe('BillJoinWaitlist', () => {
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
    const { getByTestId, getByText } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );
    expect(getByText('Waitlist title')).toBeTruthy();
    expect(getByText('Waitlist subTitle')).toBeTruthy();
    expect(getByText('checkbox1')).toBeTruthy();
    expect(getByText('checkbox2')).toBeTruthy();
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
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );
    fireEvent.press(getByTestId('privacy_policy_btn'));

    expect(mockOpenUrl).toBeCalledWith('https://employmenthero.com/legals/privacy-policy/');
  });

  it('should open link correctly', () => {
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );
    fireEvent.press(getByTestId('eh_group_btn'));

    expect(mockOpenUrl).toBeCalledWith('https://employmenthero.com/legals/privacy-policy/data-processing/affiliates/');
  });

  it('should dismiss correctly', () => {
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );
    fireEvent.press(getByTestId('close_btn'));

    expect(mockOnClose).toBeCalled();
  });

  it('should work correctly when selecting check boxes', () => {
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );

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
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockJoinWaitList).toBeCalledWith(true);
  });

  it('should work correctly when joining waitlist without consent mkt', async () => {
    mockMutate.mockResolvedValueOnce({
      bsJoinWaitList: {
        success: true,
      },
    });
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );

    const policyCheckBox = getByTestId('policy_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockJoinWaitList).toBeCalledWith(false);
  });

  it('should work correctly when failed to register', async () => {
    mockMutate.mockResolvedValueOnce({
      bsJoinWaitList: {
        success: false,
      },
    });
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockJoinWaitList).toBeCalledWith(true);
  });

  it('should work correctly when failed to register due to network error', async () => {
    mockMutate.mockResolvedValueOnce(new Error());
    const { getByTestId } = render(
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title="Waitlist title"
        subTitle="Waitlist subTitle"
        checkBoxes={[{ content: 'checkbox1' }, { content: 'checkbox2' }]}
        joinWaitlist={mockJoinWaitList}
        onClose={mockOnClose}
      />
    );

    const policyCheckBox = getByTestId('policy_check_box');
    const consentMktCheckBox = getByTestId('consent_mkt_check_box');
    const joinWaitlistBtn = getByTestId('joint_waitlist_btn');

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(consentMktCheckBox);

    expect(joinWaitlistBtn).toBeDisabled();

    fireEvent.press(policyCheckBox);

    expect(joinWaitlistBtn).toBeEnabled();

    fireEvent.press(joinWaitlistBtn);

    expect(mockJoinWaitList).toBeCalledWith(true);
  });
});
