import { getIconCategory, getIconCategoryV2, turnCategoryIntoOption } from '../category';

describe('Get icon category', () => {
  it.each`
    label                         | icon
    ${'Food & Drink'}             | ${'fastfood-outlined'}
    ${'Fashion & Clothing'}       | ${'styler-outlined'}
    ${'Sports & Fitness'}         | ${'tennis-outlined'}
    ${'Health & Beauty'}          | ${'dentistry-outlined'}
    ${'Retail & Other'}           | ${'tag-outlined'}
    ${'Travel & Holidays'}        | ${'plane-up'}
    ${'Pubs & Clubs'}             | ${'beer-outlined'}
    ${'Events & Activities'}      | ${'ticket-outlined'}
    ${'Tech & Electronics'}       | ${'bolt'}
    ${'Finance & Insurance'}      | ${'dollar-sign'}
    ${'Books & Stationery'}       | ${'book-outlined'}
    ${'Automotive'}               | ${'car-forward-outlined'}
    ${'Services'}                 | ${'volunteer-outlined'}
    ${'Experience'}               | ${'surfing'}
    ${'Indoor Play & Activities'} | ${'extension-outlined'}
  `('should returns correct icon when label is $label', ({ icon, label }) => {
    expect(getIconCategory(label)).toEqual(icon);
  });
});

describe('Get icon category v2', () => {
  it.each`
    code             | icon
    ${'giftcard'}    | ${'redeem'}
    ${'bill'}        | ${'dollar-card-outlined'}
    ${'dining'}      | ${'fastfood-outlined'}
    ${'fashion'}     | ${'styler-outlined'}
    ${'fitness'}     | ${'tennis-outlined'}
    ${'wellness'}    | ${'dentistry-outlined'}
    ${'retail'}      | ${'tag-outlined'}
    ${'travel'}      | ${'plane-up'}
    ${'tech'}        | ${'bolt'}
    ${'finances'}    | ${'dollar-sign'}
    ${'experiences'} | ${'surfing'}
  `('should returns correct icon when code is $label', ({ code, icon }) => {
    expect(getIconCategoryV2(code)).toEqual(icon);
  });
});

describe('turnCategoryIntoOption', () => {
  it('should return correct option', () => {
    expect(
      turnCategoryIntoOption({
        id: '1',
        image:
          'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/OfferCategories/employment-hero/food-and-drink.svg',
        name: 'Food & Drink',
      })
    ).toEqual({
      key: '1',
      label: 'Food & Drink',
    });
  });
});
