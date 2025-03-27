import React from 'react';
import { Text } from 'react-native';
import images from '../../../../../common/assets/images';
import { render } from '../../../../../common/utils/testing';
import { InstapaySwagTileBase } from '../InstapaySwagTileBase';

describe('CarouselItemBase', () => {
  it('should render correctly', () => {
    const { getByText } = render(
      <InstapaySwagTileBase
        isLoading={false}
        imgContent={<Text>ImageContent</Text>}
        imgSrc={images.instapayNowAccessNow}
        title="Access your pay now"
        onPress={() => {}}
      />
    );
    expect(getByText('Access your pay now')).toBeTruthy();
    expect(getByText('ImageContent')).toBeTruthy();
  });

  it('should render skeleton when loading', () => {
    const { getByTestId } = render(
      <InstapaySwagTileBase testID="base" isLoading title="Access your pay now" onPress={() => {}} />
    );
    expect(getByTestId('base-skeleton')).toBeTruthy();
  });
});
