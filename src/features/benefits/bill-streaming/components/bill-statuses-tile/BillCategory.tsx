import React from 'react';
import type { IconName } from '@hero-design/rn';
import { Box, Icon, Tag, Typography, useTheme } from '@hero-design/rn';
import { SignUpButton } from './SignUpButton';
import { type Subscription, SubscriptionStatus, useGetPromotionQuery } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider/hooks/useIntl';
import { PromotionTnCApply } from '../PromotionTnCApply';

interface BillCategoryProps {
  icon: IconName;
  category: string;
  subscription?: Subscription;
  testID?: string;
  onClickSignUp: () => void;
  onClickRenew: (signUpLink: string, providerName: string) => void;
  isShowSubTitle?: boolean;
  providerName: string;
}

export const BillCategory = ({
  category,
  icon,
  isShowSubTitle,
  onClickRenew,
  onClickSignUp,
  providerName,
  subscription,
  testID,
}: BillCategoryProps) => {
  const { space } = useTheme();
  const { formatMessage } = useIntl();
  const signUpText = formatMessage({ id: 'common.bills.button.signUp' });

  const renderStatus = () => {
    if (!subscription) {
      return <SignUpButton testID={`${testID}-sign-up-btn`} text={signUpText} onPress={onClickSignUp} />;
    }

    switch (subscription.status) {
      case SubscriptionStatus.Active:
        return <Tag intent="success" content={formatMessage({ id: 'common.bills.status.approved' })} />;
      case SubscriptionStatus.Cancelled: {
        const { signUpLink } = subscription;
        const text = signUpLink ? formatMessage({ id: 'benefits.bill.renew' }) : signUpText;
        const onBtnPress = signUpLink ? () => onClickRenew(signUpLink, providerName) : onClickSignUp;
        return <SignUpButton testID={`${testID}-renew-btn`} text={text} onPress={onBtnPress} />;
      }
      case SubscriptionStatus.Pending:
      case SubscriptionStatus.Submitted:
        return <Tag intent="warning" content={formatMessage({ id: 'common.bills.status.pendingApproval' })} />;
      default:
        return null;
    }
  };

  const { data: promotionContent } = useGetPromotionQuery();

  const { signedUpBillStatusContent } = promotionContent?.me?.billManagement?.promotion ?? {};

  const isDisplayIndicator =
    isShowSubTitle &&
    subscription &&
    subscription.isHPPromo &&
    (subscription.status === SubscriptionStatus.Submitted || subscription.status === SubscriptionStatus.Pending);

  return (
    <Box testID={testID} marginTop="smallMedium" paddingVertical="small" paddingHorizontal="medium">
      <Box flexDirection="row" justifyContent="space-between" alignItems="center">
        <Box flexDirection="row">
          <Icon icon={icon} accessibilityLabel={category} size="small" />
          <Box marginLeft="small">
            <Typography.Body style={{ marginBottom: space.xsmall }}>{providerName}</Typography.Body>
            <Typography.Caption intent="subdued">{category}</Typography.Caption>
          </Box>
        </Box>
        {renderStatus()}
      </Box>

      {isDisplayIndicator ? (
        <Box flexDirection="row" alignItems="center" marginTop="small">
          <Typography.Caption intent="subdued">{signedUpBillStatusContent}</Typography.Caption>
          <PromotionTnCApply />
        </Box>
      ) : null}
    </Box>
  );
};
