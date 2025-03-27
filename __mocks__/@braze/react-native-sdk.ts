const mockGetContentCards = jest.fn();
export default {
  changeUser: jest.fn(),
  logCustomEvent: jest.fn(),
  logContentCardClicked: jest.fn(),
  logContentCardImpression: jest.fn(),
  logContentCardDismissed: jest.fn(),
  requestContentCardsRefresh: jest.fn(),
  getContentCards: mockGetContentCards,
  addListener: jest.fn(),
  Events: {
    CONTENT_CARDS_UPDATED: 'contentCardsUpdated',
  },
};

beforeEach(() => {
  mockGetContentCards.mockReturnValue(Promise.resolve([]));
});
