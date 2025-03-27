import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { ContributedOptionScreen } from '../ContributedOptionScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('ContributedOptionScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        trackingAttributes: {
          fundName: 'Spaceship Voyager',
        },
      },
      key: '',
      name: '',
    });
  });
  it('should renders and behaves correctly', () => {
    const { getByText } = render(<ContributedOptionScreen />);
    expect(getByText('How would you like to contribute your salary towards your super?')).toBeTruthy();

    expect(getByText('Your selection will determine the calculation made on your pay slip each month.')).toBeTruthy();

    fireEvent.press(getByText('Contribute a percentage'));
    expect(mockedNavigate).toBeCalledWith('InputPercentageAmount', {
      title: 'Salary sacrifice',
      trackingAttributes: { fundName: 'Spaceship Voyager' },
    });
  });
});
