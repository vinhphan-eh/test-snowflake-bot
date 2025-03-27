import React from 'react';
import { Text } from 'react-native';
import images from '../../../../../common/assets/images';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { Product } from '../../../../../new-graphql/generated';
import { ProductGrid } from '../ProductGrid';
import { ProductItem } from '../ProductItem';

describe('ProductGrid', () => {
  it('should render correctly', () => {
    const renderItem = ({ index, item }: { index: number; item: Product }) => (
      <ProductItem
        key={index}
        title={item.name}
        imgHeight={100}
        imgWidth={170}
        imgSrc={images.billStreamIntro1}
        onPress={() => {}}
      />
    );

    const { getByText } = render(
      <ProductGrid
        title="Product Grid"
        onPress={() => {}}
        renderItem={renderItem}
        products={[
          {
            name: 'Gift card 1',
            id: '1',
          } as Product,
        ]}
        renderItemSkeleton={() => null}
        isLoading={false}
      />
    );

    expect(getByText('Product Grid')).toBeTruthy();
    expect(getByText('Gift card 1')).toBeTruthy();
  });

  it('should render skeleton correctly', () => {
    const { getAllByText } = render(
      <ProductGrid
        title="ProductList"
        onPress={() => {}}
        renderItem={() => null}
        products={[]}
        renderItemSkeleton={() => <Text testID="skeleton">Skeleton</Text>}
        isLoading
      />
    );
    expect(getAllByText('Skeleton').length).toEqual(6);
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ProductGrid
        renderItem={() => null}
        renderItemSkeleton={() => null}
        products={[]}
        testID="product-grid"
        title="Product grid"
        onPress={mockOnPress}
        isLoading={false}
      />
    );

    fireEvent.press(getByTestId('product-grid-header-icon'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
