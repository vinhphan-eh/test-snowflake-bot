import { useIsAccountUKWithLoadingState, useIsAccountUK } from '../useIsAccountUK';

export const mockUseIsAccountUKWithLoadingState = useIsAccountUKWithLoadingState as jest.MockedFunction<
  typeof useIsAccountUKWithLoadingState
>;

export const mockUseIsAccountUK = useIsAccountUK as jest.MockedFunction<typeof useIsAccountUK>;

jest.mock('../useIsAccountUK', () => ({
  useIsAccountUKWithLoadingState: jest.fn(),
  useIsAccountUK: jest.fn(),
}));
