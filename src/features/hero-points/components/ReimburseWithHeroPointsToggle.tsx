import React, { useEffect, useRef, useState } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography } from '@hero-design/rn';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ReimburseHPBottomSheet } from './ReimburseHPBottomSheet';
import type { BottomSheetRef } from '../../../common/components/bottom-sheet/BottomSheet';
import Toggle from '../../../common/components/toggle';
import { useSpendHPOnSwagCardVisiblity } from '../../../common/hooks/useHeroPointsVisibility';
import { useIsWalletSetupComplete } from '../../../common/hooks/useIsWalletSetupComplete';
import { queryClient } from '../../../common/libs/queryClient';
import { useToast } from '../../../common/shared-hooks/useToast';
import {
  useGetHeroPointsPaymentPreferencesQuery,
  useUpdateHeroPointsPaymentPreferencesMutation,
  type GetHeroPointsPaymentPreferencesQuery,
} from '../../../new-graphql/generated';
import { useIntl } from '../../../providers/LocalisationProvider';
import { useGetToggleThemedStyles } from '../../card-management/hooks/useGetToggleThemedStyles';

export interface ReimburseWithHeroPointsToggleProps {
  withLearnMore?: boolean;
  content: string;
  style?: StyleProp<ViewStyle>;
}

export const ReimburseWithHeroPointsToggle = ({
  content,
  style,
  withLearnMore,
}: ReimburseWithHeroPointsToggleProps) => {
  const { formatMessage } = useIntl();
  const { data: paymentPreferences, isFetched: isPaymentPreferenceSettingsFetched } =
    useGetHeroPointsPaymentPreferencesQuery();
  const { mutateAsync: updatePaymentPreferencesSettingAsync } = useUpdateHeroPointsPaymentPreferencesMutation();
  const reimburseHPbtsRef = useRef<BottomSheetRef>(null);

  const { isFetched: isWalletFetched, isWalletSetupComplete } = useIsWalletSetupComplete();
  const spendHDOnSwagCardPermission = useSpendHPOnSwagCardVisiblity();

  const [payWithHPOnSwagCard, setPayWithHPOnSwagCard] = useState(false);
  const isLoading = !isWalletFetched || !isPaymentPreferenceSettingsFetched;

  const Toast = useToast();
  const themedStyles = useGetToggleThemedStyles();

  useEffect(() => {
    const payWithHPOnSwagCardData = paymentPreferences?.me?.heroPoints?.paymentPreferences?.payWithHPOnSwagCard;

    // prevent this update when having haveOptimiseUpdate
    if (payWithHPOnSwagCardData) {
      setPayWithHPOnSwagCard(payWithHPOnSwagCardData ?? false);
    }
  }, [paymentPreferences]);

  const optimiseUpdate = async (value: boolean) => {
    await queryClient.cancelQueries(useGetHeroPointsPaymentPreferencesQuery.getKey());
    queryClient.setQueryData(
      [useGetHeroPointsPaymentPreferencesQuery.getKey()],
      (old: GetHeroPointsPaymentPreferencesQuery | undefined): GetHeroPointsPaymentPreferencesQuery => ({
        ...old,
        me: {
          heroPoints: {
            paymentPreferences: {
              ...old?.me?.heroPoints?.paymentPreferences,
              payWithHPOnSwagCard: value,
            },
          },
        },
      })
    );
  };

  const updatePaymentSetting = async (newVal: boolean) => {
    try {
      await updatePaymentPreferencesSettingAsync({
        payWithHPOnSwagCard: newVal,
      }).then(result => {
        // optimise update cache of react-query
        optimiseUpdate(result.heroPoints?.paymentPreferences?.payWithHPOnSwagCard ?? newVal);
        Toast.show({
          content: newVal ? formatMessage({ id: 'points.optedIn' }) : formatMessage({ id: 'points.optedOut' }),
          actionLabel: undefined,
          autoDismiss: true,
        });
      });
    } catch {
      // failed, return to original value
      Toast.show({
        content: formatMessage({ id: 'points.failRequest' }),
      });
    }
  };

  const onToggleChanged = (isOn: boolean) => {
    updatePaymentSetting(isOn);
  };

  if (!isWalletSetupComplete || !spendHDOnSwagCardPermission || isLoading) {
    return null;
  }

  return (
    <Box
      flexDirection="row"
      padding="medium"
      backgroundColor="decorativePrimarySurface"
      borderRadius="medium"
      style={[style]}
      justifyContent="space-between"
      alignItems="center"
    >
      <Box>
        <Typography.Body variant="regular">{content}</Typography.Body>
        {withLearnMore ? (
          <TouchableOpacity onPress={() => reimburseHPbtsRef.current?.open()}>
            <Typography.Body variant="regular" intent="info" style={{ textDecorationLine: 'underline' }}>
              {formatMessage({ id: 'common.learnMore' })}
            </Typography.Body>
          </TouchableOpacity>
        ) : null}
      </Box>
      <Toggle
        marginLeft="smallMedium"
        testID="setting_toggle"
        onChange={onToggleChanged}
        value={payWithHPOnSwagCard}
        {...themedStyles}
      />
      <ReimburseHPBottomSheet ref={reimburseHPbtsRef} />
    </Box>
  );
};
