import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import images from '../../../../../common/assets/images';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { RecurringByDay } from '../RecurringByDay';

describe('RecurringByDay', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<RecurringByDay />);
    expect(getByTestId('schedule-by-day')).toBeTruthy();
    expect(getByText('Get paid weekly')).toBeTruthy();
    expect(getByText('Set up your custom payday')).toBeTruthy();
  });

  it('should navigate to InstaPayRecurringByDay on press', () => {
    const { getByTestId } = render(<RecurringByDay />);
    fireEvent.press(getByTestId('schedule-by-day'));
    expect(mockedNavigate).toHaveBeenCalledWith('InstaPaySchedulingStack', {
      screen: 'InstaPayRecurringByDay',
      params: {
        action: 'creation',
      },
    });
  });

  it('should have an image with the correct source', () => {
    const { getByTestId } = render(<RecurringByDay />);
    const image = getByTestId('image');
    expect(image.props.source).toEqual(images.recurringByDay);
  });
});
