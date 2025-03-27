import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render, renderHook, waitFor } from '../../../../../common/utils/testing';
import type { GetBmOfferDetailQuery, GetCurrentUserQuery } from '../../../../../new-graphql/generated';
import { Currency, Pid, useGetBmOfferDetailQuery, useGetCurrentUserQuery } from '../../../../../new-graphql/generated';
import { aBmOffer } from '../../../../../new-graphql/mocks/generated-mocks';
import { mockUseBillPromotionPermission } from '../../hooks/__mocks__/useBillPromotionPermission';
import { useBillManagementOfferStore } from '../../stores/useBillManagementOfferStore';
import { BillOfferDetailScreen } from '../BillOfferDetailScreen';

const mockUseGetBmOfferDetailQuery = useGetBmOfferDetailQuery as unknown as jest.Mock<
  MockQueryResult<GetBmOfferDetailQuery>
>;
(mockUseGetBmOfferDetailQuery as unknown as { getKey: () => string }).getKey = jest.fn();

const mockUseCurrentUserQuery = useGetCurrentUserQuery as unknown as jest.Mock<MockQueryResult<GetCurrentUserQuery>>;
(mockUseCurrentUserQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../new-graphql/generated'),
  useGetBmOfferDetailQuery: jest.fn(),
  useGetCurrentUserQuery: jest.fn(),
}));

const mockTracking = jest.fn();
const mockTrackingSignUp = jest.fn();
jest.mock('../../hooks/useBenefitsBillMgmtTracking', () => ({
  useBenefitsBillMgmtTracking: () => ({
    trackVisitBillOfferDetail: mockTracking,
    trackClickOnSignUp: mockTrackingSignUp,
    trackSelectStateToViewSEOffer: jest.fn(),
  }),
}));

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const engineOffer = aBmOffer({
  id: '1',
  title: 'Shrink your energy bill with Swag',
  description:
    'When you sign up to ENGIE you’ll get simplicity and value:\n\t<ul>\n\t\t<li>An exclusive pay on time discount to help save on bills.</li>\n\t\t<li>Discounts off energy usage and supply charges</li>\n\t\t<li>Carbon neutral energy, it’s not an option or add-on you’ll need to activate.</li>\n\t\t<li>No lock-in contracts and zero exit fees.</li>\n\t\t<li>Access to the MyENGIE app to manage your energy.</li>\n\t</ul>',
  howItWorks:
    'All you need to do is:\n\t<ul>\n\t\t<li>Click on sign up and complete the onboarding process with ENGIE.</li>\n\t\t<li>Sit tight while your application is being processed.</li>\n\t\t<li>Once approved, view and manage your bills in the Money pillar bill management tab.</li>\n\t</ul>',
  about:
    'ENGIE offers great value electricity, gas, and solar power plans, with carbon neutral energy plans that can help offset the environmental impact from the energy used. We are now powering over 650,000 customer accounts around the country. ENGIE operates in over 30 countries. We’re using this global experience, technology and buying power to innovate locally and grow the services we offer Australians.',
  termsAndConditions:
    'ENGIE offer <a href="https://engie.com.au/help-centre/policies-and-commitments/market-contract-terms">terms and conditions</a> apply.<br/>\n\t\t<br/><br/>\n\t\tPlease note that the Swag savings discount is only given if you pay on time (within 14 days of receiving the bill).',
  savingPercentage: 5,
  signUpLink: 'https://stage.engie.com.au/residential/product/employment-hero',
  logoUrl: 'https://i.ibb.co/mDZLQTF/ENGIE-Logo.png',
  imageUrl: 'https://i.ibb.co/fYCYLLs/se-cover.png',
  registrationStatus: null,
  canSignUp: null,
  termsAndCondition: null,
  provider: {
    id: Pid.SimplyEnergy,
    name: 'ENGIE',
    faq: null,
    contactInfo: null,
    paymentUrl: null,
    logoUrl: 'https://i.ibb.co/mDZLQTF/ENGIE-Logo.png',
  },
  paidAmount: {
    amount: 95,
    currency: Currency.Aud,
  },
  estBillAmount: {
    amount: 100,
    currency: Currency.Aud,
  },
  stateBasedOffers: [
    {
      state: 'NSW',
      combinedDiscount: 18.3,
      offerExplaination:
        'In the AusGrid network and on a single rate tariff the annual electricity reference price for an average residential customer is $1827. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nIn the Ausgrid network and on your electricity tariff type the annual electricity reference price for an average residential customer is $1827. We estimate that an average residential customer in Ausgrid with a usage of 3911kWh in the first 12 months on this energy plan would pay $1391 on this SWAG Offer if you pay your bills on time, or $1464 if you don’t, based on the rates for DomSingle - Peak Only. This estimate includes GST and any conditional discounts or credits. Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to NSW residential customers on this tariff.',
      tiles: [
        {
          content: 'Unlock a 14% discount off',
          subContent: 'the electricity reference price',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
        {
          content: 'You’ll also get a',
          subContent: '$200 credit for joining',
        },
      ],
    },
    {
      state: 'VIC',
      combinedDiscount: 32.55,
      offerExplaination:
        'In the CitiPower network and on a single rate tariff the annual electricity reference price for an average residential customer is $1570. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nThis offer equates to 27% off the VDO as at 1 July 2023. We estimate that an average residential customer in CitiPower with a usage of 4000kWh in the first 12 months on this energy plan would pay $1145 on this SWAG Offer if you pay your bills on time, or $1206 if you don’t, based on the rates for GDGR- Peak Only|CL - Controlled Only. This estimate includes GST and includes the discount off our usage and supply charges (not the VDO). Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to Victorian residential customers on this tariff. The Victorian Default Market Offer for your network and tariff is $1570 as at 1 July 2023.',
      tiles: [
        {
          content: 'Unlock a 29% discount off',
          subContent: 'the Victorian electricity default offer',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
        {
          content: 'You’ll also get a',
          subContent: '$200 credit for joining',
        },
      ],
    },
    {
      state: 'QLD',
      combinedDiscount: 23.05,
      offerExplaination:
        'In your network and on a single rate tariff the annual electricity reference price for an average residential customer is $1969. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nIn your network and on your tariff type the annual electricity reference price for an average residential customer is $1969. We estimate that an average residential customer in Energex with a usage of 4613kWh in the first 12 months on this energy plan would pay $1796 on this SWAG Offer if you pay your bills on time, or $1890 if you don’t, based on the rates for T11 - Peak. This estimate includes GST and any conditional discounts or credits. Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to QLD residential customers on this tariff.',
      tiles: [
        {
          content: 'Unlock a 19% discount off',
          subContent: 'the electricity reference price',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
      ],
    },
    {
      state: 'SA',
      combinedDiscount: 13.55,
      offerExplaination:
        'In your network and on a single rate tariff the annual electricity reference price for an average residential customer is $2279. The electricity reference price for this offer only applies to single rate tariffs. If you have a time of use, controlled load or demand tariff, please call us on 1800 090 836.\\nIn your network and on your electricity tariff type the annual electricity reference price for an average residential customer is $2279. We estimate that an average residential customer in SA Power Networks with a usage of 4011kWh in the first 12 months on this energy plan would pay $1967 on this SWAG Offer if you pay your bills on time, or $2070 if you don’t, based on the rates for 110 - Peak Only|Off Peak Controlled Load 116. This estimate includes GST and any conditional discounts or credits. Your actual bills may differ depending on your actual usage and any future price changes. This offer only applies to SA residential customers on this tariff.',
      tiles: [
        {
          content: 'Unlock a 9% discount off',
          subContent: 'the electricity reference price',
        },
        {
          content: 'Additional 5% discount',
          subContent: 'when you pay your bills on time',
        },
        {
          content: 'You’ll also get a',
          subContent: '$100 credit for joining',
        },
      ],
    },
  ],
});
const mockGetBmOfferQueryData = {
  me: {
    billManagement: {
      offerV2: engineOffer,
    },
  },
};

describe('BillOfferDetailScreen', () => {
  beforeEach(() => {
    const store = renderHook(() => useBillManagementOfferStore());
    store.result.current.currentState = 'NSW';
    mockUseBillPromotionPermission.mockReturnValue({ havingPermission: false, isFetched: true });

    mockUseCurrentUserQuery.mockReturnValue({
      data: {
        me: {
          details: {
            email: 'test@gmail.com',
          } as never,
        },
      },
      isError: false,
      isLoading: false,
    });
    mockUseGetBmOfferDetailQuery.mockReturnValue({
      data: mockGetBmOfferQueryData,
    });
    mockedUseRoute.mockReturnValue({
      params: { data: engineOffer },
      key: '',
      name: '',
    });
  });
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<BillOfferDetailScreen />);

    expect(getByText(engineOffer.title)).toBeTruthy();
    expect(getByText('ENGIE')).toBeTruthy();
    expect(getByText('Electricity & Gas')).toBeTruthy();
    expect(getByText('Description')).toBeTruthy();
    expect(getByText('How it works')).toBeTruthy();
    expect(getByText('Terms & conditions')).toBeTruthy();
    expect(getByText('About ENGIE')).toBeTruthy();
    expect(getByText('Shrink your energy bill with Swag')).toBeVisible();
    expect(getByText('the electricity reference price')).toBeVisible();
    expect(getByTestId('bill_offer_cover_image')).toBeVisible();
    expect(getByTestId('bill_offer_logo')).toBeVisible();
  });

  it('can go back correctly', () => {
    const { getByTestId } = render(<BillOfferDetailScreen />);
    fireEvent.press(getByTestId('topbar-back-icon'));
    expect(mockedGoBack).toBeCalled();
  });

  it('should track page visit', async () => {
    render(<BillOfferDetailScreen />);

    await waitFor(() => {
      expect(mockTracking).toBeCalledWith('ENGIE');
    });
  });

  it('should track click on sign up when signing up with ENGIE', async () => {
    const { getByText } = render(<BillOfferDetailScreen />);

    fireEvent.press(getByText('View Offer'));

    await waitFor(() => {
      expect(mockTrackingSignUp).toBeCalledWith(engineOffer.signUpLink, 'ENGIE');
    });
  });

  it('should hide sign up if does not have email', () => {
    mockUseCurrentUserQuery.mockReturnValue({
      data: {
        me: {
          details: {
            email: '',
          } as never,
        },
      },
      isError: false,
      isLoading: false,
    });
    const { queryByTestId } = render(<BillOfferDetailScreen />);

    expect(queryByTestId('bill-offer-view-offer')).toBeNull();
  });

  it('should hide sign up if is loading user data', () => {
    mockUseCurrentUserQuery.mockReturnValue({
      data: {
        me: {
          details: {
            email: 'test@gmail.com',
          } as never,
        },
      },
      isError: false,
      isLoading: true,
    });
    const { queryByTestId } = render(<BillOfferDetailScreen />);

    expect(queryByTestId('bill-offer-view-offer')).toBeNull();
  });

  it('should hide sign up if is error', () => {
    mockUseCurrentUserQuery.mockReturnValue({
      data: {
        me: {
          details: {
            email: 'test@gmail.com',
          } as never,
        },
      },
      isError: true,
      isLoading: false,
    });
    const { queryByTestId } = render(<BillOfferDetailScreen />);

    expect(queryByTestId('bill-offer-view-offer')).toBeNull();
  });

  it('should hide sign up if signup link is empty', () => {
    mockUseGetBmOfferDetailQuery.mockReturnValue({
      data: {
        me: {
          billManagement: {
            offerV2: { ...engineOffer, signUpLink: '' } as never,
          },
        },
      },
    });
    mockUseCurrentUserQuery.mockReturnValue({
      data: {
        me: {
          details: {
            email: 'test@gmail.com',
          } as never,
        },
      },
      isError: false,
      isLoading: false,
    });
    const { queryByTestId } = render(<BillOfferDetailScreen />);

    expect(queryByTestId('bill-offer-view-offer')).toBeNull();
  });

  it('should select state based offer correctly', () => {
    const store = renderHook(() => useBillManagementOfferStore());
    store.result.current.currentState = null;
    mockUseCurrentUserQuery.mockReturnValue({
      data: {
        me: {
          details: {
            email: 'test@gmail.com',
          } as never,
        },
      },
      isError: true,
      isLoading: false,
    });
    const { getByTestId, getByText } = render(<BillOfferDetailScreen />);

    // Should show state based select when currentState null
    expect(getByTestId('bottom-sheet-state-based-select')).toBeVisible();
    expect(getByText('NSW')).toBeVisible();
    expect(getByText('VIC')).toBeVisible();
    expect(getByText('SA')).toBeVisible();

    // Choose state based offer
    fireEvent.press(getByText('NSW'));
    expect(getByText('Shrink your energy bill with Swag')).toBeVisible();

    // Change other state based offer
    fireEvent.press(getByTestId('state-based-btn'));
    fireEvent.press(getByText('VIC'));
    expect(getByText('Unlock a 29% discount off')).toBeVisible();
  });
});
