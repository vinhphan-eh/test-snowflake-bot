import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { render, fireEvent, waitFor } from '../../../../common/utils/testing';
import { ResyncSuperTile } from '../ResyncSuperTile';

jest.mock('../../../../common/stores/useSessionStore');

describe('Superannuation Lifecycle Event', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should renders correctly without rebrand', async () => {
    const { getByText } = render(<ResyncSuperTile />);

    expect(
      getByText("You've recently updated your Super on Employment Hero.", {
        exact: false,
      })
    ).toBeTruthy();
    expect(getByText('Resync now')).toBeTruthy();
    expect(getByText('Resync your Super details to Swag')).toBeTruthy();
    expect(getByText('on Swag to continue using the salary sacrifice feature.')).toBeTruthy();

    const reviewButton = getByText('Resync now');
    fireEvent.press(reviewButton);

    expect(mockedEventTracking).toBeCalledWith({
      event: 'Click resync super details',
      categoryName: 'user action',
      metaData: {
        module: 'Resync Super',
      },
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SuperStack', {
        screen: 'ActiveMembership',
        params: {
          title: 'Superannuation',
          resync: true,
        },
      });
    });
  });

  it('should renders correctly without rebrand', async () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByText } = render(<ResyncSuperTile />);

    expect(
      getByText("You've recently updated your Super on Employment Hero.", {
        exact: false,
      })
    ).toBeTruthy();
    expect(getByText('Resync now')).toBeTruthy();
    expect(getByText('Resync your Super details to Employment Hero')).toBeTruthy();
    expect(getByText('on Employment Hero Work to continue using the salary sacrifice feature.')).toBeTruthy();

    const reviewButton = getByText('Resync now');
    fireEvent.press(reviewButton);

    expect(mockedEventTracking).toBeCalledWith({
      event: 'Click resync super details',
      categoryName: 'user action',
      metaData: {
        module: 'Resync Super',
      },
    });

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SuperStack', {
        screen: 'ActiveMembership',
        params: {
          title: 'Superannuation',
          resync: true,
        },
      });
    });
  });
});
