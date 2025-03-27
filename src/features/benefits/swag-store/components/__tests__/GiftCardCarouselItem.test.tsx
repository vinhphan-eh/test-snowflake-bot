import React from 'react';
import images from '../../../../../common/assets/images';
import { render } from '../../../../../common/utils/testing';
import { GiftCardCarouselItem } from '../GiftCardCarouselItem';

describe('ProductItem', () => {
  it('should render correctly', () => {
    const { getByLabelText, getByText } = render(
      <GiftCardCarouselItem
        title="Ya i saeki ya"
        subTitle="Save up"
        imgHeight={100}
        imgWidth={170}
        imgSrc={images.billStreamIntro1}
        onPress={() => {}}
      />
    );

    expect(getByText('Ya i saeki ya')).toBeTruthy();
    expect(getByText('Save up')).toBeTruthy();
    expect(getByLabelText('Product Image')).toBeTruthy();
  });
});
