import React from 'react';
import { Box, useTheme } from '@hero-design/rn';
import { ExperimentEntry } from '../../../../common/components/experiment/ExperimentEntry';
import { PillarIds, WalletTabKeys } from '../../../../common/constants/navigation';
import { switchPillar } from '../../../../common/stores/useMiniAppSwitcherStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { LocaleMessageID } from '../../../../providers/LocalisationProvider/constants';
import { InstaPaySuccessScreenAdTile } from '../../instapay/components/InstapaySuccessScreenAdTile';
import { InstaPaySchedulingAdCTAVersion } from '../constants';
import { useInstaPaySchedulingEventTracking } from '../hooks/useInstaPaySchedulingEventTracking';
import { useInstaPaySchedulingStore } from '../stores/useInstaPaySchedulingStore';

export type InstaPaySchedulingAdCTAVersionType = `${InstaPaySchedulingAdCTAVersion}`;
type VersionProps = {
  captionKey: LocaleMessageID;
  subCaptionKey: LocaleMessageID;
  actionButtonText?: LocaleMessageID;
};

export const InstaPaySchedulingAdCTA = ({ version }: { version: InstaPaySchedulingAdCTAVersionType }) => {
  const { colors, space } = useTheme();
  const { formatMessage } = useIntl();
  const { setNavigatedFromCTA } = useInstaPaySchedulingStore();
  const { trackUserClickedOnSchedulingCTA } = useInstaPaySchedulingEventTracking();

  const versionProps = {
    MenuScreenOnError: {
      captionKey: 'instapay.scheduling.adCTA.versions.menuScreenError.caption',
      subCaptionKey: 'instapay.scheduling.adCTA.versions.menuScreenError.subtitle',
    },
    SuccessScreen: {
      captionKey: 'instapay.scheduling.adCTA.versions.successScreen.caption',
      subCaptionKey: 'instapay.scheduling.adCTA.versions.successScreen.subtitle',
      actionButtonText: 'instapay.scheduling.adCTA.versions.successScreen.actionButtonText',
    },
  } as Record<InstaPaySchedulingAdCTAVersionType, VersionProps>;
  const currentVersionProps = versionProps[version];

  const onNavigation = () => {
    setNavigatedFromCTA(true);
    trackUserClickedOnSchedulingCTA({ version });
    switchPillar({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.INCOME,
      },
    });
  };

  if (version === InstaPaySchedulingAdCTAVersion.MENU_SCREEN_ON_ERROR) {
    return (
      <Box
        flex={1}
        style={{
          width: '100%',
        }}
      >
        <ExperimentEntry
          style={{ marginTop: space.medium }}
          backgroundColor={colors.infoSurface}
          testID="instapay-scheduling-ad-cta"
          thumbnailName="instapaySchedulingAdCta"
          title={formatMessage({ id: currentVersionProps.captionKey })}
          description={formatMessage({ id: currentVersionProps.subCaptionKey })}
          onPress={onNavigation}
          showArrow
        />
      </Box>
    );
  }

  return (
    <InstaPaySuccessScreenAdTile
      caption={formatMessage({ id: currentVersionProps.captionKey })}
      content={formatMessage({ id: currentVersionProps.subCaptionKey })}
      navigationButtonText={formatMessage({ id: currentVersionProps.actionButtonText })}
      onPressed={onNavigation}
      testID="instapay-scheduling-ad-cta"
    />
  );
};
