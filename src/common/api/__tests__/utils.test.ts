import { checkIfLoopingError, clearSavedFailedQueries, getGraphQLOperationType } from '../utils';

describe('getGraphQLOperationType', () => {
  describe('Test Query', () => {
    it('should match for query operation', () => {
      const config = {
        data: {
          query: `query GetUKToken {
                    me {
                    wallet {
                    UKToken {
                    userToken
                            }
                        }
                    }
                }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('query');
    });

    it('should match with comment', () => {
      const config = {
        data: {
          query: `
              # This is a comment
                query GetUKToken {
                    me {
                    wallet {
                    UKToken {
                    userToken
                            }
                        }
                    }
                }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('query');
    });

    it('should match with leading white space', () => {
      const config = {
        data: {
          query: `

                query GetUKToken {
                    me {
                    wallet {
                    UKToken {
                    userToken
                            }
                        }
                    }
                }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('query');
    });

    it('should not match inside variables', () => {
      const config = {
        data: {
          query: `
          {
            "operation": "query GetUser",
            "variables": {
              "id": 1,
              "type": "query"
            }
          }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('unknown');
    });
  });

  describe('Test mutation', () => {
    it('should match for mutation operation', () => {
      const config = {
        data: {
          query: `mutation UpdateCardPIN($cardPIN: String!) {
                    updateCardPIN(cardPIN: $cardPIN)
                }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('mutation');
    });

    it('should match with comment', () => {
      const config = {
        data: {
          query: `
              # This is a comment
                mutation UpdateCardPIN($cardPIN: String!) {
                    updateCardPIN(cardPIN: $cardPIN)
                }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('mutation');
    });

    it('should match with leading white space', () => {
      const config = {
        data: {
          query: `

                mutation UpdateCardPIN($cardPIN: String!) {
                    updateCardPIN(cardPIN: $cardPIN)
                }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('mutation');
    });

    it('should not match inside variables', () => {
      const config = {
        data: {
          query: `
          {
            "operation": "mutation GetUser",
            "variables": {
              "id": 1,
              "type": "mutation"
            }
          }`,
        },
      };
      expect(getGraphQLOperationType(config)).toBe('unknown');
    });
  });
});

// Mocking Date.now()
const mockNow = (timestamp: number) => {
  jest.spyOn(Date, 'now').mockImplementation(() => timestamp);
};

describe('checkIfLoopingError', () => {
  beforeEach(() => {
    clearSavedFailedQueries();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not trigger a loop on the first failure', () => {
    mockNow(1000); // Simulate current time
    const result = checkIfLoopingError('query1');
    expect(result).toBe(false);
  });

  it('should not trigger a loop after 2 failures', () => {
    mockNow(1000); // First failure
    checkIfLoopingError('query1');

    mockNow(2000); // Second failure
    const result = checkIfLoopingError('query1');
    expect(result).toBe(false);
  });

  it('should not trigger a loop after 5 failures and beyond the LOOP_DETECTION_PERIOD', () => {
    mockNow(1000); // First failure
    checkIfLoopingError('query1');

    mockNow(2000); // Second failure
    checkIfLoopingError('query1');

    mockNow(3000); // Third failure
    checkIfLoopingError('query1');

    mockNow(4000); // Fourth failure
    checkIfLoopingError('query1');

    mockNow(31000); // Fifth failure
    const result = checkIfLoopingError('query1');
    expect(result).toBe(false);
  });

  it('should trigger a loop after 5 failures within the LOOP_DETECTION_PERIOD', () => {
    mockNow(1000); // First failure
    checkIfLoopingError('query1');

    mockNow(2000); // Second failure
    checkIfLoopingError('query1');

    mockNow(3000); // Third failure
    checkIfLoopingError('query1');

    mockNow(4000); // Fourth failure
    checkIfLoopingError('query1');

    mockNow(30000); // Fifth failure
    const result = checkIfLoopingError('query1');
    expect(result).toBe(true);
  });

  it('should not trigger a loop after 5 failures within the LOOP_DETECTION_PERIOD if the endpoint is excluded', () => {
    mockNow(1000); // First failure
    const failedEndpoint = 'https://mock-eben-api-url.com/auth/exchange';
    checkIfLoopingError(failedEndpoint);

    mockNow(2000); // Second failure
    checkIfLoopingError(failedEndpoint);

    mockNow(3000); // Third failure
    checkIfLoopingError(failedEndpoint);

    mockNow(4000); // Fourth failure
    checkIfLoopingError(failedEndpoint);

    mockNow(30000); // Fifth failure
    const result = checkIfLoopingError(failedEndpoint);
    expect(result).toBe(false);
  });
});
