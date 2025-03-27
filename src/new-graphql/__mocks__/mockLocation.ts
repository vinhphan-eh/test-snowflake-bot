import type { MockQueryResult } from '../../common/types/react-query';
import {
  type GetLocationsQuery,
  type GetLocationByPlaceIdQuery,
  useGetLocationByPlaceIdQuery,
  useGetLocationsQuery,
} from '../generated';

export const mockUseGetLocationsQuery = useGetLocationsQuery as unknown as jest.Mock<
  MockQueryResult<GetLocationsQuery>
>;
export const mockUseGetLocationByPlaceIdQuery = useGetLocationByPlaceIdQuery as unknown as jest.Mock<
  MockQueryResult<GetLocationByPlaceIdQuery>
>;
jest.mock('../generated', () => ({
  ...jest.requireActual('../generated'),
  useGetLocationsQuery: jest.fn(),
  useGetLocationByPlaceIdQuery: jest.fn(),
}));
