import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { useHeroPointsVisibility } from '../../../../../common/hooks/useHeroPointsVisibility';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { GetHeroPointsBalanceQuery } from '../../../../../new-graphql/generated';
import { useGetHeroPointsBalanceQuery } from '../../../../../new-graphql/generated';
import { HeroPointsBalanceCard } from '../HeroPointsBalanceCard';

const mockUseHeroPointsVisibility = useHeroPointsVisibility as jest.MockedFunction<typeof useHeroPointsVisibility>;

jest.mock('../../../../../common/hooks/useHeroPointsVisibility');

const mockUseGetHeroPointsBalanceQuery = useGetHeroPointsBalanceQuery as unknown as jest.Mock<
  MockQueryResult<GetHeroPointsBalanceQuery>
>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetHeroPointsBalanceQuery: jest.fn(),
}));

describe('HeroPointsBalanceCard', () => {
  const defaultProps = {
    onPress: () => {},
    testID: 'hero-points-balance',
    heroPointsBalance: 1000,
    isHeroPointsBalanceError: false,
    isHeroPointsBalanceLoading: false,
    heroPointsPermission: true,
  };
  beforeEach(() => {
    mockUseHeroPointsVisibility.mockReturnValue(true);
    mockUseGetHeroPointsBalanceQuery.mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 1000,
          },
        },
      },
      isLoading: false,
      isError: false,
    });
  });
  it('should render correctly', () => {
    const { getByText } = render(<HeroPointsBalanceCard {...defaultProps} />);
    expect(getByText('Points: 1,000 PTS')).toBeTruthy();
  });
  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<HeroPointsBalanceCard {...defaultProps} onPress={mockOnPress} />);
    fireEvent.press(getByTestId('hero-points-balance'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Click on hero points tile',
      metaData: {
        module: 'Benefits pillar',
      },
    });
    expect(mockOnPress).toBeCalledTimes(1);
  });

  it('should render nothing when dont have permission', () => {
    mockUseHeroPointsVisibility.mockReturnValue(false);

    const { queryByText } = render(<HeroPointsBalanceCard {...defaultProps} />);
    expect(queryByText('Points: 1,000 PTS')).toBeNull();
  });

  it('should render skeleton when is loading', () => {
    mockUseGetHeroPointsBalanceQuery.mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 1000,
          },
        },
      },
      isLoading: true,
      isError: false,
    });
    const { getByTestId, queryByText } = render(
      <HeroPointsBalanceCard {...defaultProps} testID="hero points balance" />
    );
    expect(queryByText('Points: 1,000 PTS')).toBeNull();
    expect(getByTestId('hero points balance skeleton')).toBeTruthy();
  });

  it('should render nothing when is error', () => {
    mockUseGetHeroPointsBalanceQuery.mockReturnValue({
      data: {
        me: {
          heroPoints: {
            balance: 1000,
          },
        },
      },
      isLoading: false,
      isError: true,
    });
    const { queryByText } = render(<HeroPointsBalanceCard {...defaultProps} />);
    expect(queryByText('Points: 1,000 PTS')).toBeNull();
  });
});
