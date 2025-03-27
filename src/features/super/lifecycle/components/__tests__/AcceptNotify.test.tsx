import React from 'react';
import { EMPLOYMENT_HERO_PRIVACY_POLICY_LINK } from '../../../../../common/constants/links';
import { useInAppBrowser } from '../../../../../common/shared-hooks/useInAppBrowser';
import { waitFor, fireEvent, render } from '../../../../../common/utils/testing';
import { useAcceptEventMutation } from '../../../../../new-graphql/generated';
import { anAcceptEventPayload } from '../../../../../new-graphql/mocks/generated-mocks';
import { AcceptNotify } from '../AcceptNotify';

const mockUseInAppBrowser = useInAppBrowser as jest.MockedFunction<typeof useInAppBrowser>;

jest.mock('../../../../../common/shared-hooks/useInAppBrowser', () => ({
  useInAppBrowser: jest.fn(),
}));

jest.mock('../../../../../new-graphql/generated', () => ({
  useAcceptEventMutation: jest.fn(),
}));

const mockedOnAcceptNotify = jest.fn();
const mockOpenUrl = jest.fn();

describe('should render offboarding details properly', () => {
  beforeEach(() => {
    (useAcceptEventMutation as jest.Mock).mockReturnValue({
      isLoading: false,
      mutateAsync: () => anAcceptEventPayload(),
    });

    mockUseInAppBrowser.mockReturnValue({
      openUrl: mockOpenUrl,
    });
  });

  it('should render accept notify bottomsheet correctly', () => {
    const { getByText } = render(<AcceptNotify onAcceptNotify={mockedOnAcceptNotify} />);
    expect(getByText('Privacy Policy')).toBeTruthy();
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Accept')).toBeTruthy();
  });

  it('should onAcceptNotify to be called when click "Accept" button and mutation is success', async () => {
    const { getByTestId } = render(<AcceptNotify onAcceptNotify={mockedOnAcceptNotify} />);

    const acceptNotifyButton = getByTestId('accept_notify_btn');
    fireEvent.press(acceptNotifyButton);

    await waitFor(() => {
      expect(mockedOnAcceptNotify).toHaveBeenCalled();
    });
  });

  it('should open link when click "Privacy Policy" link', async () => {
    const { getByText } = render(<AcceptNotify onAcceptNotify={mockedOnAcceptNotify} />);

    const privacyPolicyLink = getByText('Privacy Policy');
    fireEvent.press(privacyPolicyLink);

    await waitFor(() => {
      expect(mockOpenUrl).toHaveBeenCalledWith(EMPLOYMENT_HERO_PRIVACY_POLICY_LINK);
    });
  });
});
