import React from 'react';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render } from '../../../../../common/utils/testing';
import { ConsolidationLoadingBottomSheet } from '../ConsolidationLoadingBottomSheet';

jest.mock('../../../../../common/stores/useSessionStore');

describe('ConsolidationLoadingBottomSheet', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should render correctly without rebrand', () => {
    const { getByText } = render(<ConsolidationLoadingBottomSheet fundName="fundName" />);

    expect(getByText('You can come back to Swag when your consolidation has been completed.')).toBeTruthy();
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<ConsolidationLoadingBottomSheet fundName="fundName" />);

    expect(
      getByText('You can come back to Employment Hero Work when your consolidation has been completed.')
    ).toBeTruthy();
  });
});
