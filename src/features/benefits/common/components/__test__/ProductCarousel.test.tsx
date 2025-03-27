import React from 'react';
import { Text } from 'react-native';
import images from '../../../../../common/assets/images';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { Product } from '../../../../../new-graphql/generated';
import { ProductCarousel } from '../ProductCarousel';
import { ProductItem } from '../ProductItem';

describe('ProductCarousel', () => {
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
      <ProductCarousel
        title="Carousel"
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
        keyExtractor={undefined}
      />
    );

    expect(getByText('Carousel')).toBeTruthy();
    expect(getByText('Gift card 1')).toBeTruthy();
  });

  it('should render skeleton correctly', () => {
    const { getAllByText } = render(
      <ProductCarousel
        keyExtractor={undefined}
        title="Carousel"
        onPress={() => {}}
        renderItem={() => null}
        products={[]}
        renderItemSkeleton={() => <Text testID="skeleton">Skeleton</Text>}
        isLoading
      />
    );
    expect(getAllByText('Skeleton').length).toEqual(3);
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ProductCarousel
        keyExtractor={undefined}
        renderItem={() => null}
        renderItemSkeleton={() => null}
        products={[]}
        testID="carousel"
        title="Carousel"
        onPress={mockOnPress}
        isLoading={false}
      />
    );

    fireEvent.press(getByTestId('carousel-header-icon'));

    expect(mockOnPress).toBeCalledTimes(1);
  });

  it('should hide header icon correctly', () => {
    const { queryByTestId } = render(
      <ProductCarousel
        keyExtractor={undefined}
        renderItem={() => null}
        renderItemSkeleton={() => null}
        products={[]}
        testID="carousel"
        title="Carousel"
        onPress={() => {}}
        isLoading={false}
        hideHeaderIcon
      />
    );

    expect(queryByTestId('carousel-header-icon')).toBeNull();
  });
});
