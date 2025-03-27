import { Linking } from 'react-native';
import { waitFor } from '@testing-library/react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import { useInAppBrowser } from './useInAppBrowser';
import { renderHook } from '../utils/testing';

describe('useInAppBrowser', () => {
  it('should open in app browser when available', async () => {
    jest.spyOn(InAppBrowser, 'isAvailable').mockImplementation(async () => true);
    jest.spyOn(InAppBrowser, 'open');

    const {
      result: {
        current: { openUrl },
      },
    } = renderHook(() => useInAppBrowser());

    const mockUrl = 'https://mock-for-fun.com';
    await openUrl(mockUrl);

    await waitFor(() => {
      expect(InAppBrowser.open).toBeCalledWith(mockUrl, expect.anything());
    });
  });

  it('should open external browser when not available', async () => {
    jest.spyOn(InAppBrowser, 'isAvailable').mockImplementation(async () => false);
    jest.spyOn(Linking, 'openURL');

    const {
      result: {
        current: { openUrl },
      },
    } = renderHook(() => useInAppBrowser());

    const mockUrl = 'https://mock-for-fun.com';
    await openUrl(mockUrl);

    await waitFor(() => {
      expect(Linking.openURL).toBeCalledWith(mockUrl);
    });
  });
});
