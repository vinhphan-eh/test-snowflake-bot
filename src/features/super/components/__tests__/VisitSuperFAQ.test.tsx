import React from 'react';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render } from '../../../../common/utils/testing';
import { VisitSuperFAQ } from '../VisitSuperFAQ';

jest.mock('../../../../common/stores/useSessionStore');
const mockOpenUrl = jest.fn();
jest.mock('../../../../common/shared-hooks/useInAppBrowser', () => {
  return {
    useInAppBrowser: () => ({
      openUrl: mockOpenUrl,
    }),
  };
});

describe('VisitSuperFAQ', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });
  it('should render correctly without rebrand', () => {
    const { getByText } = render(<VisitSuperFAQ />);
    expect(getByText('Want to know more about Super in Swag?')).toBeTruthy();
    expect(getByText('Visit our FAQs')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<VisitSuperFAQ />);
    expect(getByText('Want to know more about Super in Employment Hero?')).toBeTruthy();
    expect(getByText('Visit our FAQs')).toBeTruthy();
  });

  it('should open new link correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<VisitSuperFAQ />);
    expect(getByText('Want to know more about Super in Employment Hero?')).toBeTruthy();
    expect(getByText('Visit our FAQs')).toBeTruthy();

    fireEvent.press(getByText('Visit our FAQs'));
    expect(mockOpenUrl).toHaveBeenCalledWith('https://workhelp.employmenthero.com/hc/en-au/articles/6554053400847');
  });
});
