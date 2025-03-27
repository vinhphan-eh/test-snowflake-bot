import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { renderHook } from '../../../../../common/utils/testing';
import { useBillStreamingWaitlistStore } from '../../stores/useBillStreamingWaitlistStore';
import { useBillStreamingWaitlistPermission } from '../useBillStreamingWaitlistPermission';
import { useTriggerBillStreamWaitlistPopup } from '../useTriggerBillStreamWaitlistPopup';

const mockUseBillStreamingWaitlistPermission = useBillStreamingWaitlistPermission as jest.MockedFn<
  typeof useBillStreamingWaitlistPermission
>;

jest.mock('../useBillStreamingWaitlistPermission');

describe('useTriggerBillStreamWaitlistPopup', () => {
  it.each`
    hydrate  | haveShownPopup | havePermission | shouldNavigate
    ${true}  | ${true}        | ${true}        | ${false}
    ${true}  | ${false}       | ${true}        | ${true}
    ${true}  | ${true}        | ${false}       | ${false}
    ${true}  | ${undefined}   | ${true}        | ${true}
    ${true}  | ${undefined}   | ${false}       | ${false}
    ${false} | ${false}       | ${true}        | ${false}
  `('should open bill management waitlist correctly', ({ havePermission, haveShownPopup, hydrate, shouldNavigate }) => {
    const waitlistStore = renderHook(() => useBillStreamingWaitlistStore());
    waitlistStore.result.current.haveShownPopup = haveShownPopup;
    waitlistStore.result.current.hasHydrate = hydrate;

    mockUseBillStreamingWaitlistPermission.mockReturnValue({
      havingPermission: havePermission,
    });

    renderHook(() => useTriggerBillStreamWaitlistPopup());

    if (shouldNavigate) {
      expect(mockedNavigate).toBeCalledWith('BillStreamWaitlist', {
        screen: 'BillStreamWaitlistIntro',
      });
    } else {
      expect(mockedNavigate).not.toBeCalledWith('BillStreamWaitlist', {
        screen: 'BillStreamWaitlistIntro',
      });
    }
  });
});
