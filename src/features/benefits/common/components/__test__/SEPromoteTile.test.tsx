import React from 'react';
import type { ImageStyle, TextStyle, ViewStyle } from 'react-native';
import images from '../../../../../common/assets/images';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { SEPromoteTile } from '../SEPromoteTile';

type Style = ViewStyle | TextStyle | ImageStyle;
type StyleArray = Style | Style[];

const flattenStyles = (styleArray: StyleArray): Style => {
  if (!Array.isArray(styleArray)) {
    return styleArray;
  }
  return styleArray.reduce<Style>((acc, style) => {
    return { ...acc, ...style };
  }, {});
};

describe('SEPromoteTile', () => {
  const defaultProps = {
    testID: 'SEPromoteTile1',
  };

  it('should handle custom styles', () => {
    const customStyles = { backgroundColor: 'red' };
    const { getByTestId } = render(
      <SEPromoteTile backgroundImage={images.sePromoTitle} {...defaultProps} style={customStyles} />
    );

    const tile = getByTestId(defaultProps.testID);
    const specificStyleObject = flattenStyles(tile.props.style);

    expect(specificStyleObject).toHaveProperty('backgroundColor', 'red');
  });

  it('onPress should work correctly', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <SEPromoteTile backgroundImage={images.sePromoTitle} onPress={mockOnPress} {...defaultProps} />
    );

    fireEvent.press(getByTestId(defaultProps.testID));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
