import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useConfetti } from '../../../../common/components/confetti/useConfetti';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render, renderHook } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { SuperCompleteScreen } from '../SuperCompleteScreen';

jest.mock('../../../../common/components/confetti/useConfetti', () => ({
  useConfetti: jest.fn(),
}));
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Super Complete Screen', () => {
  const mockSetShowConfetti = jest.fn();
  const mockHandleInternalRatingPrompt = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.handleInternalRatingPrompt = mockHandleInternalRatingPrompt;
    sessionStore.result.current.swagTextAndImageRebrandEnabled = false;

    (useConfetti as jest.Mock).mockReturnValue({
      setShowConfetti: mockSetShowConfetti,
    });
  });

  it('should render properly without rebrand', () => {
    mockedUseRoute.mockReturnValue({
      params: {},
      key: '',
      name: '',
    });
    const { getByText } = render(<SuperCompleteScreen />);
    expect(mockSetShowConfetti).toBeCalled();
    expect(getByText('Hooray!')).toBeTruthy();
    expect(getByText('Your Super is connected to Swag')).toBeTruthy();
  });

  it('should render properly with rebrand', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.swagTextAndImageRebrandEnabled = true;

    mockedUseRoute.mockReturnValue({
      params: {},
      key: '',
      name: '',
    });
    const { getByText } = render(<SuperCompleteScreen />);
    expect(mockSetShowConfetti).toBeCalled();
    expect(getByText('Hooray!')).toBeTruthy();
    expect(getByText('Your Super is connected to Employment Hero')).toBeTruthy();
  });

  it('should render resync text properly without rebrand', () => {
    mockedUseRoute.mockReturnValue({
      params: {
        resync: true,
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<SuperCompleteScreen />);
    expect(mockSetShowConfetti).toBeCalled();
    expect(getByText('Hooray!')).toBeTruthy();
    expect(getByText('Your Super is updated in Swag')).toBeTruthy();
  });

  it('should render resync text properly with rebrand', () => {
    const sessionStore = renderHook(() => useSessionStore());
    sessionStore.result.current.swagTextAndImageRebrandEnabled = true;

    mockedUseRoute.mockReturnValue({
      params: {
        resync: true,
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<SuperCompleteScreen />);
    expect(mockSetShowConfetti).toBeCalled();
    expect(getByText('Hooray!')).toBeTruthy();
    expect(getByText('Your Super is updated in Employment Hero')).toBeTruthy();
  });

  it('should go to Super dashboard', () => {
    mockedUseRoute.mockReturnValue({
      params: {},
      key: '',
      name: '',
    });
    const { getByText } = render(<SuperCompleteScreen />);
    const button = getByText('Go to Super');
    fireEvent.press(button);

    expect(mockHandleInternalRatingPrompt).toBeCalledWith('connectSuper');
    expect(mockNavigateToTopTabs).toBeCalledWith('super-tab');
  });
});
