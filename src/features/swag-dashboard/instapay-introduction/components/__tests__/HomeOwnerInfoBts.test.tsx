import React from 'react';
import { render } from '../../../../../common/utils/testing';
import { HomeOwnerInfoBts } from '../HomeOwnerInfoBts';

const mockOpenUrl = jest.fn();

jest.mock('../../../../../common/shared-hooks/useInAppBrowser', () => ({
  useInAppBrowser: () => ({ openUrl: mockOpenUrl }),
}));

describe('HomeOwnerInfoBts', () => {
  it('should render correctly', () => {
    const { getByText } = render(<HomeOwnerInfoBts btsRef={null as never} />);
    expect(
      getByText(
        'A user with a $500,000 loan over 30 years with an interest rate of 6.5% who has set repayments to weekly, can save up to $150,000 in interest and almost 6 years in loan term. All because they didn’t wait for payday. *Not financial advice'
      )
    ).toBeTruthy();

    expect(getByText('Got it')).toBeTruthy();
  });
});
