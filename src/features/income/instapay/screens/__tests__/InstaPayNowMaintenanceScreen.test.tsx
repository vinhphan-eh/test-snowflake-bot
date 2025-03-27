import React from 'react';
import { mockedGoBack } from '../../../../../../__mocks__/react-navigation';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { InstaPayNowMaintenanceScreen } from '../InstaPayNowMaintenanceScreen';

describe(InstaPayNowMaintenanceScreen, () => {
  it('should go back when hit close', async () => {
    const { findByTestId } = render(<InstaPayNowMaintenanceScreen />);

    const closeButton = await findByTestId('instapay-now-maintenance-close-button');
    fireEvent.press(closeButton);

    expect(mockedGoBack).toBeCalled();
  });
});
