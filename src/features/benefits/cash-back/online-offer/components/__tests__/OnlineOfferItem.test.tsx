import React from 'react';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import type { OnlineOffer } from '../../../../../../new-graphql/generated';
import { OfferType } from '../../../../../../new-graphql/generated';
import { OnlineOfferItem } from '../OnlineOfferItem';

const mockItem: OnlineOffer = {
  advertiserId: '123',
  cashback: '8%',
  categoryCode: '1',
  description:
    'Click the link above to access 8% Cashback on your purchases. You will receive an email confirming your pending Cashback as soon as PokitPal receives confirmation of your purchase from the retailer. Allow up to 7 days from the date of your purchase. Depending on the retailers returns policy, allow approximately 90 days for the cashback to be deposited into your personal MyWallet.',
  howItWorks:
    'To receive Cashback on your purchases, click the button provided to access the retailer’s website. When you’ve finished shopping, you will receive a notification in your app confirming the Cashback amount due. If you have not received a notification within 5 days from the date of your online purchase, please let us know. Depending on the retailers returns policy, it may take up to 90 days for the Cashback to be settled and deposited in your personal Wallet.',
  id: '919638',
  imageUrl:
    'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/CoverShot/advertiser_cover_image.1652861436_1652861436.Jpeg',
  logoUrl:
    'https://pokitpal-images.s3-ap-southeast-2.amazonaws.com/stage/UploadFiles/Logos/advertiser_logo.1652861436_1652861436.Jpeg',
  advertiserAbout: 'About Us goes here.',
  advertiserName: 'Gourmet Basket',
  tnc: 'To be eligible for Cashback you must access the partner site through the link above. GST, delivery costs and products that are returned do not contribute to the purchase amount that is eligible for Cashback.',
  title: '8% Cashback on All Purchases',
  trackingUrl: 'https://api.staging.pokitpal.com/v1/affiliate/b704852a-6e43-49bc-97a0-2bc6c4c50d6f/919638/1549678',
  about: '',
  createdAt: '',
  isCardLinkedOffer: false,
  popularScore: 0,
  type: OfferType.Online,
  updatedAt: '',
};

describe('OnlineOfferItem', () => {
  it('should render correctly', () => {
    const { getByText } = render(<OnlineOfferItem item={mockItem} onPress={() => {}} />);
    expect(getByText('Gourmet Basket')).toBeTruthy();
    expect(getByText('8% cashback on all purchases')).toBeTruthy();
    expect(getByText('Online')).toBeTruthy();
  });

  it('onPress works correctly', () => {
    const mockOnPress = jest.fn();
    const { getByText } = render(<OnlineOfferItem item={mockItem} onPress={mockOnPress} />);

    fireEvent.press(getByText('Gourmet Basket'));

    expect(mockOnPress).toBeCalledTimes(1);
  });
});
