import {
  type EwaPushNotificationType,
  useGetEwaPushNotificationOptInStatusByFeatureQuery,
  type EwaPushNotificationFeature,
  type EwaPushNotificationOptInStatusByFeature,
} from '../../../../../new-graphql/generated';
import { isInstapayError } from '../../utils/graphql-processor';

interface UseGetEwaPushNotificationStatusProps {
  feature: EwaPushNotificationFeature;
  orgId: string;
}

export type EwaPushNotificationStatusByType = {
  type?: EwaPushNotificationType | null;
  optedIn: boolean;
};

interface UseGetEwaPushNotificationStatusResponse {
  isLoading: boolean;
  shouldRenderSection: boolean;
  featureLevelOptedIn?: boolean;
  statusesByType?: EwaPushNotificationStatusByType[];
}

export const useGetEwaPushNotificationStatus = ({
  feature,
  orgId,
}: UseGetEwaPushNotificationStatusProps): UseGetEwaPushNotificationStatusResponse => {
  const { data, isError, isLoading } = useGetEwaPushNotificationOptInStatusByFeatureQuery({
    feature,
    orgId,
  });

  let optInStatus = data?.me?.org?.ewaPushNotification?.optInStatusByFeature;
  const error = isError || (!isLoading && (!optInStatus || isInstapayError(optInStatus)));

  optInStatus = optInStatus as EwaPushNotificationOptInStatusByFeature;
  const statusesByType = optInStatus?.statuses;

  return {
    isLoading,
    shouldRenderSection: isLoading || (!error && !!statusesByType?.length),
    featureLevelOptedIn: optInStatus?.featureLevelOptedIn,
    statusesByType,
  };
};
