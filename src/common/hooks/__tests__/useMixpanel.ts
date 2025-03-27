import { mockedEventTracking, mockedScreenTracking } from '../../../../test-setup/after-env/mixpanel.setup';
import { EventTrackingCategory } from '../../stores/useSessionStore';
import { renderHook } from '../../utils/testing';
import { useMixpanel } from '../useMixpanel';

// #region

const TEST_EVENT = {
  event: 'test event',
  metaData: {
    module: 'test',
  },
  categoryName: EventTrackingCategory.USER_ACTION,
};
// #endregion

describe('useMixpanel', () => {
  it('calls the wrapped eventTracking if called', () => {
    const { result } = renderHook(() => useMixpanel());
    result.current.eventTracking(TEST_EVENT);
    expect(mockedEventTracking).toBeCalledTimes(1);
    expect(mockedEventTracking).toHaveBeenLastCalledWith(TEST_EVENT);
  });

  it('calls the wrapped screenTracking if called', () => {
    const { result } = renderHook(() => useMixpanel());
    result.current.screenTracking(TEST_EVENT);
    expect(mockedScreenTracking).toBeCalledTimes(1);
    expect(mockedScreenTracking).toHaveBeenLastCalledWith(TEST_EVENT);
  });
});
