import { useEffect } from 'react';
import Braze, { type ClassicContentCard } from '@braze/react-native-sdk';
import { useLoadBrazeContentCards } from '../../../../common/hooks/useLoadBrazeContentCards';
import type { TypographyIntent } from '../../../../common/types/hero-design';
import {
  RECURRING_SWAG_TILE_FOR_REGISTERED_ID,
  RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID,
  IP_NOW_SWAG_TILE_ID,
  IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID,
} from '../../../income/instapay/constants/braze';

export type BrazeContentExtras = {
  prefixText?: string;
  amountType?: 'now_balance' | 'scheduled';
  postfixText?: string;
  textColor?: TypographyIntent;
};

type BrazeContent = {
  cardId: string;
  image: string | undefined;
  extras: BrazeContentExtras;
};

type TileProps = {
  isIpNowTile?: boolean;
  validIpNow?: boolean;
  isRecurringSetUp?: boolean;
};

type AmountType = 'now_balance' | 'scheduled';

type GetBrazeCustomIdProps = {
  isIpNowTile: boolean;
  validIpNow: boolean;
  isRecurringSetUp: boolean;
};

export const getBrazeCustomId = ({ isIpNowTile, isRecurringSetUp, validIpNow }: GetBrazeCustomIdProps): string => {
  if (isIpNowTile) {
    return validIpNow ? IP_NOW_SWAG_TILE_ID : IP_NOW_SWAG_TILE_FOR_NOT_VALID_ID;
  }
  return isRecurringSetUp ? RECURRING_SWAG_TILE_FOR_REGISTERED_ID : RECURRING_SWAG_TILE_FOR_NOT_REGISTERED_ID;
};

export const useLoadBrazeContentForTiles = (tileProps?: TileProps) => {
  const { isIpNowTile = false, isRecurringSetUp = false, validIpNow = false } = tileProps || {};
  const { cards } = useLoadBrazeContentCards();

  const getBrazeContent = (cardId: string): BrazeContent | null => {
    const card = cards?.find(item => item?.extras?.id === cardId) as ClassicContentCard;
    if (!card) {
      return null;
    }

    const { amountType, postfixText, prefixText, textColor = 'inverted' } = card.extras || {};

    return {
      cardId: card.id,
      image: card.image,
      extras: {
        prefixText,
        amountType: amountType as AmountType | undefined,
        postfixText,
        textColor: textColor as TypographyIntent,
      },
    };
  };

  const brazeCustomId = getBrazeCustomId({ isIpNowTile, validIpNow, isRecurringSetUp });
  const brazeCard = getBrazeContent(brazeCustomId);

  useEffect(() => {
    if (brazeCard?.cardId) {
      Braze.logContentCardImpression(brazeCard.cardId);
    }
  }, [brazeCard?.cardId]);

  if (!brazeCard) {
    return null;
  }

  return brazeCard;
};
