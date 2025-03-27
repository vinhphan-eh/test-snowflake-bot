import React from 'react';
import { render, renderHook } from '../../../../../../common/utils/testing';
import { mockUsePreventLazyLoad } from '../../../../common/hooks/__mocks__/usePreventLazyLoad';
import { useInstoreTabStore } from '../../hooks/useInstoreTabStore';
import { InstoreScreen } from '../InstoreScreen';

describe('InstoreScreen', () => {
  beforeEach(() => {
    const tabStore = renderHook(() => useInstoreTabStore());
    tabStore.result.current.defaultSearchQuery = {
      query: 'test',
      categoryCode: 'fashion',
      categoryName: 'Fashion',
    };

    mockUsePreventLazyLoad.mockReturnValue({ shouldUseFakeScreen: false });
  });
  it('shoudl work correctly when having default query', () => {
    const { getByTestId } = render(<InstoreScreen />);
    expect(getByTestId('search-bar')).toHaveProp('defaultValue', 'test');
    expect(getByTestId('filter-btn')).toBeTruthy();
  });
});
