import React from 'react';
import { Text } from 'react-native';
import images from '../../../../../common/assets/images';
import { render } from '../../../../../common/utils/testing';
import { InstapaySwagTileBaseV3 } from '../InstapaySwagTileBaseV3';

describe('CarouselItemBase', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <InstapaySwagTileBaseV3
        isLoading={false}
        imgContent={<Text>ImageContent</Text>}
        imgSrc={images.instapayNowAccessNow}
        onPress={() => {}}
      />
    );
    expect(getByText('ImageContent')).toBeTruthy();
  });

  it('should render skeleton when loading', () => {
    const { getByTestId } = render(<InstapaySwagTileBaseV3 testID="base" isLoading onPress={() => {}} />);
    expect(getByTestId('base-skeleton')).toBeTruthy();
  });
});
