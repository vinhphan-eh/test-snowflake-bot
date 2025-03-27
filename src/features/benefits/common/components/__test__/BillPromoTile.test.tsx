import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, renderHook } from '../../../../../common/utils/testing';
import { Pid } from '../../../../../new-graphql/generated';
import { useBillManagementStore } from '../../../bill-streaming/stores/useBillManagementStore';
import { BillPromoTile } from '../BillPromoTile';

describe('WaitlistSignupCaro2', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <BillPromoTile
        title="Enjoy up to 12 weeks free!"
        subTitle="ahm health insurance"
        bannerUrl=""
        providerId={Pid.Ahm}
        offerId="1"
      />
    );

    expect(getByText('Enjoy up to 12 weeks free!')).toBeTruthy();
    expect(getByText('ahm health insurance')).toBeTruthy();
    expect(getByTestId('promote_background_image')).toBeTruthy();
  });

  it('should navigate correctly when pressed', () => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowAhmDisclaimer = false;
    billManagementStore.result.current.hasHydrate = true;
    const { getByTestId } = render(
      <BillPromoTile
        title="Enjoy up to 12 weeks free!"
        subTitle="ahm health insurance"
        bannerUrl=""
        testID="ahm-promote"
        providerId={Pid.Ahm}
        offerId="2"
      />
    );
    fireEvent.press(getByTestId('ahm-promote'));
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'BillStreamStack',
      params: {
        screen: 'BillOfferDetailScreen',
        params: {
          offerId: '2',
          onBackToBill: expect.any(Function),
        },
      },
    });
  });
});
