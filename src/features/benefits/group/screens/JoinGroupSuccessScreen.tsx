import React from 'react';
import { Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { OutcomeTemplate } from '../../../../common/components/outcome-template/OutcomeTemplate';
import { useIntl } from '../../../../providers/LocalisationProvider';
import type { GroupNavigationProp } from '../navigation/navigationType';

export const JoinGroupSuccessScreen = () => {
  const { space } = useTheme();
  const Intl = useIntl();
  const navigation = useNavigation<GroupNavigationProp<'JoinGroupSuccessScreen'>>();

  return (
    <OutcomeTemplate
      title={Intl.formatMessage({ id: 'megadeal.join.group.success.screen.heading' })}
      content={
        <>
          <Typography.Title
            typeface="playful"
            level="h5"
            style={{ textAlign: 'center', marginTop: space.large, marginBottom: space.medium }}
            testID="submit-contribution-success-message-id"
          >
            {Intl.formatMessage({ id: 'megadeal.join.group.success.screen.subheading' })}
          </Typography.Title>
          <Typography.Body
            variant="regular"
            typeface="playful"
            intent="subdued"
            style={{ textAlign: 'center', marginBottom: space.medium }}
          >
            {Intl.formatMessage({ id: 'megadeal.join.group.success.screen.verbiage' })}
          </Typography.Body>
        </>
      }
      actions={[
        {
          buttonTitle: Intl.formatMessage({ id: 'common.continue' }),
          onNext: () => navigation.goBack(),
        },
      ]}
      imageName="sprinkler"
      imageWidth={325}
      imageHeight={169}
    />
  );
};
