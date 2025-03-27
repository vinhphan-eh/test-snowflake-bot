import React from 'react';
import images from '../../../../../common/assets/images';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { ProductItem } from '../ProductItem';

describe('ProductItem', () => {
  it('should render correctly', () => {
    const { getByLabelText, getByText } = render(
      <ProductItem
        title="Ya i saeki ya"
        subTitle="Save up"
        imgHeight={100}
        imgWidth={170}
        imgSrc={images.billStreamIntro1}
        kicker="merchant name"
        onPress={() => {}}
      />
    );

    expect(getByText('Ya i saeki ya')).toBeTruthy();
    expect(getByText('Save up')).toBeTruthy();
    expect(getByText('merchant name')).toBeTruthy();
    expect(getByLabelText('Product Image')).toBeTruthy();
  });

  it('should render correctly without sub title', () => {
    const { getByLabelText, getByText } = render(
      <ProductItem
        title="Ya i saeki ya"
        imgHeight={100}
        imgWidth={170}
        imgSrc={images.billStreamIntro1}
        onPress={() => {}}
      />
    );

    expect(getByText('Ya i saeki ya')).toBeTruthy();
    expect(getByLabelText('Product Image')).toBeTruthy();
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <ProductItem
        testID="product-item"
        title="Ya i saeki ya"
        subTitle="Save up"
        imgHeight={100}
        imgWidth={170}
        imgSrc={images.billStreamIntro1}
        onPress={mockOnPress}
      />
    );

    fireEvent.press(getByTestId('product-item'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
