import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { GeneralErrorScreen } from '../GeneralErrorScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('General Error Screen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({ params: {}, key: '', name: '' });
  });

  it('should render properly', () => {
    const { getByText } = render(<GeneralErrorScreen />);
    expect(getByText("We're sorry, something's gone wrong")).toBeTruthy();
    expect(getByText('Please try again later')).toBeTruthy();
  });

  it('should go back previous screen by clicking Close button', () => {
    const { getByText } = render(<GeneralErrorScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should invoke callback if there is a callback in params', () => {
    const closeCallback = jest.fn();
    mockedUseRoute.mockReturnValueOnce({ params: { closeCallback }, key: '', name: '' });

    const { getByText } = render(<GeneralErrorScreen />);
    const button = getByText('Close');
    fireEvent.press(button);
    expect(closeCallback).toBeCalled();
  });

  it('should render and invoke callback properly for secondary CTA', () => {
    const mockSecondaryCTACallback = jest.fn();
    mockedUseRoute.mockReturnValue({
      params: {
        secondaryCtaText: 'Secondary CTA',
        secondaryCtaCallback: mockSecondaryCTACallback,
      },
      key: '',
      name: '',
    });

    const { getByText } = render(<GeneralErrorScreen />);
    const button = getByText('Secondary CTA');
    fireEvent.press(button);
    expect(mockSecondaryCTACallback).toBeCalled();
  });
});
