import { create } from 'zustand';

type SearchQuery = {
  query: string;
  categoryCode: string;
  categoryName: string;
};

interface InstoreTabData {
  defaultSearchQuery?: SearchQuery;
}

export const useInstoreTabStore = create<InstoreTabData>()(() => ({
  defaultSearchQuery: undefined,
}));

export const setDefaultSearchQuery = (searchQuery: SearchQuery | undefined) => {
  useInstoreTabStore.setState({ defaultSearchQuery: searchQuery });
};
