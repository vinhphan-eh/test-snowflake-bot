import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';

import { fireEvent, render, renderHook, waitFor } from '../../../../../../common/utils/testing';
import { mockUseAddPreferInstapayOptionMutation } from '../../../../../../new-graphql/__mocks__/mockBenefits';
import { InstapayNowIntroCarouselScreen } from '../InstapayNowIntroCarouselScreen';

const showToast = jest.fn();

jest.mock('../../../../../../common/shared-hooks/useToast', () => ({
  useToast: () => ({ show: showToast }),
}));

describe('InstapayNowIntroCarouselScreen', () => {
  const mockMutation = jest.fn();
  beforeEach(() => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgUuid = 'org-uuid';
    mockUseAddPreferInstapayOptionMutation.mockReturnValue({
      mutateAsync: mockMutation,
    });
  });

  it('should render first page correctly', () => {
    const { getByTestId, getByText } = render(<InstapayNowIntroCarouselScreen />);
    expect(getByTestId('first-page')).toBeTruthy();
    expect(getByText('Skip')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
  });

  it('should render second page correctly', () => {
    const { getByTestId, getByText } = render(<InstapayNowIntroCarouselScreen />);

    fireEvent.press(getByText('Next'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Next button in instapay onboarding',
      metaData: {
        location: 'Instapay Now Intro',
        module: 'InstaPay',
      },
    });

    expect(getByTestId('second-page')).toBeTruthy();
    expect(getByText('Back')).toBeTruthy();
    expect(getByText('Remind me')).toBeTruthy();
  });

  it('pressing back works correctly', () => {
    const { getByTestId, getByText } = render(<InstapayNowIntroCarouselScreen />);

    fireEvent.press(getByText('Next'));

    expect(getByTestId('second-page')).toBeTruthy();
    expect(getByText('Back')).toBeTruthy();

    fireEvent.press(getByText('Back'));

    expect(mockedGoBack).toHaveBeenCalled();
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Back button in instapay onboarding',
      metaData: {
        location: 'Instapay Now Intro',
        module: 'InstaPay',
      },
    });
  });

  it('skip works correctly', () => {
    const { getByText } = render(<InstapayNowIntroCarouselScreen />);

    fireEvent.press(getByText('Skip'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on Skip to exit instapay onboarding',
      metaData: {
        location: 'Instapay Now Intro',
        module: 'InstaPay',
      },
    });
    expect(mockedNavigate).toHaveBeenCalledWith('dashboard');
  });

  it('remind me works correctly', async () => {
    mockMutation.mockImplementationOnce(() => Promise.resolve());

    const { getByTestId, getByText } = render(<InstapayNowIntroCarouselScreen />);

    fireEvent.press(getByText('Next'));

    expect(getByTestId('second-page')).toBeTruthy();

    fireEvent.press(getByText('Remind me'));

    await waitFor(() => {
      expect(mockedEventTracking).toHaveBeenCalledWith({
        categoryName: 'user action',
        event: 'Click on Remind me button in instapay onboarding',
        metaData: {
          location: 'Instapay Now Intro',
          module: 'InstaPay',
        },
      });
      expect(mockMutation).toHaveBeenCalledWith({
        input: {
          instaPayOption: 'INSTAPAY',
          orgId: 'org-uuid',
        },
      });
      expect(mockedNavigate).toHaveBeenCalledWith('dashboard');
    });
  });

  it('remind me works correctly when updating fail', async () => {
    mockUseAddPreferInstapayOptionMutation.mockReturnValue({
      mutateAsync: () => Promise.reject(),
    });
    const { getByTestId, getByText } = render(<InstapayNowIntroCarouselScreen />);

    fireEvent.press(getByText('Next'));

    expect(getByTestId('second-page')).toBeTruthy();

    fireEvent.press(getByText('Remind me'));

    await waitFor(() => {
      expect(showToast).toHaveBeenCalledWith({
        content: 'Something went wrong, please try again later',
      });
    });
  });
});
