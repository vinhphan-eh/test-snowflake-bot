import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render } from '../../../../../common/utils/testing';
import { CommunitySourcedBillInfo } from '../CommunitySourcedBillInfo';

jest.mock('../../../../../common/stores/useSessionStore');

describe('CommunitySourcedBillInfo', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<CommunitySourcedBillInfo />);
    expect(
      getByText(
        'We leverage the buying power of our 2M+ Swag user community to negotiate the best deals on your behalf.'
      )
    ).toBeTruthy();
    expect(getByText('Got it')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<CommunitySourcedBillInfo />);
    expect(
      getByText(
        'We leverage the buying power of our 2M+ Employment Hero user community to negotiate the best deals on your behalf.'
      )
    ).toBeTruthy();
    expect(getByText('Got it')).toBeTruthy();
  });
});
