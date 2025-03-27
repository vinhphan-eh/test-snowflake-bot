import React from 'react';
import { mockedNavigate } from '../../../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../../../common/utils/testing';
import { HistoryManagement } from '../HistoryManagement';

describe('HistoryManagement', () => {
  it('should render correctly', async () => {
    const { getByText } = render(<HistoryManagement onCloseBts={() => {}} />);

    expect(getByText('Earned Pay history')).toBeTruthy();
  });

  it('should navigate to history screen on clicked', async () => {
    const { getByText } = render(<HistoryManagement onCloseBts={() => {}} />);

    fireEvent.press(getByText('Earned Pay history'));

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('SupportStack', {
        screen: 'InstaPayHistory',
      });
    });
  });
});
