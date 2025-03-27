import React from 'react';
import { Alert, Typography } from '@hero-design/rn';
import useAppName from '../../../common/hooks/useAppName';
import useBrandName from '../../../common/hooks/useBrandName';
import { useMixpanel } from '../../../common/hooks/useMixpanel';
import { EventTrackingCategory } from '../../../common/stores/useSessionStore';
import { useSuperNavigation } from '../hooks/useSuperNavigation';

const RESYNC_SUPER_DETAILS_MODULE_NAME = 'Resync Super';

export const ResyncSuperTile = () => {
  const { navigateToResyncYourSuper } = useSuperNavigation();
  const { eventTracking } = useMixpanel();
  const appName = useAppName();
  const brandName = useBrandName();

  const onSync = () => {
    eventTracking({
      event: 'Click resync super details',
      categoryName: EventTrackingCategory.USER_ACTION,
      metaData: {
        module: RESYNC_SUPER_DETAILS_MODULE_NAME,
      },
    });
    navigateToResyncYourSuper();
  };

  return (
    <Alert
      intent="warning"
      title={`Resync your Super details to ${brandName}`}
      content={
        <Typography.Body variant="small">
          You&apos;ve recently updated your Super on Employment Hero.{' '}
          <Typography.Body
            variant="small"
            onPress={onSync}
            intent="primary"
            style={{ textDecorationLine: 'underline' }}
          >
            Resync now
          </Typography.Body>{' '}
          <Typography.Body variant="small">{`on ${appName} to continue using the salary sacrifice feature.`}</Typography.Body>
        </Typography.Body>
      }
    />
  );
};
