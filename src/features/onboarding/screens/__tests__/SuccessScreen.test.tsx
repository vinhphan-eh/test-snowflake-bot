import React from 'react';
import type { UseQueryResult } from 'react-query';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockUseIsAccountUK } from '../../../../common/hooks/__mocks__/useIsAccountUK';
import { useShowPaySplit } from '../../../../common/hooks/useShowPaySplit';
import { fireEvent, render } from '../../../../common/utils/testing';
import * as navigateToTopTabs from '../../../../navigation/rootNavigation';
import * as useGetCurrentCardDetailsQuery from '../../../../new-graphql/generated';
import { PaySplitIntroEntryPoint } from '../../../income/pay-split/navigation/navigationTypes';
import { SuccessScreen } from '../SuccessScreen';

const mockUseShowPaySplit = useShowPaySplit as jest.MockedFunction<typeof useShowPaySplit>;
jest.mock('../../../../common/hooks/useShowPaySplit');

const setup = (prop: { isLoading?: boolean; showPaySplit?: boolean; cardId?: string }) => {
  mockUseShowPaySplit.mockReturnValue(prop.showPaySplit ?? false);
  jest.spyOn(useGetCurrentCardDetailsQuery, 'useGetCurrentCardDetailsQuery').mockReturnValue({
    data: { me: { wallet: { card: { details: { id: prop.cardId } } } } },
    isLoading: prop.isLoading ?? false,
  } as UseQueryResult);
};

mockUseIsAccountUK.mockReturnValue(false);

describe('Success Screen', () => {
  it('should render properly', () => {
    setup({ isLoading: false });
    const { getByText } = render(<SuccessScreen />);
    expect(getByText('Great, your account is set up.')).toBeTruthy();
    expect(getByText(`Now it's time to add some money to your Swag Spend account.`)).toBeTruthy();
  });

  it('should go back previous screen by clicking Next button', () => {
    setup({ isLoading: false });
    const { getByLabelText } = render(<SuccessScreen />);
    const button = getByLabelText('Next');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalled();
  });

  it('should hide next button while loading is in progress', () => {
    setup({ isLoading: true });
    const { getByTestId } = render(<SuccessScreen />);
    const button = getByTestId('success-screen-next');
    expect(button).toBeDisabled();
  });

  it('should show next button when loading finished', () => {
    setup({ isLoading: false });
    const { getByTestId } = render(<SuccessScreen />);
    const button = getByTestId('success-screen-next');
    expect(button).not.toBeDisabled();
  });

  it('should navigate to pay split when enabled', () => {
    setup({ showPaySplit: true });
    const { getByTestId } = render(<SuccessScreen />);
    const button = getByTestId('success-screen-next');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('PaySplitStack', {
      screen: 'PaySplitIntro',
      params: { entryPoint: PaySplitIntroEntryPoint.OnboardingSuccessNextBtn },
    });
  });

  it('should navigate to top tab when pay split disabled and card setup complete', () => {
    setup({ cardId: 'abc' });
    const sp = jest.spyOn(navigateToTopTabs, 'navigateToTopTabs');
    const { getByTestId } = render(<SuccessScreen />);
    const button = getByTestId('success-screen-next');
    fireEvent.press(button);
    expect(sp).toBeCalledWith('income-tab');
  });

  it('should navigate to pin setup when pay split disabled and card setup incomplete', () => {
    setup({});
    const { getByTestId } = render(<SuccessScreen />);
    const button = getByTestId('success-screen-next');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('CardSetupStack', expect.anything());
  });

  it('should navigate to uk billing address when pay split disabled and card setup incomplete and account is uk', () => {
    mockUseIsAccountUK.mockReturnValue(true);
    setup({});

    const { getByTestId } = render(<SuccessScreen />);
    const button = getByTestId('success-screen-next');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('CardSetupStack', {
      screen: 'UkBillingAddress',
    });
  });
});
