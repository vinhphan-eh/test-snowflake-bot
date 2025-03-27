import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedEventTracking } from '../../../../../test-setup/after-env/mixpanel.setup';
import { mockedSwitchPillar } from '../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { fireEvent, render } from '../../../../common/utils/testing';
import { SSOErrorScreen } from '../SSOErrorScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
jest.mock('../../../../common/stores/useSessionStore');

describe('SSOErrorScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: { pillar: 'BenefitsApp' },
      key: '',
      name: '',
    });
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });
  it('should render correctly', () => {
    const { getByText } = render(<SSOErrorScreen />);

    expect(getByText('Single Sign-On is required to access this feature')).toBeTruthy();
    expect(getByText('Back to Swag Dashboard')).toBeTruthy();
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Visit SSO Error Screen',
      metaData: {
        module: 'SSO Mini App',
      },
    });
  });

  it('should render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });
    const { getByText } = render(<SSOErrorScreen />);

    expect(getByText('Single Sign-On is required to access this feature')).toBeTruthy();
    expect(getByText('Back to Dashboard')).toBeTruthy();
    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Visit SSO Error Screen',
      metaData: {
        module: 'SSO Mini App',
      },
    });
  });

  it('should navigate to dashboard when back to swag is pressed', () => {
    const { getByText } = render(<SSOErrorScreen />);
    fireEvent.press(getByText('Back to Swag Dashboard'));
    expect(mockedSwitchPillar).toHaveBeenCalledWith({
      to: {
        pillarId: 'SwagApp',
      },
    });

    expect(mockedEventTracking).toHaveBeenCalledWith({
      categoryName: 'user action',
      event: 'Click Back To Swag',
      metaData: {
        module: 'SSO Mini App',
      },
    });
  });
});
