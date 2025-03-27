import { Pid } from '../../../../new-graphql/generated';
import { useBillManagementStore } from '../stores/useBillManagementStore';

export const useShowBillDisclaimer = () => {
  const {
    isShowAhmDisclaimer,
    isShowENGIEDisclaimer,
    isShowFitnessFirstDisclaimer,
    isShowGoodlifeHealthClubsDisclaimer,
    isShowMedibankDislaimer,
    setIsShowAhmDisclaimer,
    setIsShowENGIEDisclaimer,
    setIsShowFitnessFirstDisclaimer,
    setIsShowGoodlifeHealthClubsDisclaimer,
    setIsShowMedibankDislaimer,
  } = useBillManagementStore();

  const isShowDisclaimer = (pid: Pid) => {
    switch (pid) {
      case Pid.Ahm:
        return isShowAhmDisclaimer;
      case Pid.Medibank:
        return isShowMedibankDislaimer;
      case Pid.SimplyEnergy:
        return isShowENGIEDisclaimer;
      case Pid.FitnessFirst:
        return isShowFitnessFirstDisclaimer;
      case Pid.GoodlifeHealthClubs:
        return isShowGoodlifeHealthClubsDisclaimer;
      case Pid.Unspecified:
        return false;
      default:
        return false;
    }
  };

  const setShowDisclaimer = (pid: Pid, state: boolean) => {
    switch (pid) {
      case Pid.Ahm:
        setIsShowAhmDisclaimer(state);
        break;
      case Pid.Medibank:
        setIsShowMedibankDislaimer(state);
        break;
      case Pid.SimplyEnergy:
        setIsShowENGIEDisclaimer(state);
        break;
      case Pid.FitnessFirst:
        setIsShowFitnessFirstDisclaimer(state);
        break;
      case Pid.GoodlifeHealthClubs:
        setIsShowGoodlifeHealthClubsDisclaimer(state);
        break;
      default:
        break;
    }
  };

  return {
    isShowDisclaimer,
    setShowDisclaimer,
  };
};
