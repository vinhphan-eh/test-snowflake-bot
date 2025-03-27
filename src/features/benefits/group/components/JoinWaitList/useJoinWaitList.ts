/* eslint-disable react/jsx-no-constructed-context-values */
import type { Dispatch, SetStateAction } from 'react';
import { useMemo, useState } from 'react';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import type { UserCategoryInput } from '../../../../../new-graphql/generated';
import {
  CategoryAction,
  useGetGroupCategoriesQuery,
  useJoinWaitListWithCategoriesMutation,
} from '../../../../../new-graphql/generated';

const SPECIAL_CATEGORY = {
  OTHER: 'Other',
} as const;

export type TCategory = {
  id: string;
  name: string;
  custom?: boolean;
};

export type TUseJoinWaitListOutput = {
  isShowAddNewCategory: boolean;
  suvreyIndexKey: number;
  lastIndexKey: number;
  isFechingCategories: boolean;
  categories: TCategory[];
  isShowSurveys: boolean;
  selectedItemIndex: number;
  selectedCategories: Record<string, boolean>;
  toggleById: (id: string) => void;
  onSkipSurvey: () => void;
  onNextCarousel: () => void;
  onJoinWaitList: () => void;
  setSelectedItemIndex: Dispatch<SetStateAction<number>>;
  onCloseAddNewCategory: () => void;
  onAddNewCategory: (name: string) => void;
  isJoinWaitListLoading: boolean;
};

export type TUseJoinWaitListInput = {
  onJoinWaitListSuccess?: () => void;
  onJoinWaitListFailed?: () => void;
};

const useJoinWaitList = ({
  onJoinWaitListFailed,
  onJoinWaitListSuccess,
}: TUseJoinWaitListInput): TUseJoinWaitListOutput => {
  const { data: communityCategoriesData, isLoading: isFechingCategories } = useGetGroupCategoriesQuery();
  const { isLoading: isJoinWaitListLoading, mutateAsync: joinWaitList } = useJoinWaitListWithCategoriesMutation({
    onSuccess: () => {
      onJoinWaitListSuccess?.();
    },
    onError: () => {
      onJoinWaitListFailed?.();
    },
  });

  const isShowSurveys = usePermissionStore(state => !state.permissions?.skipMegaDealsSurvey?.view);
  const suvreyIndexKey = isShowSurveys ? 2 : -1;
  const lastIndexKey = isShowSurveys ? 3 : 2;
  const defaultCategories = communityCategoriesData?.group?.categories;
  const [isSkipped, setSkipped] = useState(false);
  const [customCategories, setCustomCategories] = useState<TCategory[]>([]);

  const categories = useMemo<TCategory[]>(() => {
    return [
      ...(defaultCategories?.reduce((rs: TCategory[], defaultCategory) => {
        if (defaultCategory?.id && defaultCategory?.name) {
          rs.push({
            id: defaultCategory.id,
            name: defaultCategory.name,
          });
        }
        return rs;
      }, []) ?? []),
      ...customCategories,
      { id: SPECIAL_CATEGORY.OTHER, name: SPECIAL_CATEGORY.OTHER },
    ];
  }, [defaultCategories, customCategories]);

  const categoriesById = useMemo(
    () =>
      categories.reduce((rs: Record<string, TCategory>, category) => {
        // eslint-disable-next-line no-param-reassign
        rs[category.id] = category;
        return rs;
      }, {}),
    [categories]
  );

  const [isShowAddNewCategory, setShowAddNewCategory] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<Record<string, boolean>>({});
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);

  const onCloseAddNewCategory = () => {
    setShowAddNewCategory(false);
  };

  const onSkipSurvey = () => {
    setSkipped(true);
    setSelectedItemIndex(lastIndexKey);
  };
  const onNextCarousel = () => {
    setSkipped(false);
    setSelectedItemIndex(lastIndexKey);
  };
  const makeCategoriesPayload = (): UserCategoryInput[] =>
    Object.keys(selectedCategories).reduce((rs: UserCategoryInput[], key) => {
      if (categoriesById[key]) {
        if (categoriesById[key].custom) {
          rs.push({ categoryName: categoriesById[key].name });
        } else {
          rs.push({ categoryId: categoriesById[key].id });
        }
      }
      return rs;
    }, []);

  const makeCategoryAction = () => {
    if (!isShowSurveys) {
      return CategoryAction.NotShown;
    }

    if (isSkipped) {
      return CategoryAction.Skipped;
    }

    return CategoryAction.Chosen;
  };

  const onJoinWaitList = () => {
    joinWaitList({
      categoryAction: makeCategoryAction(),
      categories: makeCategoriesPayload(),
    });
  };

  const toggleById = (id: string) => {
    if (id === SPECIAL_CATEGORY.OTHER) {
      setShowAddNewCategory(true);
    } else {
      setSelectedCategories(prev => ({
        ...prev,
        [id]: !prev[id],
      }));
    }
  };

  const onAddNewCategory = (name: string) => {
    const trimedName = name.trim();
    if (trimedName && trimedName !== SPECIAL_CATEGORY.OTHER) {
      setCustomCategories(prev => {
        if (prev.findIndex(item => item.id === trimedName) === -1) {
          return [...prev, { id: trimedName, name: trimedName, custom: true }];
        }
        return prev;
      });
      toggleById(trimedName);
    }
    setShowAddNewCategory(false);
  };

  return {
    categories,
    isFechingCategories,
    isJoinWaitListLoading,
    isShowAddNewCategory,
    isShowSurveys,
    lastIndexKey,
    onAddNewCategory,
    onCloseAddNewCategory,
    onJoinWaitList,
    onNextCarousel,
    onSkipSurvey,
    selectedCategories,
    selectedItemIndex,
    setSelectedItemIndex,
    suvreyIndexKey,
    toggleById,
  };
};

export default useJoinWaitList;
