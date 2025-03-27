import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render, renderHook, fireEvent } from '../../../../../common/utils/testing';
import { useBillStreamingWaitlistPermission } from '../../hooks/useBillStreamingWaitlistPermission';
import { useBillStreamingWaitlistStore } from '../../stores/useBillStreamingWaitlistStore';
import { WaitlistCardCon } from '../WaitlistCardCon';

const mockUseBillStreamingWaitlistPermission = useBillStreamingWaitlistPermission as jest.MockedFn<
  typeof useBillStreamingWaitlistPermission
>;

jest.mock('../../hooks/useBillStreamingWaitlistPermission');

describe('WaitlistCardCon', () => {
  it.each`
    hasHydrate | permission | doneRegistration | visible
    ${true}    | ${true}    | ${true}          | ${false}
    ${true}    | ${true}    | ${false}         | ${true}
    ${true}    | ${false}   | ${true}          | ${false}
    ${true}    | ${false}   | ${false}         | ${false}
    ${false}   | ${true}    | ${false}         | ${false}
  `('should work correctly', ({ doneRegistration, hasHydrate, permission, visible }) => {
    mockUseBillStreamingWaitlistPermission.mockReturnValue({
      havingPermission: permission,
    });

    const waitlistStore = renderHook(() => useBillStreamingWaitlistStore());
    waitlistStore.result.current.haveDoneRegistration = doneRegistration;
    waitlistStore.result.current.hasHydrate = hasHydrate;

    const { queryByText } = render(<WaitlistCardCon />);

    if (!visible) {
      expect(queryByText('Find out more')).toBeNull();
    } else {
      expect(queryByText('Find out more')).not.toBeNull();
    }
  });

  it('should navigate correctly', () => {
    mockUseBillStreamingWaitlistPermission.mockReturnValue({
      havingPermission: true,
    });

    const waitlistStore = renderHook(() => useBillStreamingWaitlistStore());
    waitlistStore.result.current.haveDoneRegistration = false;
    waitlistStore.result.current.hasHydrate = true;

    const { getByText } = render(<WaitlistCardCon />);

    fireEvent.press(getByText('Find out more'));

    expect(mockedNavigate).toBeCalledWith('BillStreamWaitlist', {
      screen: 'BillStreamWaitlistSignup',
    });
  });
});
