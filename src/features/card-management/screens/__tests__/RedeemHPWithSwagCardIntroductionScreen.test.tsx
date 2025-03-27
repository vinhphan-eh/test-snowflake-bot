import React from 'react';
import { useRoute } from '@react-navigation/native';
import { render } from '../../../../common/utils/testing';
import { RedeemHPWithSwagCardIntroductionScreen } from '../RedeemHPWithSwagCardIntroductionScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('RedeemHPWithSwagCardIntroductionScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: { isSeenIntro: true },
      key: '',
      name: '',
    });
  });

  it('should render correctly', () => {
    const { getByLabelText } = render(<RedeemHPWithSwagCardIntroductionScreen />);

    expect(getByLabelText('Hero Points on Swag Card Intro')).toBeTruthy();
  });
});
