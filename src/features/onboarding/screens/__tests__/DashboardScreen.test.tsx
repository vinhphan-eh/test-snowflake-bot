import React from 'react';
import { waitForElementToBeRemoved } from '@testing-library/react-native';
import { mockedReplace } from '../../../../../__mocks__/react-navigation';
import * as useInAppBrowser from '../../../../common/shared-hooks/useInAppBrowser';
import { render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode as mockServer } from '../../../../mock-server/mockServerNode';
import { mockGetSsaCarouselTimestampQuery, mockSeenSsaCarouselMutation } from '../../../../new-graphql/generated';
import { DashboardScreen } from '../DashboardScreen';

describe('Dashboard Screen', () => {
  const mockOpenUrl = jest.fn();
  beforeEach(() => {
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
  });

  it('should render properly', async () => {
    mockServer.use(
      mockGetSsaCarouselTimestampQuery((_, res, context) =>
        res(context.data({ me: { wallet: { seenSSACarouselTimestamp: undefined } } }))
      )
    );
    mockServer.use(
      mockSeenSsaCarouselMutation((_, res, context) => res(context.data({ seenSSACarousel: { success: true } })))
    );

    const { findByText } = render(<DashboardScreen />);
    expect(await findByText('Unlock the power of a Swag Spend account')).toBeTruthy();
  });

  it('should navigate to TaxObligations if already finished the carousel', async () => {
    mockServer.use(
      mockGetSsaCarouselTimestampQuery((_, res, context) =>
        res(context.data({ me: { wallet: { seenSSACarouselTimestamp: new Date().toISOString() } } }))
      )
    );

    const { getByTestId } = render(<DashboardScreen />);
    await waitForElementToBeRemoved(() => getByTestId('spinner'));

    await waitFor(() => {
      expect(mockedReplace).toHaveBeenLastCalledWith('LegalAgreementTerm');
    });
  });
});
