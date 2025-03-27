import type { Dispatch, SetStateAction } from 'react';
import React, { useRef, useState } from 'react';
import { Box } from '@hero-design/rn';
import { SectionHeader } from './SectionHeader';
import { SettingToggle } from './SettingToggle';
import { queryClient } from '../../../common/libs/queryClient';
import {
  PaymentCardStatus,
  useBlockUkCardMutation,
  useGetEWalletUkCurrentPaymentCardDetailsQuery,
  useUnblockUkCardMutation,
  type GetEWalletUkCurrentPaymentCardDetailsQuery,
} from '../../../new-graphql/generated';
import type { TooltipBsData } from '../screens/CardManagementDashboardScreen';

interface CardSettingsUkProps {
  isCardBlocked: boolean;
  isCardLoading: boolean;
  displayToastContent: (content: string) => void;
  displayInfoTooltip: (data: TooltipBsData) => void;
  cardId: string;
  accessToken: string;
}

interface UKCurrentPaymentCard {
  id: string;
  status: PaymentCardStatus;
  nameOnCard: string;
  isVirtual: boolean;
  issuedTimestamp?: string | null;
  lastFourDigits?: string | null;
}

const SWIPE_ANIMATION_WAIT_TIME = 200;

export const CardSettingsUk = ({
  accessToken,
  cardId,
  displayInfoTooltip,
  displayToastContent,
  isCardBlocked,
  isCardLoading,
}: CardSettingsUkProps) => {
  const { mutateAsync: mutateBlockUkCard } = useBlockUkCardMutation();
  const { mutateAsync: mutateUnblockUkCard } = useUnblockUkCardMutation();
  const cardDetailsCache = useRef<UKCurrentPaymentCard | undefined>(undefined);

  const GET_CARD_DETAILS_QUERY_KEY = useGetEWalletUkCurrentPaymentCardDetailsQuery.getKey({ accessToken });

  const optimiseUpdateUKCardDetails = async (key: 'isCardBlocked', value: boolean) => {
    // Updated value
    const generateUpdatedCardDetails = (
      old: GetEWalletUkCurrentPaymentCardDetailsQuery | undefined
    ): UKCurrentPaymentCard => {
      let updatedCardDetails = {
        ...old?.me?.wallet?.UKCurrentPaymentCardV2,
      };

      // Cache old card details
      cardDetailsCache.current = {
        ...updatedCardDetails,
        id: updatedCardDetails.id ?? '',
        nameOnCard: updatedCardDetails.nameOnCard ?? '',
        isVirtual: updatedCardDetails.isVirtual ?? true,
        status: updatedCardDetails.status ?? PaymentCardStatus.Active,
      };

      if (key === 'isCardBlocked') {
        updatedCardDetails.status = value ? PaymentCardStatus.Blocked : PaymentCardStatus.Active;
      } else {
        updatedCardDetails = {
          ...updatedCardDetails,
          [key]: value,
        };
      }

      return {
        ...updatedCardDetails,
        id: updatedCardDetails.id ?? '',
        nameOnCard: updatedCardDetails.nameOnCard ?? '',
        isVirtual: updatedCardDetails.isVirtual ?? true,
        status: updatedCardDetails.status ?? PaymentCardStatus.Active,
      };
    };

    await queryClient.cancelQueries(GET_CARD_DETAILS_QUERY_KEY);
    queryClient.setQueryData(
      GET_CARD_DETAILS_QUERY_KEY,
      (old: GetEWalletUkCurrentPaymentCardDetailsQuery | undefined): GetEWalletUkCurrentPaymentCardDetailsQuery => ({
        ...old,
        me: {
          wallet: {
            UKCurrentPaymentCardV2: generateUpdatedCardDetails(old),
          },
        },
      })
    );
  };

  // Case of failed API
  const revertOldCardDetails = async () => {
    await queryClient.cancelQueries(GET_CARD_DETAILS_QUERY_KEY);

    // Updated value
    if (cardDetailsCache.current) {
      queryClient.setQueryData(GET_CARD_DETAILS_QUERY_KEY, () => ({
        me: {
          wallet: {
            UKCurrentPaymentCardV2: cardDetailsCache.current,
          },
        },
      }));

      cardDetailsCache.current = undefined;
    } else {
      queryClient.setQueryData(GET_CARD_DETAILS_QUERY_KEY, () => ({
        me: {
          wallet: {
            UKCurrentPaymentCardV2: undefined,
          },
        },
      }));

      queryClient.invalidateQueries(GET_CARD_DETAILS_QUERY_KEY);
    }
  };

  const updateUKCardDetails = async (
    oldVal: boolean,
    newVal: boolean,
    setStateAction: Dispatch<SetStateAction<boolean>>,
    key: 'isCardBlocked'
  ) => {
    let result = newVal;
    if (key === 'isCardBlocked') {
      result = !newVal;
    }
    setStateAction(newVal);

    try {
      let isSuccess = false;

      // Since it took quite long for the action to be completed, for this step
      // trigger the setQuery flow first then revert if api is failed
      setTimeout(() => {
        // Time out to wait for the swipe animation to fully done before temporarily update the swiper status
        // based on card's activated state
        optimiseUpdateUKCardDetails(key, result);
      }, SWIPE_ANIMATION_WAIT_TIME);

      if (key === 'isCardBlocked') {
        if (result) {
          const actionResult = await mutateBlockUkCard({
            input: {
              cardId,
            },
          });
          isSuccess = actionResult?.blockUKCard?.success;
        } else {
          const actionResult = await mutateUnblockUkCard({
            input: {
              cardId,
            },
          });
          isSuccess = actionResult?.unblockUKCard?.success;
        }
      }

      if (!isSuccess) {
        displayToastContent('Sorry, we could not process your request. Try again later.');
        setStateAction(oldVal);
        revertOldCardDetails();
      }
    } catch {
      displayToastContent('Sorry, we could not process your request. Try again later.');
      setStateAction(oldVal);
      revertOldCardDetails();
    }
  };
  const [isUKCardActive, setIsUKCardActive] = useState(!isCardBlocked ?? true);
  const labelUKCardBlockUnblock = isUKCardActive ? 'Card is enabled' : 'Card is disabled';

  const onBlockUnblockUKCard = (isOn: boolean) => {
    updateUKCardDetails(isUKCardActive, isOn, setIsUKCardActive, 'isCardBlocked');
  };

  const tooltipBsData: Record<'UKVirtualCard', TooltipBsData> = {
    UKVirtualCard: {
      title: 'Card settings',
      description: 'Disabling these toggles will disable the functionality for your virtual card.',
    },
  };

  const renderUKCardBlockUnblockSetting = () => {
    return (
      <Box>
        <SectionHeader
          title="Virtual card"
          onIconPress={() => {
            displayInfoTooltip(tooltipBsData.UKVirtualCard);
          }}
        />
        <Box flexDirection="column" paddingHorizontal="medium" paddingTop="large">
          <SettingToggle
            marginBottom="large"
            variant="regular-bold"
            onChange={onBlockUnblockUKCard}
            label={labelUKCardBlockUnblock}
            value={isUKCardActive}
            testID="toggle card enable"
          />
        </Box>
      </Box>
    );
  };

  if (isCardLoading) {
    return null;
  }

  return <Box flex={1}>{renderUKCardBlockUnblockSetting()}</Box>;
};
