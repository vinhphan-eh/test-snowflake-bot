import { useMixpanel } from '../../../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../../../common/stores/useSessionStore';

const eventPrefix = 'mobile#megadeal';
const moduleName = 'Megadeal Carousel';

export default () => {
  const { eventTracking } = useMixpanel();
  return {
    trackClickSkip: () => {
      eventTracking({
        event: `${eventPrefix}#Click Skip`,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: moduleName,
        },
      });
    },
    trackClickNext: () => {
      eventTracking({
        event: `${eventPrefix}#Click Next`,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: moduleName,
        },
      });
    },
    trackClickLetGo: () => {
      eventTracking({
        event: `${eventPrefix}#Click Let's Go`,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: moduleName,
        },
      });
    },
  };
};
