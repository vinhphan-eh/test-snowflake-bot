import React from 'react';
import { Box } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import images from '../../../../common/assets/images';
import { useGetSuperAppToken } from '../../../../common/auth/store/useSuperAppTokenStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { getEnvConfig } from '../../../../common/utils/env';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { BillJoinWaitList } from '../components/BillJoinWaitlist';
import useTrack from '../hooks/useTrack';
import type { BillStreamWaitlistNavigationProp } from '../navigation/navigationTypes';
import { useBillStreamingWaitlistStore } from '../stores/useBillStreamingWaitlistStore';

export const HealthInsuranceJoinWaitlistScreen = () => {
  const navigation = useNavigation<BillStreamWaitlistNavigationProp<'HealthInsuranceJoinWaitlistScreen'>>();
  const finishHealthInsuranceRegistration = useBillStreamingWaitlistStore(
    state => state.finishHealthInsuranceRegistration
  );
  const { formatMessage } = useIntl();
  const { trackJoinHealthInsuranceWaitlist } = useTrack();
  const onClose = () => {
    navigation.goBack();
  };

  const { currentOrgId, currentUser: { userID } = { userID: '0' } } = useSessionStore();

  const { token: superAppToken } = useGetSuperAppToken('HealthInsuranceJoinWaitlistScreen');

  const { refetch: refetchEhJwtToken } = useQuery(
    ['fetchEhJwtToken'],
    async () => {
      const { data } = await axios.post<{ token: string; expired_at: string }>(
        `${getEnvConfig().MAIN_APP_ENDPOINT}/auth`,
        {
          organisation_id: currentOrgId,
          session_token: superAppToken,
        }
      );

      return data.token;
    },
    { enabled: false }
  );

  const { isError: isAcceptMktConsentError, mutateAsync: acceptMktConsent } = useMutation(
    async (ehJwtToken: string) => {
      const { data } = await axios.put(
        `${getEnvConfig().CONSENT_API_ENDPOINT}/api/v1/consents/my`,
        { status: 'accepted' },
        {
          headers: {
            'Content-Type': 'application/json',
            'Jwt-Token': ehJwtToken,
          },
        }
      );
      return data;
    }
  );

  const joinWaitlist = async (consentMktCheck: boolean) => {
    try {
      trackJoinHealthInsuranceWaitlist(userID);
      if (consentMktCheck) {
        const { data: ehJwtToken, isError: isEhJwtTokenError } = await refetchEhJwtToken();
        if (!ehJwtToken || isEhJwtTokenError) {
          return navigation.replace('BillStreamWaitlistFailedScreen');
        }
        await acceptMktConsent(ehJwtToken);
        if (isAcceptMktConsentError) {
          return navigation.replace('BillStreamWaitlistFailedScreen');
        }
      }

      finishHealthInsuranceRegistration();
      navigation.replace('BillStreamWaitlistSuccessScreen', {
        description: formatMessage({ id: 'benefits.bill.healthInsuranceJoinWaitlistSuccess' }),
      });
    } catch {
      navigation.replace('BillStreamWaitlistFailedScreen');
    }
  };

  return (
    <Box backgroundColor="decorativePrimarySurface" flex={1}>
      <BillJoinWaitList
        imgSrc={images.billHeathInsuranceWaitlist}
        title={formatMessage({ id: 'benefits.bill.getExclusiveDeals' })}
        subTitle={formatMessage({ id: 'benefits.bill.secureYourPot' })}
        checkBoxes={[
          { content: formatMessage({ id: 'benefits.bill.seeImportantBills' }) },
          { content: formatMessage({ id: 'benefits.bill.getBestInMarketDiscounts' }) },
        ]}
        joinWaitlist={joinWaitlist}
        onClose={onClose}
      />
    </Box>
  );
};
