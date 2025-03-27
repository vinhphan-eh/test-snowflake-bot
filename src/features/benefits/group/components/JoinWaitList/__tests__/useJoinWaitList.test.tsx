/* eslint-disable vars-on-top */
/* eslint-disable no-var */
import { usePermissionStore } from '../../../../../../common/stores/usePermissionStore';
import { renderHook } from '../../../../../../common/utils/testing';
import { CategoryAction } from '../../../../../../new-graphql/generated';
import useJoinWaitList from '../useJoinWaitList';

// type TSelector = (state: object) => boolean;
// usig var to avoid issues, check this https://stackoverflow.com/questions/65554910/jest-referenceerror-cannot-access-before-initialization
var mockMutateAsync = jest.fn();
const mockUsePermissionStore = usePermissionStore as unknown as jest.Mock<unknown>;

jest.mock('../../../../../../common/stores/usePermissionStore');
jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useGetGroupCategoriesQuery: () => ({
    data: {
      group: {
        categories: [
          { id: '1', name: 'First One' },
          { id: '2', name: 'Second One' },
        ],
      },
    },
    isError: false,
    isLoading: false,
  }),
  useJoinWaitListWithCategoriesMutation: () => ({
    mutateAsync: mockMutateAsync,
    isLoading: false,
  }),
}));

describe('useJoinWaitList', () => {
  beforeEach(() => {
    mockMutateAsync.mockClear();
    mockUsePermissionStore.mockClear();
  });
  it('should join waitlist with not-shown categories', () => {
    mockUsePermissionStore.mockImplementation((fn: (input: object) => boolean) => {
      return fn({ permissions: { skipMegaDealsSurvey: { view: true } } });
    });
    const hookInput = {
      onJoinWaitListSuccess: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const { result } = renderHook(() => useJoinWaitList(hookInput));
    expect(result.current.isShowSurveys).toEqual(false);
    expect(result.current.suvreyIndexKey).toEqual(-1);
    expect(result.current.lastIndexKey).toEqual(2);
    result.current.onJoinWaitList();
    expect(mockMutateAsync).toBeCalledWith({
      categoryAction: CategoryAction.NotShown,
      categories: [],
    });
  });

  it('should join waitlist with blank categories', () => {
    mockUsePermissionStore.mockImplementation((fn: (input: object) => boolean) => {
      return fn({ permissions: { skipMegaDealsSurvey: { view: false } } });
    });
    const hookInput = {
      onJoinWaitListSuccess: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const { result } = renderHook(() => useJoinWaitList(hookInput));
    expect(result.current.isShowSurveys).toEqual(true);
    expect(result.current.suvreyIndexKey).toEqual(2);
    expect(result.current.lastIndexKey).toEqual(3);
    result.current.onNextCarousel();
    result.current.onJoinWaitList();
    expect(mockMutateAsync).toBeCalledWith({
      categoryAction: CategoryAction.Chosen,
      categories: [],
    });
  });

  it('should join waitlist with custom categories', () => {
    mockUsePermissionStore.mockImplementation((fn: (input: object) => boolean) => {
      return fn({ permissions: { skipMegaDealsSurvey: { view: false } } });
    });
    const hookInput = {
      onJoinWaitListSuccess: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const { result } = renderHook(() => useJoinWaitList(hookInput));
    expect(result.current.isShowSurveys).toEqual(true);
    expect(result.current.suvreyIndexKey).toEqual(2);
    expect(result.current.lastIndexKey).toEqual(3);
    result.current.onAddNewCategory('Custom One');
    result.current.onAddNewCategory('Custom Two');
    result.current.onNextCarousel();
    result.current.onJoinWaitList();
    expect(mockMutateAsync).toBeCalledWith({
      categoryAction: CategoryAction.Chosen,
      categories: [{ categoryName: 'Custom One' }, { categoryName: 'Custom Two' }],
    });
  });

  it('should join waitlist with custom categories but ignore special one', () => {
    mockUsePermissionStore.mockImplementation((fn: (input: object) => boolean) => {
      return fn({ permissions: { skipMegaDealsSurvey: { view: false } } });
    });
    const hookInput = {
      onJoinWaitListSuccess: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const { result } = renderHook(() => useJoinWaitList(hookInput));
    expect(result.current.isShowSurveys).toEqual(true);
    expect(result.current.suvreyIndexKey).toEqual(2);
    expect(result.current.lastIndexKey).toEqual(3);
    result.current.onAddNewCategory('Custom One');
    result.current.onAddNewCategory('Custom Two');
    result.current.onAddNewCategory('Other');
    result.current.onNextCarousel();
    result.current.onJoinWaitList();
    expect(mockMutateAsync).toBeCalledWith({
      categoryAction: CategoryAction.Chosen,
      categories: [{ categoryName: 'Custom One' }, { categoryName: 'Custom Two' }],
    });
  });

  it('should join waitlist with skipped categories', () => {
    mockUsePermissionStore.mockImplementation((fn: (input: object) => boolean) => {
      return fn({ permissions: { skipMegaDealsSurvey: { view: false } } });
    });
    const hookInput = {
      onJoinWaitListSuccess: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const { result } = renderHook(() => useJoinWaitList(hookInput));
    expect(result.current.isShowSurveys).toEqual(true);
    expect(result.current.suvreyIndexKey).toEqual(2);
    expect(result.current.lastIndexKey).toEqual(3);
    result.current.onAddNewCategory('Custom One');
    result.current.onAddNewCategory('Custom Two');
    result.current.onSkipSurvey();
    result.current.onJoinWaitList();
    expect(mockMutateAsync).toBeCalledWith({
      categoryAction: CategoryAction.Skipped,
      categories: [{ categoryName: 'Custom One' }, { categoryName: 'Custom Two' }],
    });
  });

  it('should join waitlist with categories', () => {
    mockUsePermissionStore.mockImplementation((fn: (input: object) => boolean) => {
      return fn({ permissions: { skipMegaDealsSurvey: { view: false } } });
    });
    const hookInput = {
      onJoinWaitListSuccess: jest.fn(),
      onRequestClose: jest.fn(),
    };
    const { result } = renderHook(() => useJoinWaitList(hookInput));
    expect(result.current.isShowSurveys).toEqual(true);
    expect(result.current.suvreyIndexKey).toEqual(2);
    expect(result.current.lastIndexKey).toEqual(3);
    expect(result.current.categories).toEqual([
      { id: '1', name: 'First One' },
      { id: '2', name: 'Second One' },
      { id: 'Other', name: 'Other' },
    ]);
    result.current.toggleById('1');
    result.current.toggleById('2');
    result.current.onNextCarousel();
    result.current.onJoinWaitList();
    expect(mockMutateAsync).toBeCalledWith({
      categoryAction: CategoryAction.Chosen,
      categories: [{ categoryId: '1' }, { categoryId: '2' }],
    });
  });
});
