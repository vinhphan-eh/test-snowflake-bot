import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { renderHook } from '../../../../common/utils/testing';
import { useSalarySacrificeNavigation } from '../useSalarySacrificeNavigation';

describe('useSalarySacrificeNavigation', () => {
  it('should work properly when toggle is off', async () => {
    const {
      result: { current },
    } = renderHook(() => useSalarySacrificeNavigation({ fundName: 'mockFund', usi: 'mockUsi' }));

    current.navigateToSalarySacrifice();

    expect(mockedNavigate).toBeCalledWith('SuperStack', {
      screen: 'SalarySacrificeStack',
      params: {
        screen: 'SalarySacrificeIntro',
        params: {
          trackingAttributes: {
            fundName: 'mockFund',
            usi: 'mockUsi',
          },
        },
      },
    });
  });
});
