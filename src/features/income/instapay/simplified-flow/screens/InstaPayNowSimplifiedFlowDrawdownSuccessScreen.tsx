import React from 'react';
import { Box, Button, Spinner, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../../common/components/outcome-template/OutcomeTemplate';
import { useIsAccountAU } from '../../../../../common/hooks/useIsAccountAU';
import { useIsAccountUK } from '../../../../../common/hooks/useIsAccountUK';
import { useIsWalletSetupComplete } from '../../../../../common/hooks/useIsWalletSetupComplete';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { navigateToTopTabs } from '../../../../../navigation/rootNavigation';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useConditionalNavigateOnboardingFlow } from '../../../../spend-account/hooks/useConditionalNavigateOnboardingFlow';
import { InstaPaySchedulingAdCTA } from '../../../instapay-scheduling/components/InstaPaySchedulingAdCTA';
import { InstaPaySchedulingAdCTAVersion } from '../../../instapay-scheduling/constants';
import { useInstaPaySchedulingStore } from '../../../instapay-scheduling/stores/useInstaPaySchedulingStore';
import { InstaPayDrawdownSurveyCTA } from '../../components/InstaPayDrawdownSurveyCTA';
import { InstaPaySuccessScreenAdTile } from '../../components/InstapaySuccessScreenAdTile';
import type { InstaPayRouteProp, InstaPayScreenNavigationProp } from '../../navigation/navigationTypes';
import { useInstapayNowSimplifiedFlowStore } from '../../stores/useInstapayNowSimplifiedFlowStore';

const REQUEST_INSTAPAY_EVENT = 'requestinstapay';

export const InstaPayNowSimplifiedFlowDrawdownSuccessScreen = () => {
  const handleFeedbackPrompt = useSessionStore(state => state.handleFeedbackPrompt);
  const route = useRoute<InstaPayRouteProp<'InstaPaySimplifiedFlowDrawdownSuccess'>>() || {};
  const navigation = useNavigation<InstaPayScreenNavigationProp<'InstaPaySimplifiedFlowDrawdownSuccess'>>();
  const { version } = route.params || 2;
  const isInstapay2Alpha = version === 2;
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const isAU = useIsAccountAU();
  const isUK = useIsAccountUK();

  const { isFetched: isWalletSetupCompleteFetched, isWalletSetupComplete } = useIsWalletSetupComplete();
  const { shouldShowSSAAdTile } = useInstapayNowSimplifiedFlowStore();
  const { shouldShowCTA: shouldShowSchedulingCTA } = useInstaPaySchedulingStore();
  const shouldShowDrawdownSurveyCTA = isUK;
  const { isLoading: isLoadingOnboarding, nextScreenNavigateParams } = useConditionalNavigateOnboardingFlow()();

  const onPressedMaybeLater = () => {
    handleFeedbackPrompt?.(REQUEST_INSTAPAY_EVENT);
    navigateToTopTabs('income-tab');
  };

  const onPressedOpenNow = () => {
    if (nextScreenNavigateParams) {
      navigation.navigate(...nextScreenNavigateParams);
    } else {
      navigation.navigate('OnboardingStack', { screen: 'Dashboard' });
    }
  };

  const title = isInstapay2Alpha
    ? formatMessage({
        id: 'instapay.drawdown-success.version2.title',
      })
    : formatMessage({
        id: 'instapay.drawdown-success.version1.title',
      });
  const content = isInstapay2Alpha
    ? formatMessage({
        id: 'instapay.drawdown-success.version2.content',
      })
    : formatMessage({
        id: 'instapay.drawdown-success.version1.content',
      });
  const imageName = isInstapay2Alpha ? 'flying-instapay' : 'jetpack-man-money';

  const renderAlternateCTA = () => {
    if (isAU) {
      if (shouldShowSchedulingCTA || (!isWalletSetupComplete && shouldShowSSAAdTile)) {
        return (
          <Button
            variant="text"
            onPress={onPressedMaybeLater}
            accessibilityLabel="Maybe later"
            text={formatMessage({ id: 'common.maybeLater' })}
          />
        );
      }
    }

    if (shouldShowDrawdownSurveyCTA) {
      return (
        <Button
          variant="text"
          onPress={onPressedMaybeLater}
          accessibilityLabel="Maybe later"
          text={formatMessage({ id: 'common.maybeLater' })}
        />
      );
    }

    return (
      <Button
        style={{ marginTop: space.small }}
        onPress={onPressedMaybeLater}
        accessibilityLabel="Done"
        text={formatMessage({ id: 'common.done' })}
      />
    );
  };

  const renderDrawdownSurveyCTA = () => {
    return (
      <Box marginBottom="small">
        <InstaPayDrawdownSurveyCTA onContinue={() => navigation.navigate('InstaPayDrawdownSurvey')} />
      </Box>
    );
  };

  const renderAdCTA = () => {
    if (shouldShowSchedulingCTA) {
      return (
        <Box marginBottom="small">
          <InstaPaySchedulingAdCTA version={InstaPaySchedulingAdCTAVersion.SUCCESS_SCREEN} />
        </Box>
      );
    }

    return (
      !isWalletSetupComplete &&
      shouldShowSSAAdTile && (
        <InstaPaySuccessScreenAdTile
          caption={formatMessage(
            { id: 'instapay.simplifiedFlowExperiment.successScreen.ssaAdTile.title' },
            {
              percentage: '1.3',
            }
          )}
          content={formatMessage({ id: 'instapay.simplifiedFlowExperiment.successScreen.ssaAdTile.subtitle' })}
          navigationButtonText={formatMessage({
            id: 'instapay.simplifiedFlowExperiment.successScreen.ssaAdTile.cta',
          })}
          onPressed={onPressedOpenNow}
          testID="ssa-ad-tile"
        />
      )
    );
  };

  const Actions =
    !shouldShowSchedulingCTA && (isLoadingOnboarding || !isWalletSetupCompleteFetched) ? (
      <Box flex={1}>
        <Spinner accessibilityLabel="spinner-instapay-success-screen-ssa-ad-tile" />
      </Box>
    ) : (
      <Box>
        {isAU && renderAdCTA()}
        {shouldShowDrawdownSurveyCTA && renderDrawdownSurveyCTA()}
        {renderAlternateCTA()}
      </Box>
    );

  return (
    <OutcomeTemplate
      actions={Actions}
      title={title}
      content={content}
      imageName={imageName}
      imageHeight={152}
      imageWidth={212}
    />
  );
};
