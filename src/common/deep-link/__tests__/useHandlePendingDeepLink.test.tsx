import { waitFor } from '@testing-library/react-native';
import { handleDeeplink } from '../../../EventHandler';
import { renderHook } from '../../utils/testing';
import { useHandlePendingDeepLink } from '../useHandlePendingDeepLink';
import { storePendingDeepLink } from '../usePendingDeepLinkStore';

jest.mock('../../../EventHandler', () => ({
  handleDeeplink: jest.fn(),
}));

describe('useHandlePendingDeeplink', () => {
  it('should call handleDeeplink when have pending deeplink', async () => {
    const payload = {
      url: 'deeplink',
    };
    storePendingDeepLink(payload);

    renderHook(useHandlePendingDeepLink);

    await waitFor(() => {
      expect(handleDeeplink).toBeCalledWith(payload);
    });
  });
});
