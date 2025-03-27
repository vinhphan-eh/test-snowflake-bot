import React from 'react';
import { BenefitsTabKeys, PillarIds } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render } from '../../../../common/utils/testing';
import { TurnPointsToGiftCardsTile } from '../TurnPointsToGiftCardsTile';

jest.mock('../../../../common/stores/useMiniAppSwitcherStore', () => ({
  switchPillar: jest.fn(),
}));
jest.mock('../../../../common/stores/useSessionStore');

describe('Turn points to gift cards tile', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
    jest.clearAllMocks();
  });

  it('should render card content as expected while loading is completed', () => {
    const { getByText } = render(<TurnPointsToGiftCardsTile fillFullWidth />);
    expect(getByText('Turn your points into gift cards in the Swag store')).toBeTruthy();
    expect(getByText('Shop now')).toBeTruthy();
  });

  it('should render card content as expected while loading is completed with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });
    const { getByText } = render(<TurnPointsToGiftCardsTile fillFullWidth />);
    expect(getByText('Turn your points into gift cards in the Perks store')).toBeTruthy();
    expect(getByText('Shop now')).toBeTruthy();
  });

  it('should navigate to Benefits pillar - Store tab on pressed', () => {
    const { getByTestId } = render(<TurnPointsToGiftCardsTile fillFullWidth />);
    const tile = getByTestId('hero-points-Turn your points into gift cards in the Swag store-ad-tile');
    fireEvent.press(tile);

    expect(switchPillar).toHaveBeenCalledWith({
      to: {
        pillarId: PillarIds.BenefitsApp,
        tab: BenefitsTabKeys.STORE,
      },
    });
  });
});
