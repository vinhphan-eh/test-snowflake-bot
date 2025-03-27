import React from 'react';
import { useHeroPointsVisibility } from '../../../../../common/hooks/useHeroPointsVisibility';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render, userEvent, waitFor } from '../../../../../common/utils/testing';
import {
  useGetHeroPointsBalanceQuery,
  type GetHeroPointsBalanceQuery,
  type Product,
} from '../../../../../new-graphql/generated';
import { ProductItem } from '../../components/ProductItem';
import { ProductSearchTemplate } from '../ProductSearchTemplate';

const products: Product[] = [
  { id: '1', name: 'Gift card 1', image: { url: '' } },
  { id: '2', name: 'Gift card 2', image: { url: '' } },
  { id: '3', name: 'Gift card 3', image: { url: '' } },
  { id: '4', name: 'Gift card 4', image: { url: '' } },
  { id: '5', name: 'Gift card 5', image: { url: '' } },
  { id: '6', name: 'Gift card 6', image: { url: '' } },
] as Product[];
const renderItem = ({ item }: { item: Product }) => {
  return (
    <ProductItem
      key={item.id}
      imgSrc={{ uri: item.image.url ?? '' }}
      imgWidth={100}
      imgHeight={200}
      title={item.name}
      onPress={() => {}}
    />
  );
};

const mockUseHeroPointsVisibility = useHeroPointsVisibility as jest.MockedFunction<typeof useHeroPointsVisibility>;

jest.mock('../../../../../common/hooks/useHeroPointsVisibility');

const mockUseGetHeroPointsBalanceQuery = useGetHeroPointsBalanceQuery as unknown as jest.Mock<
  MockQueryResult<GetHeroPointsBalanceQuery>
>;

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetHeroPointsBalanceQuery: jest.fn(),
}));

describe('ProductSearchTemplate', () => {
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
  it('it should render correctly', () => {
    const { getByText } = render(
      <ProductSearchTemplate
        location="search all"
        keyExtractor={undefined}
        onChangeText={() => {}}
        title="Product Search Template"
        placeholder="Search products"
        products={products}
        renderItem={renderItem}
        isLoading={false}
        onEndReached={() => {}}
        isFetchingNextPage={false}
        renderItemSkeleton={() => null}
        isError={false}
      />
    );
    expect(getByText('Product Search Template')).toBeTruthy();
    expect(getByText('Gift card 1')).toBeTruthy();
  });

  it('it should render correctly with hero points balance when selectedCategory is giftcard', () => {
    const { getByText } = render(
      <ProductSearchTemplate
        location="search all"
        keyExtractor={undefined}
        onChangeText={() => {}}
        title="Product Search Template"
        placeholder="Search products"
        products={products}
        renderItem={renderItem}
        isLoading={false}
        onEndReached={() => {}}
        isFetchingNextPage={false}
        renderItemSkeleton={() => null}
        isError={false}
        selectedCategory="giftcard"
      />
    );
    expect(getByText('Product Search Template')).toBeTruthy();
    expect(getByText('Gift card 1')).toBeTruthy();
    expect(getByText('Points: 1,000 PTS')).toBeTruthy();
  });

  it('it should trigger load more correctly when scroll down', async () => {
    const onEndReached = jest.fn();
    const { getByTestId } = render(
      <ProductSearchTemplate
        location="search all"
        keyExtractor={undefined}
        isError={false}
        testID="product-search-template"
        onChangeText={() => {}}
        title="Product Search Template"
        placeholder="Search products"
        products={products}
        renderItem={renderItem}
        isLoading={false}
        onEndReached={onEndReached}
        isFetchingNextPage={false}
        renderItemSkeleton={() => null}
      />
    );

    // Fix the issue when upgrade to RN 0.73
    // https://github.com/callstack/react-native-testing-library/issues/1540#issuecomment-1847102163
    await userEvent.scrollTo(getByTestId('product-search-template-listview'), {
      y: 340, // threshold is 0.3
      // Dimensions of the scrollable content
      contentSize: { height: 800, width: 240 },
      // Dimensions of the device
      layoutMeasurement: { height: 480, width: 240 },
    });

    expect(onEndReached).toHaveBeenCalledTimes(1);
  });

  it('should show skeleton while loading', () => {
    const { getAllByTestId } = render(
      <ProductSearchTemplate
        location="search all"
        keyExtractor={undefined}
        isError={false}
        testID="product-search-template"
        onChangeText={() => {}}
        title="Product Search Template"
        placeholder="Search products"
        products={[]}
        renderItem={renderItem}
        isLoading
        onEndReached={() => {}}
        isFetchingNextPage={false}
      />
    );
    expect(getAllByTestId('product-item-skeleton')).toHaveLength(6);
  });

  it('should trigger onChangeText when typing to search box', async () => {
    const onChangeText = jest.fn();
    const { getByTestId } = render(
      <ProductSearchTemplate
        location="search all"
        keyExtractor={undefined}
        testID="product-search-template"
        onChangeText={onChangeText}
        title="Product Search Template"
        placeholder="Search products"
        products={products}
        renderItem={renderItem}
        isLoading={false}
        isError={false}
        onEndReached={() => {}}
        isFetchingNextPage={false}
      />
    );
    fireEvent.changeText(getByTestId('search-bar'), 'cashback');
    await waitFor(() => {
      expect(onChangeText).toBeCalledWith('cashback');
    });
  });
});
