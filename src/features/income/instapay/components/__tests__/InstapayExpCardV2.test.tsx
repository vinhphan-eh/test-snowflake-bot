import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { mockUseLoadBrazeContentCards } from '../../../../../common/hooks/__mocks__/useLoadBrazeContentCards';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { BRAZE_SUBMIT_TIMESHEET_ID } from '../../constants/braze';
import { mockUseOpenInstaPayFlowFromDashboard } from '../../hooks/__mocks__/useOpenInstaPayFlowFromDashboard';
import { mockUsePrefetchInstapayBalance } from '../instapay-exp-popup/hooks/__mocks__/usePrefetchInstapayBalance';
import { InstapayExpCardV2 } from '../InstapayExpCardV2';

jest.mock('../instapay-exp-popup/hooks/usePrefetchInstapayBalance', () => ({
  usePrefetchInstapayBalance: jest.fn(),
}));

describe('InstapayExpCardV2', () => {
  const mockOpenInstapayFlow = jest.fn();
  beforeEach(() => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [
        {
          extras: {
            id: BRAZE_SUBMIT_TIMESHEET_ID,
            actionText: 'actionText',
            cancelText: 'cancelText',
          },
          image: 'image',
          imageAspectRatio: 0,
          title: 'title',
          id: 'hey',
        } as never,
      ],
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });

    mockUseOpenInstaPayFlowFromDashboard.mockReturnValue({
      openInstaPayFlow: mockOpenInstapayFlow,
    });

    mockUsePrefetchInstapayBalance.mockReturnValue({
      hasBalance: true,
      hasZeroBalance: false,
    });
  });

  it('should render correctly with default content', () => {
    mockUseLoadBrazeContentCards.mockReturnValue({
      cards: [],
      requestContentCardsRefresh: jest.fn(),
      logCustomEvent: jest.fn(),
    });
    const { getByText } = render(
      <InstapayExpCardV2
        onActionEffect={() => {}}
        feature="timesheets"
        onCancel={() => {}}
        brazeCardCustomId={BRAZE_SUBMIT_TIMESHEET_ID}
      />
    );

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'User sees InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'timesheets',
        module: 'InstaPay',
      },
    });

    expect(getByText('Access up to $1,000 of your salary per week!')).toBeTruthy();
    expect(getByText('Withdraw now')).toBeTruthy();
    expect(getByText('Maybe later')).toBeTruthy();
  });

  it('should render correctly', () => {
    const { getByText } = render(
      <InstapayExpCardV2
        onActionEffect={() => {}}
        feature="timesheets"
        onCancel={() => {}}
        brazeCardCustomId={BRAZE_SUBMIT_TIMESHEET_ID}
      />
    );

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'User sees InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'timesheets',
        module: 'InstaPay',
      },
    });

    expect(getByText('title')).toBeTruthy();
    expect(getByText('actionText')).toBeTruthy();
    expect(getByText('cancelText')).toBeTruthy();
  });

  it('should call onAction correctly', () => {
    const { getByText } = render(
      <InstapayExpCardV2
        onActionEffect={() => {}}
        feature="timesheets"
        onCancel={() => {}}
        brazeCardCustomId={BRAZE_SUBMIT_TIMESHEET_ID}
      />
    );

    fireEvent.press(getByText('actionText'));

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click on InstaPay experiment tile in Work pillar',
      metaData: {
        feature: 'timesheets',
        module: 'InstaPay',
      },
    });
    expect(mockOpenInstapayFlow).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel correctly', () => {
    const mockOnCancel = jest.fn();
    const { getByText } = render(
      <InstapayExpCardV2
        onActionEffect={() => {}}
        feature="timesheets"
        onCancel={mockOnCancel}
        brazeCardCustomId={BRAZE_SUBMIT_TIMESHEET_ID}
      />
    );

    fireEvent.press(getByText('cancelText'));

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should call onActionEffect correctly', () => {
    const mockOnActionEffect = jest.fn();
    const { getByText } = render(
      <InstapayExpCardV2
        onActionEffect={mockOnActionEffect}
        feature="timesheets"
        onCancel={() => {}}
        brazeCardCustomId={BRAZE_SUBMIT_TIMESHEET_ID}
      />
    );

    fireEvent.press(getByText('actionText'));

    expect(mockOnActionEffect).toHaveBeenCalledTimes(1);
  });
});
