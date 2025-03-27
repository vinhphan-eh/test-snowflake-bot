import { checkDeviceIsEnrolled } from '@weavr-io/secure-components-react-native';
import { useQuery } from 'react-query';
import { useCheckUKPermissionWithLoadingState } from './useCheckUKPermission';

export type DeviceEnrollmentState = 'ENROLLED' | 'NOT_ENROLLED' | 'UNKNOWN';

export const useCheckUkDeviceEnrollment = (options: {
  enabled: boolean;
  onSuccess?: (state: DeviceEnrollmentState) => void;
  onError?: () => void;
}) => {
  const { hasPermission: isUkCustomer, isLoading: isLoadingUKPermission } = useCheckUKPermissionWithLoadingState();

  return useQuery(
    ['checkUkDeviceEnrolment'],
    async () => {
      if (!isUkCustomer) {
        return 'UNKNOWN';
      }

      try {
        const enrolmentResult = await checkDeviceIsEnrolled();

        if (enrolmentResult.error) {
          return 'UNKNOWN';
        }

        return enrolmentResult.result.isEnrolled ? 'ENROLLED' : 'NOT_ENROLLED';
      } catch (error) {
        // Handle errors here
        console.error('Error occurred while checking enrolment:', error);
        return 'UNKNOWN';
      }
    },
    {
      onSuccess: data => {
        options.onSuccess?.(data);
      },
      onError: () => {
        options.onError?.();
      },
      enabled: options.enabled && !isLoadingUKPermission,
    }
  );
};
