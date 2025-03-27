import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { logError } from '../../../../common/utils/sentry';
import { useCreateTrackingMutation } from '../../../../new-graphql/generated';
import { LIFECYCLE_MODULE } from '../constants';

export type LifecycleTrack = ({
  data,
  event_id,
  name,
}: {
  name: string;
  event_id: string;
  data?: Record<string | number | symbol, string | number>;
}) => void;

export const useLifecycleTracking = () => {
  const currentUser = useSessionStore(state => state.currentUser);
  const { eventTracking } = useMixpanel();

  const { mutateAsync } = useCreateTrackingMutation();

  const track: LifecycleTrack = ({ data, event_id, name }) => {
    if (!currentUser?.userID) {
      logError('Lifecycle: userId is empty when creating lifecycle tracking', {
        squad: 'squad-hrv',
      });
    }
    eventTracking({
      event: name,
      categoryName: 'user action',
      metaData: {
        module: LIFECYCLE_MODULE,
        event_id,
        data: data ? JSON.stringify(data) : '',
        author_id: currentUser?.userID ?? 'Undefined',
        author_type: 'employee',
      },
    });
    mutateAsync({
      input: {
        name,
        event_id,
        data: data ? JSON.stringify(data) : '',
        author_id: currentUser?.userID ?? 'Undefined', // author_id is a required field in gRPC, we don't want to loose tracking events when unexpected things happen
        author_type: 'employee', // Temporary hardcoded, until we can get this from superapp,
        channel: 'Swag',
      },
    });
  };
  return {
    track,
  };
};
