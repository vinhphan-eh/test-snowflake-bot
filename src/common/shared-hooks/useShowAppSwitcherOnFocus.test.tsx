import { renderHook } from '@testing-library/react-hooks';
import { useShowAppSwitcherOnFocus } from './useShowAppSwitcherOnFocus';
import { mockedNavigationEventEmitter, mockedUseNavigation } from '../../../__mocks__/react-navigation';
import { useAppSwitcherStore } from '../stores/useAppSwitcherStore';

describe('useShowAppSwitcherOnFocus', () => {
  const mockToggleVisibility = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useAppSwitcherStore.setState({
      toggleVisibility: mockToggleVisibility,
    });
  });

  it('should show app switcher when screen is focus', () => {
    renderHook(() => useShowAppSwitcherOnFocus(mockedUseNavigation()));
    mockedNavigationEventEmitter.emit('focus');

    expect(mockToggleVisibility).toBeCalledWith(true);
  });

  it('should hide app switcher when screen is blur', () => {
    renderHook(() => useShowAppSwitcherOnFocus(mockedUseNavigation()));
    mockedNavigationEventEmitter.emit('blur');

    expect(mockToggleVisibility).toBeCalledWith(false);
  });
});
