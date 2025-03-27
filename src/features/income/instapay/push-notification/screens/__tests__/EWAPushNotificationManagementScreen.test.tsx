import React from 'react';
import { waitFor, render, type RenderAPI, fireEvent } from '../../../../../../common/utils/testing';
import { EWAPushNotificationManagementScreen } from '../EWAPushNotificationManagementScreen';
import { mockedGoBack } from '../../../../../../../__mocks__/react-navigation';
import { useRoute } from '@react-navigation/native';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('EWAPushNotificationManagementScreen', () => {
  let renderAPI: RenderAPI;

  beforeEach(() => {
    mockedUseRoute.mockReturnValue({ params: { orgId: 'currentOrgId' }, key: '', name: '' });
    renderAPI = render(<EWAPushNotificationManagementScreen />);
  });

  it('should render page default content properly', async () => {
    await waitFor(() => {
      // Navigation bar caption and Page title
      expect(renderAPI.getAllByText('Push Notification Settings')).toHaveLength(2);
    });
  });

  it('should navigate back to Income dashboard if pressed on back button', async () => {
    await waitFor(() => {
      fireEvent.press(renderAPI.getByTestId('topbar-back-icon'));
    });

    expect(mockedGoBack).toHaveBeenCalled();
  });
});
