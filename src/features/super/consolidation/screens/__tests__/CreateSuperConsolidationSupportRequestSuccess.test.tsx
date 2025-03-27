import React from 'react';
import { useRoute } from '@react-navigation/native';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { CreateSuperConsolidationSupportRequestSuccessScreen } from '../CreateSuperConsolidationSupportRequestSuccess';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('CreateSuperConsolidationSupportRequestSuccessScreen', () => {
  it('should render correctly', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        fundName: 'super',
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<CreateSuperConsolidationSupportRequestSuccessScreen />);

    expect(getByText('We’ve received your feature request!')).toBeTruthy();
    expect(getByText(`Next time we talk to super, we’ll inform them that you want this feature.`)).toBeTruthy();

    expect(getByText('Done')).toBeTruthy();
    fireEvent.press(getByText('Done'));
    expect(mockNavigateToTopTabs).toBeCalledWith('super-tab');
  });
});
