import React from 'react';
import { render } from '../../../../../../common/utils/testing';
import { mockCashbackIntroductionContentV2 } from '../../../../../../graphql/handlers/custom-mock/cashbackIntroductionContent';
import { useCashbackOnboardUserMutation } from '../../../../../../new-graphql/generated';
import { CashbackIntroductionScreen } from '../CashbackIntroductionScreen';

const mockContent = mockCashbackIntroductionContentV2;

jest.mock('../../../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../../../new-graphql/generated'),
  useCashbackOnboardUserMutation: jest.fn(),
}));

describe('Cashback Introduction Screen', () => {
  const mockUpdateCashbackOnboarding = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

    (useCashbackOnboardUserMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockUpdateCashbackOnboarding,
      isLoading: false,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<CashbackIntroductionScreen />);

    expect(getByText(mockContent.step2.heading)).toBeTruthy();
    expect(getByText(mockContent.step3.heading)).toBeTruthy();
    expect(getByText(mockContent.step1.verbiage)).toBeTruthy();

    [mockContent.step1.heading, mockContent.step2.verbiage, mockContent.step3.verbiage].forEach(str => {
      const strSplit = str.split('\n').filter(element => element);
      strSplit.forEach(val => {
        expect(getByText(val, { exact: false })).toBeTruthy();
      });
    });

    expect(getByText('Each time you shop our exclusive offers', { exact: false })).toBeTruthy();
  });
});
