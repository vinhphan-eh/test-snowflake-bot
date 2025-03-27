import React from 'react';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { render } from '../../../../common/utils/testing';
import { SuperannuationAd } from '../SuperannuationAd';

jest.mock('../../../../common/stores/useSessionStore');

describe('SuperannuationAd', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should render correctly without rebrand', () => {
    const { getByText } = render(<SuperannuationAd />);

    expect(getByText('Put the Super in Superannuation')).toBeDefined();
    expect(getByText('Connect your superannuation to Swag')).toBeDefined();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<SuperannuationAd />);

    expect(getByText('Put the Super in Superannuation')).toBeDefined();
    expect(getByText('Connect your superannuation to Employment Hero')).toBeDefined();
  });
});
