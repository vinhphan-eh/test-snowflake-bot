import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { SpenderInfoBts } from '../SpenderInfoBts';

const mockOpenUrl = jest.fn();

jest.mock('../../../../../common/shared-hooks/useInAppBrowser', () => ({
  useInAppBrowser: () => ({ openUrl: mockOpenUrl }),
}));
jest.mock('../../../../../common/stores/useSessionStore');

describe('SpenderInfoBts', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<SpenderInfoBts btsRef={null as never} />);
    expect(getByTestId('content-text')).toBeTruthy();
    expect(getByText('Got it')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });
    const { getByTestId, getByText } = render(<SpenderInfoBts btsRef={null as never} />);
    expect(getByTestId('content-text')).toBeTruthy();
    expect(getByText('Got it')).toBeTruthy();
    expect(getByText('Employment Hero', { exact: false })).toBeTruthy();
  });

  it('should open research link correctly', () => {
    const { getByText } = render(<SpenderInfoBts btsRef={null as never} />);
    fireEvent.press(getByText('research'));
    expect(mockOpenUrl).toHaveBeenCalledWith('https://swagapp.com/blog/australian-financial-behaviours-a-snapshot/');
  });

  it('should open research link correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });
    const { getByText } = render(<SpenderInfoBts btsRef={null as never} />);
    fireEvent.press(getByText('research'));
    expect(mockOpenUrl).toHaveBeenCalledWith(
      'https://employmenthero.com/blog/australian-financial-behaviours-a-snapshot/'
    );
  });

  it('should open AGM link correctly', () => {
    const { getByText } = render(<SpenderInfoBts btsRef={null as never} />);
    fireEvent.press(getByText('Australian Government MoneySmart'));
    expect(mockOpenUrl).toHaveBeenCalledWith('https://moneysmart.gov.au/credit-cards/credit-card-calculator');
  });
});
