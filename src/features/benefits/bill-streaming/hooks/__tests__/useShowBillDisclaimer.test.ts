import { renderHook } from '../../../../../common/utils/testing';
import { Pid } from '../../../../../new-graphql/generated';
import { useBillManagementStore } from '../../stores/useBillManagementStore';
import { useShowBillDisclaimer } from '../useShowBillDisclaimer';

describe('useShowBillDisclaimer', () => {
  it.each`
    isShow   | expected
    ${true}  | ${true}
    ${false} | ${false}
  `('should ahm disclaimer correctly', ({ expected, isShow }) => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowAhmDisclaimer = isShow;
    billManagementStore.result.current.hasHydrate = expected;

    const showBillDisclaimer = renderHook(() => useShowBillDisclaimer());
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.Ahm)).toBe(expected);

    showBillDisclaimer.result.current.setShowDisclaimer(Pid.Ahm, !isShow);
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.Ahm)).toBe(!expected);
  });

  it.each`
    isShow   | expected
    ${true}  | ${true}
    ${false} | ${false}
  `('should medibank disclaimer correctly', ({ expected, isShow }) => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowMedibankDislaimer = isShow;
    billManagementStore.result.current.hasHydrate = expected;

    const showBillDisclaimer = renderHook(() => useShowBillDisclaimer());
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.Medibank)).toBe(expected);

    showBillDisclaimer.result.current.setShowDisclaimer(Pid.Medibank, !isShow);
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.Medibank)).toBe(!expected);
  });

  it.each`
    isShow   | expected
    ${true}  | ${true}
    ${false} | ${false}
  `('should engie disclaimer correctly', ({ expected, isShow }) => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowENGIEDisclaimer = isShow;
    billManagementStore.result.current.hasHydrate = expected;

    const showBillDisclaimer = renderHook(() => useShowBillDisclaimer());
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.SimplyEnergy)).toBe(expected);

    showBillDisclaimer.result.current.setShowDisclaimer(Pid.SimplyEnergy, !isShow);
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.SimplyEnergy)).toBe(!expected);
  });

  it.each`
    isShow   | expected
    ${true}  | ${true}
    ${false} | ${false}
  `('should fitness first disclaimer correctly', ({ expected, isShow }) => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowFitnessFirstDisclaimer = isShow;
    billManagementStore.result.current.hasHydrate = expected;

    const showBillDisclaimer = renderHook(() => useShowBillDisclaimer());
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.FitnessFirst)).toBe(expected);

    showBillDisclaimer.result.current.setShowDisclaimer(Pid.FitnessFirst, !isShow);
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.FitnessFirst)).toBe(!expected);
  });

  it.each`
    isShow   | expected
    ${true}  | ${true}
    ${false} | ${false}
  `('should goodlife health clubs disclaimer correctly', ({ expected, isShow }) => {
    const billManagementStore = renderHook(() => useBillManagementStore());
    billManagementStore.result.current.isShowGoodlifeHealthClubsDisclaimer = isShow;
    billManagementStore.result.current.hasHydrate = expected;

    const showBillDisclaimer = renderHook(() => useShowBillDisclaimer());
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.GoodlifeHealthClubs)).toBe(expected);

    showBillDisclaimer.result.current.setShowDisclaimer(Pid.GoodlifeHealthClubs, !isShow);
    expect(showBillDisclaimer.result.current.isShowDisclaimer(Pid.GoodlifeHealthClubs)).toBe(!expected);
  });
});
