export const mockNavigateToTopTabs = jest.fn();
export const mockNavigateToBenefitsTopTabs = jest.fn();
export const mockNavigateFromRoot = jest.fn();

jest.mock('../rootNavigation', () => ({
  navigateToTopTabs: mockNavigateToTopTabs,
  navigateToBenefitsTopTabs: mockNavigateToBenefitsTopTabs,
  navigateFromRoot: mockNavigateFromRoot,
}));
