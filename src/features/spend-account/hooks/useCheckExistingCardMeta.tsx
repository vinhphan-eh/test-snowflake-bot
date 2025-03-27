import { parseJSON } from '../../../common/utils/common';
import { getBrand } from '../../../common/utils/deviceInfo';
import { WalletType, useGetCurrentCardMetaQuery, type GetCurrentCardMetaQuery } from '../../../new-graphql/generated';

const checkDigitalProvisioningDone = (cardMeta: GetCurrentCardMetaQuery | undefined): boolean => {
  if (!cardMeta) {
    return false;
  }

  // https://github.com/react-native-device-info/react-native-device-info#getbrand
  const currentDeviceBrand = getBrand();

  return (cardMeta?.me?.wallet?.card?.meta?.digitalWalletDetails?.wallets ?? []).some(item => {
    if (currentDeviceBrand === 'Apple') {
      return item?.type === WalletType.AppleWallet;
    }

    return item?.type === WalletType.GooglePay;
  });
};

export const useCheckExistingCardMeta = () => {
  const {
    data: currentCardMeta,
    error: currentCardMetaError,
    isLoading: isCurrentCardMetaLoading,
  } = useGetCurrentCardMetaQuery<GetCurrentCardMetaQuery, Error>();

  const cardMetaError = parseJSON<Record<string, unknown>>(currentCardMetaError?.message ?? '{}');
  const isCardMetaError = typeof cardMetaError?.statusCode === 'number' && cardMetaError?.statusCode !== 404;

  return {
    isCurrentCardMetaLoading,
    isCardMetaError,
    currentCardMeta,
    isDigitalProvisioningStepDone: checkDigitalProvisioningDone(currentCardMeta),
  };
};
