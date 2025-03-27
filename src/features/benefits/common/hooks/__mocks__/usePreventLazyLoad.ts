import { usePreventLazyLoad } from '../usePreventLazyLoad';

export const mockUsePreventLazyLoad = usePreventLazyLoad as jest.MockedFn<typeof usePreventLazyLoad>;

jest.mock('../usePreventLazyLoad', () => ({
  usePreventLazyLoad: jest.fn(),
}));
