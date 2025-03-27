import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../common/stores/useSessionStore';

const SUPER_CONSOLIDATION_MOBULE_NAME = 'Super Consolidation';

type SuperfundData = {
  fundName?: string;
  usi?: string;
};

type SuperfundDataWithIntroContentType = SuperfundData & {
  introContentType: 'supported' | 'unsupported';
};

const useSuperConsolidationTracking = () => {
  const { eventTracking } = useMixpanel();
  return {
    clickConsolidateAdInSuperDashboardScreen: ({ fundName, usi }: SuperfundData) => {
      eventTracking({
        event: 'Click Consolidate Ad',
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SUPER_CONSOLIDATION_MOBULE_NAME,
          fundName,
          usi,
          trackingAttributes: {
            fundName,
            usi,
          },
        },
      });
    },
    clickConsolidateTileInSuperDashboardScreen: ({ fundName, usi }: SuperfundData) => {
      eventTracking({
        event: 'Click Consolidate Tile',
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SUPER_CONSOLIDATION_MOBULE_NAME,
          fundName,
          usi,
          trackingAttributes: {
            fundName,
            usi,
          },
        },
      });
    },
    clickVisitFundWebsiteInFindYourLostSuper: ({
      fundName,
      fundUrl,
      usi,
    }: SuperfundData & {
      fundUrl?: string;
    }) => {
      eventTracking({
        event: 'Click Visit Fund Website In Find Your Lost Super Screen',
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SUPER_CONSOLIDATION_MOBULE_NAME,
          fundName,
          usi,
          fundUrl,
          trackingAttributes: {
            fundName,
            usi,
            fundUrl,
          },
        },
      });
    },
    clickFindYourLostSuperInLegalAgreement: ({ fundName, usi }: SuperfundData) => {
      eventTracking({
        event: 'Click Find Your Lost Super In Legal Agreement Screen',
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SUPER_CONSOLIDATION_MOBULE_NAME,
          fundName,
          usi,
          trackingAttributes: {
            fundName,
            usi,
          },
        },
      });
    },
    clickLetGoInSuperConsolidationIntro: ({ fundName, introContentType, usi }: SuperfundDataWithIntroContentType) => {
      eventTracking({
        event: 'Click Let Go In Intro Screen',
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SUPER_CONSOLIDATION_MOBULE_NAME,
          fundName,
          introContentType,
          usi,
          trackingAttributes: {
            fundName,
            introContentType,
            usi,
          },
        },
      });
    },
    clickNotNowInSuperConsolidationIntro: ({ fundName, introContentType, usi }: SuperfundDataWithIntroContentType) => {
      eventTracking({
        event: 'Click Not Now In Intro Screen',
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: SUPER_CONSOLIDATION_MOBULE_NAME,
          fundName,
          introContentType,
          usi,
          trackingAttributes: {
            fundName,
            introContentType,
            usi,
          },
        },
      });
    },
  };
};

export { useSuperConsolidationTracking };
