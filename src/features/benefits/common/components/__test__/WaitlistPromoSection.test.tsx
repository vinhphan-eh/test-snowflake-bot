import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render } from '../../../../../common/utils/testing';
import { WaitlistPromoSection } from '../WaitlistPromoSection';

jest.mock('../../../../../common/stores/useSessionStore');

describe('WaitlistPromoSection', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<WaitlistPromoSection />);
    expect(getByText('Swag discounts on your energy')).toBeTruthy();
    expect(getByText('Eligibility criteria & T&Cs apply.')).toBeTruthy();
    expect(getByTestId('promote_logo')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });

    const { getByTestId, getByText } = render(<WaitlistPromoSection />);
    expect(getByText('Employment Hero discounts on your energy')).toBeTruthy();
    expect(getByText('Eligibility criteria & T&Cs apply.')).toBeTruthy();
    expect(getByTestId('promote_logo')).toBeTruthy();
  });
});
