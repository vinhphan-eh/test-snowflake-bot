import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedEventTracking } from '../../../../../../../test-setup/after-env/mixpanel.setup';
import * as useInAppBrowser from '../../../../../../common/shared-hooks/useInAppBrowser';
import { useToast } from '../../../../../../common/shared-hooks/useToast';
import { fireEvent, render, waitFor } from '../../../../../../common/utils/testing';
import type { DiscountHistory, OrderProductType, OrderStatus } from '../../../../../../new-graphql/generated';
import { OrderDetailScreen } from '../OrderDetailScreen';

jest.mock('../../../../../../common/shared-hooks/useToast', () => ({
  useToast: jest.fn(),
}));

const fulfilledItem: DiscountHistory = {
  id: '2306',
  name: 'JB Hi-Fi Gift Card 100 eGift Card',
  memberId: '425a4dd3-3709-4929-ae45-574e7d653649',
  status: 'fulfilled' as OrderStatus,
  createdAt: '2022-09-23T05:27:59+00:00',
  billableAmount: 95.94,
  transactionFee: 0.94,
  freightCost: 0.0,
  orderDetails: [
    {
      id: '2352',
      discount: 5.0,
      quantity: 1,
      price: 100.0,
      billableAmount: 95.94,
      transactionFee: 0.94,
      status: 'fulfilled' as OrderStatus,
      freightCost: 0.0,
      currency: 'AUD',
      purchaseItems: [
        {
          id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
          data: {
            issuedAt: '2022/09/23',
            pinNumber: '3634',
            cardNumber: '502904030365203495',
            serialNumber: '3652034',
            expiredAt: '2022/10/23',
            activationUrl:
              'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
            orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
            giftCode: 'BBF35FGD32',
          },
          purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
          productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
        },
      ],
      productVariant: {
        variantCode: 'jb-hi-fi-gift-card-100',
        price: 100.0,
        imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/product_variants/9663/CardDesignCorp.jpg',
        discountPrice: 95.0,
        amount: 100.0,
        product: {
          id: '207fb444-f281-4241-8c5e-f42a0e8755af',
          code: 'jb-hi-fi-gift-card',
          name: 'JB Hi-Fi Gift Card',
          title: 'JB Hi-Fi Gift Card',
          imageUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
          logoUrl: 'https://marketplace-service.cdn.staging.ehrocks.com/products/9641/CardDesignCorp.jpg',
          email: null,
          description:
            "JB Hi-Fi Gift Cards are the perfect gift no matter what the reason. You can send a Gift Card in the post or by email, however you like. Send it to the lucky recipient or to yourself.  And there's no rush because they never expire.\nPlease be assured that JB Hi-Fi will accept the use of Gift Cards for all of its products, subject to our terms and conditions.",
          howItWorks: 'redeem instruction',
          productType: 'Giftcard' as OrderProductType,
        },
      },
    },
  ],
};

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;
const mockOpenUrl = jest.fn();
const mockShowToast = jest.fn();

describe('Order Detail Screen', () => {
  beforeEach(() => {
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
    mockUseRoute.mockReturnValue({
      params: {
        name: 'jb hi fi gift card 100',
        orderDetails: fulfilledItem.orderDetails[0],
        purchaseItem: fulfilledItem.orderDetails?.[0].purchaseItems?.[0],
      },
      key: '',
      name: '',
    });
    (useToast as jest.Mock).mockReturnValue({
      show: mockShowToast,
    });
  });

  it('should render correctly', async () => {
    const { getByTestId, getByText } = render(<OrderDetailScreen />);
    expect(getByText('Gift card details')).toBeTruthy();
    expect(getByText('jb hi fi gift card 100')).toBeTruthy();
    expect(getByText('FULFILLED')).toBeTruthy();
    expect(getByText('Date of issue')).toBeTruthy();
    expect(getByText('23 Sep 2022')).toBeTruthy();
    expect(getByText('Amount')).toBeTruthy();
    expect(getByText('$100.00')).toBeTruthy();
    expect(getByText('Expiry')).toBeTruthy();
    expect(getByText('23 Oct 2022')).toBeTruthy();
    expect(getByText('Card number')).toBeTruthy();
    expect(getByText('502904030365203495')).toBeTruthy();
    expect(getByTestId('barCode-502904030365203495')).toBeTruthy();

    expect(getByText('Pin')).toBeTruthy();
    expect(getByText('3634')).toBeTruthy();
    expect(getByText('Serial number')).toBeTruthy();
    expect(getByText('3652034')).toBeTruthy();
    expect(getByText('Order ID')).toBeTruthy();
    expect(getByText('143a6814-6fcb-4d14-b9f3-101583592af7')).toBeTruthy();
    expect(getByTestId('how_to_redeem')).toBeTruthy();
    expect(getByText('Redeem gift card')).toBeTruthy();
    expect(getByText('BBF35FGD32')).toBeTruthy();
  });

  it.each`
    label
    ${'Card number'}
    ${'Pin'}
    ${'Serial number'}
    ${'Order ID'}
  `('copy content works correctly when label is $label', async ({ label }) => {
    const { getByTestId } = render(<OrderDetailScreen />);
    fireEvent.press(getByTestId(`${label}_action`));

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        event: `Click copy ${label}`,
        categoryName: 'user action',
        metaData: {
          module: 'Purchase history',
          productName: 'jb hi fi gift card 100',
          productCategory: 'Giftcard',
        },
      });
      expect(mockShowToast).toHaveBeenCalled();
    });
  });

  it('disable Redeem btn when no activation url', () => {
    mockUseRoute.mockReturnValue({
      params: {
        name: 'jb hi fi gift card 100',
        orderDetails: fulfilledItem.orderDetails[0],
        purchaseItem: {
          id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
          data: {
            issuedAt: '2022/09/23',
            pinNumber: '3634',
            cardNumber: '502904030365203495',
            serialNumber: '3652034',
            activationUrl: null,
            orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
          },
          purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
          productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
        },
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<OrderDetailScreen />);
    expect(getByText('Redeem gift card')).toBeDisabled();
  });

  it('redeem works correctly', () => {
    const { getByText } = render(<OrderDetailScreen />);

    fireEvent.press(getByText('Redeem gift card'));
    expect(mockedEventTracking).toBeCalledWith({
      event: `Click redeem giftcard`,
      categoryName: 'user action',
      metaData: {
        module: 'Purchase history',
        productName: 'jb hi fi gift card 100',
        productCategory: 'Giftcard',
      },
    });
    expect(mockOpenUrl).toBeCalledWith(
      'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506'
    );
  });

  it('how to redeem works correctly', async () => {
    const { getByTestId, getByText } = render(<OrderDetailScreen />);

    fireEvent.press(getByTestId('how_to_redeem'));
    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        event: `Click how to redeem`,
        categoryName: 'user action',
        metaData: {
          module: 'Purchase history',
          productName: 'jb hi fi gift card 100',
          productCategory: 'Giftcard',
        },
      });
      expect(getByText('redeem instruction')).toBeTruthy();
    });
  });

  it('hide rows when cardNumber or pin or serialNumber is empty', async () => {
    mockUseRoute.mockReturnValue({
      params: {
        name: 'jb hi fi gift card 100',
        orderDetails: fulfilledItem.orderDetails[0],
        purchaseItem: {
          id: 'e1c9a31e-dd2c-4928-b6db-908e73a7b528',
          data: {
            issuedAt: '2022/09/23',
            pinNumber: null,
            cardNumber: null,
            serialNumber: null,
            activationUrl:
              'https://stage.viicloud.com.au/digital/dd.aspx?c=502904030365203495&h=0x17c16840805a70de11df825997de8152192a4c461be9d170ddc0fb9e51ee3506',
            orderDetailId: 'fa37a896-93fc-4c9b-8846-cdd2a5de72af',
          },
          purchaseId: '143a6814-6fcb-4d14-b9f3-101583592af7',
          productVariantId: 'cfee754a-7bdb-4602-b5be-ffc5e456d44d',
        },
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<OrderDetailScreen />);
    expect(() => getByText('Card number')).toThrowError();
    expect(() => getByText('Pin')).toThrowError();
    expect(() => getByText('Serial number')).toThrowError();
  });

  it('should show movie tickets', async () => {
    mockUseRoute.mockReturnValue({
      params: {
        name: 'EGOLD CLASS SINGLE',
        orderDetails: {
          id: '2248',
          discount: 11.76,
          quantity: 2,
          price: 22.0,
          billableAmount: 32.24,
          transactionFee: 0.0,
          status: 'fulfilled',
          freightCost: 0.0,
          currency: 'AUD',
        },
        purchaseItem: {
          id: 'f955a8e0-0bb6-4767-bf10-cb830384703d',
          data: {
            pin: '9795',
            promoCode: '1329700\r',
            expiry: '2022-10-15',
            barCode: 'G1E703629535',
          },
          purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
          productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
          fulfill: {
            id: '775fdddb-a321-4283-971f-56c9e53740a1',
            isUsed: true,
            balance: null,
          },
        },
      },
      key: '',
      name: '',
    });

    const { getByTestId, getByText } = render(<OrderDetailScreen />);
    expect(getByText('Gift card details')).toBeTruthy();
    expect(getByText('EGOLD CLASS SINGLE')).toBeTruthy();
    expect(getByText('Voucher #')).toBeTruthy();
    expect(getByText('G1E703629535')).toBeTruthy();
    expect(getByTestId('barCode-G1E703629535')).toBeTruthy();

    expect(getByText('Promo Code')).toBeTruthy();
    expect(getByText('1329700')).toBeTruthy();
  });

  it('should show correct barcode for movie ticket', async () => {
    mockUseRoute.mockReturnValue({
      params: {
        name: 'EGOLD CLASS SINGLE',
        orderDetails: {
          id: '2248',
          discount: 11.76,
          quantity: 2,
          price: 22.0,
          billableAmount: 32.24,
          transactionFee: 0.0,
          status: 'fulfilled',
          freightCost: 0.0,
          currency: 'AUD',
        },
        purchaseItem: {
          id: 'f955a8e0-0bb6-4767-bf10-cb830384703d',
          data: {
            pin: '9795',
            promoCode: '1329700\r',
            expiry: '2022-10-15',
            barCode: 'G1E703629535',
            cardNumber: '13213123123123',
          },
          purchaseId: '45356b23-735c-459a-b4cc-6901b9cc27e7',
          productVariantId: '96ecc75a-1664-4628-8786-f6d5a33a07f8',
          fulfill: {
            id: '775fdddb-a321-4283-971f-56c9e53740a1',
            isUsed: true,
            balance: null,
          },
        },
      },
      key: '',
      name: '',
    });

    const { getByTestId, getByText } = render(<OrderDetailScreen />);

    expect(getByText('G1E703629535')).toBeTruthy();
    expect(getByTestId('barCode-G1E703629535')).toBeTruthy();
  });
});
