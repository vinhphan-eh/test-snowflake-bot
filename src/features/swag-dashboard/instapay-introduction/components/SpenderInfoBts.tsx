import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { CustomBottomSheetView } from '../../../../common/components/bottom-sheet/CustomBottomSheetView';
import { InlineTextLink } from '../../../../common/components/inline-text-link';
import useBrandName from '../../../../common/hooks/useBrandName';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { AGM_URL, FINANCE_RESEARCH_URL, REBRAND_FINANCE_RESEARCH_URL } from '../../constants';

type SpenderInfoBtsProps = {
  btsRef: React.RefObject<BottomSheetRef>;
};

export const SpenderInfoBts = ({ btsRef }: SpenderInfoBtsProps) => {
  const Intl = useIntl();
  const { openUrl } = useInAppBrowser();
  const brandNameText = useBrandName();
  const isRebrand = useSessionStore().swagTextAndImageRebrandEnabled;

  return (
    <CustomBottomSheetView
      bsRef={btsRef}
      icon="cancel"
      iconSize="xsmall"
      content={() => (
        <Box paddingHorizontal="large" paddingBottom="medium">
          <Typography.Body testID="content-text" variant="regular">
            {Intl.formatMessage(
              { id: 'instapay.introduction.spenderBts.content' },
              {
                research: (
                  <InlineTextLink
                    onPress={() => openUrl(isRebrand ? REBRAND_FINANCE_RESEARCH_URL : FINANCE_RESEARCH_URL)}
                    variant="regular"
                  >
                    research
                  </InlineTextLink>
                ),
                AGM: (
                  <InlineTextLink onPress={() => openUrl(AGM_URL)} variant="regular">
                    Australian Government MoneySmart
                  </InlineTextLink>
                ),
                brandName: brandNameText,
              }
            )}
          </Typography.Body>
        </Box>
      )}
      actions={[
        {
          title: Intl.formatMessage({ id: 'common.gotIt' }),
          onPress: () => btsRef.current?.close(),
          testID: 'got-it-btn',
        },
      ]}
      title={Intl.formatMessage({ id: 'instapay.introduction.spenderBts.title' })}
    />
  );
};
