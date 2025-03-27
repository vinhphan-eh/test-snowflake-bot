import React from 'react';
import type { NavigationProp } from '@react-navigation/native';
import { NavigationContext, useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook } from '../../../../common/utils/testing';
import { SupportRequestOutcomeScreen } from '../SupportRequestOutcomeScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const navigationContext: NavigationProp<never> = {
  isFocused: () => true,
  addListener: () => () => {},
} as unknown as NavigationProp<never>;

describe('Support Request Outcome Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockedUseRoute.mockReturnValue({
      params: {
        message: 'Your bug has been reported.',
        description: 'We use your feedback to improve your experience.',
      },
      key: '',
      name: '',
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <NavigationContext.Provider value={navigationContext}>
        <SupportRequestOutcomeScreen />
      </NavigationContext.Provider>
    );

    expect(getByText('Your bug has been reported.')).toBeTruthy();
    expect(getByText('We use your feedback to improve your experience.')).toBeTruthy();
    expect(getByText('Done')).toBeTruthy();
  });

  test('should navigate to next screen after pressing action button', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.currentOrgId = '123';

    const { getByLabelText } = render(<SupportRequestOutcomeScreen />);

    fireEvent.press(getByLabelText('Done'));
    expect(mockedEventTracking).toBeCalledWith({
      event: 'Click on done',
      categoryName: 'user action',
      metaData: {
        module: 'Settings',
      },
    });
    expect(mockedNavigate).toBeCalledWith('dashboard');
  });
});
