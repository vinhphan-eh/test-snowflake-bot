import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockUseAddPreferInstapayOptionMutation } from '../../../../../new-graphql/__mocks__/mockBenefits';
import { ChoosePayMethodScreen } from '../ChoosePayMethodScreen';

const showToast = jest.fn();

jest.mock('../../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({ show: showToast }),
}));

describe('ChoosePayMethodScreen', () => {
  const mockMutation = jest.fn();
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgUuid = 'org-uuid';
    mockUseAddPreferInstapayOptionMutation.mockReturnValue({
      mutateAsync: mockMutation,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<ChoosePayMethodScreen />);
    expect(getByText('I would like to\nget paid...')).toBeTruthy();
    expect(getByText('The old way - on payday')).toBeTruthy();
    expect(getByText('The new way - everyday')).toBeTruthy();
    expect(getByText('Skip')).toBeTruthy();
    expect(getByText('Continue')).toBeTruthy();
  });

  it('should go back correctly when clicking skip', () => {
    const { getByText } = render(<ChoosePayMethodScreen />);
    fireEvent.press(getByText('Skip'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Skip to exit instapay onboarding',
      metaData: {
        location: 'Choose Old/New way',
        module: 'InstaPay',
      },
    });
    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should work correctly when selecting old way and continue', async () => {
    mockMutation.mockImplementationOnce(() => Promise.resolve());
    const { getByText } = render(<ChoosePayMethodScreen />);

    fireEvent.press(getByText('The old way - on payday'));
    fireEvent.press(getByText('Continue'));

    expect(mockMutation).toHaveBeenCalledWith({
      input: {
        instaPayOption: 'NORMAL',
        orgId: 'org-uuid',
      },
    });

    await waitFor(() => {
      expect(mockedEventTracking).toHaveBeenCalledWith({
        categoryName: 'user action',
        event: 'Click on Continue to choose how to get paid',
        metaData: {
          module: 'InstaPay',
          selection: 'old way',
        },
      });
      expect(mockedGoBack).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith({
        content: 'You’ve opted in receive your salary on payday.',
      });
    });
  });

  it('should work correctly when selecting old way and continue but update fail', async () => {
    mockUseAddPreferInstapayOptionMutation.mockReturnValue({
      mutateAsync: () => Promise.reject(),
    });
    const { getByText } = render(<ChoosePayMethodScreen />);

    fireEvent.press(getByText('The old way - on payday'));
    fireEvent.press(getByText('Continue'));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        content: 'Something went wrong, please try again later',
      });
    });
  });

  it('should work correctly when selecting new way and continue', () => {
    const { getByText } = render(<ChoosePayMethodScreen />);

    fireEvent.press(getByText('The new way - everyday'));
    fireEvent.press(getByText('Continue'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Continue to choose how to get paid',
      metaData: {
        module: 'InstaPay',
        selection: 'new way',
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith('ChooseInstapayMethodScreen');
  });
});
