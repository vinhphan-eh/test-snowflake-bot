import React from 'react';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { StateBasedSelect } from '../StateBasedSelect';

describe('WaitlistCard', () => {
  it('should render correctly', () => {
    const { getByText } = render(<StateBasedSelect stateOptions={['NSW', 'VIC', 'QLD', 'SA']} />);

    expect(getByText('NSW')).toBeTruthy();
    expect(getByText('VIC')).toBeTruthy();
    expect(getByText('QLD')).toBeTruthy();
    expect(getByText('SA')).toBeTruthy();

    fireEvent.press(getByText('NSW'));

    expect(mockedEventTracking).toBeCalledWith({
      categoryName: 'user action',
      event: 'Select a state to view SE offer',
      metaData: {
        module: 'Bill Mgmt',
        promotion: '',
        state: 'NSW',
      },
    });
  });
});
