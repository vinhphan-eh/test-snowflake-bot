import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { PAYSLIPS_EXPERIMENT_MODULE, TRACK_VISIT_BUDGETING_INTRO_SCREEN } from '../constants';

export const useTrackPayslipsExperiment = () => {
  const { eventTracking } = useMixpanel();

  const trackVisitBudgetingIntroScreen = (meta: { website: string; 'InstaPay Available': boolean }) =>
    eventTracking({
      event: TRACK_VISIT_BUDGETING_INTRO_SCREEN,
      categoryName: 'user action',
      metaData: {
        ...meta,
        module: PAYSLIPS_EXPERIMENT_MODULE,
      },
    });

  return {
    trackVisitBudgetingIntroScreen,
  };
};
