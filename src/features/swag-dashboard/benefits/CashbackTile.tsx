import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Typography, useTheme, Box } from '@hero-design/rn';
import type { BenefitsItemType } from './constants';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory, useSessionStore } from '../../../common/stores/useSessionStore';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import { SWAG_DASHBOARD_HEIGHT, SWAG_DASHBOARD_WIDTH } from '../constants';

const eventPrefix = 'mobile#tile#cashback';
const moduleName = 'Swag dashboard tiles';

export const CashbackTile = ({ action, content, title }: Omit<BenefitsItemType, 'type'>) => {
  const { space } = useTheme();
  const setPillar = useSessionStore(state => state.setPillar);
  const { eventTracking } = useMixpanel();

  return (
    <ThemeSwitcher name="eBens">
      <TouchableOpacity
        accessibilityLabel={`${title} card`}
        onPress={() => {
          setPillar?.('BenefitsApp');
          action();
          eventTracking({
            event: `${eventPrefix}#${title}`,
            categoryName: EventTrackingCategory.USER_ACTION,
            metaData: {
              module: moduleName,
            },
          });
        }}
      >
        <Box
          borderRadius="large"
          backgroundColor="decorativePrimarySurface"
          style={{
            width: SWAG_DASHBOARD_WIDTH,
            height: SWAG_DASHBOARD_HEIGHT,
          }}
        >
          <Box flex={1} paddingHorizontal="medium" paddingTop="small" paddingBottom="medium">
            <Typography.Caption intent="primary" style={{ marginBottom: space.small }}>
              Cashback offer
            </Typography.Caption>
            <Box flexGrow={1} />
            <Typography.Body variant="regular-bold" typeface="playful" style={{ marginBottom: space.small }}>
              {title}
            </Typography.Body>
            <Typography.Caption>{content}</Typography.Caption>
          </Box>
        </Box>
      </TouchableOpacity>
    </ThemeSwitcher>
  );
};
