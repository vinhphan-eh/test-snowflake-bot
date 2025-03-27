import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render } from '../../../../../common/utils/testing';
import { BillDisclaimer } from '../BillDisclaimer';

jest.mock('../../../../../common/stores/useSessionStore');

describe('BillDisclaimer', () => {
  it('should render correctly', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
    const { getByText } = render(<BillDisclaimer />);
    expect(getByText('Bill Management is a product provided to customers', { exact: false })).toBeTruthy();
    expect(getByText('Accept')).toBeTruthy();
  });

  it('should render correctly with rebrand enabled', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });
    const { getByText } = render(<BillDisclaimer />);
    expect(
      getByText(
        'Bill Management is a product provided to customers by Employment Hero Pty Ltd and its affiliates (Employment Hero) under its Employment Hero brand',
        { exact: false }
      )
    ).toBeTruthy();
  });
});
