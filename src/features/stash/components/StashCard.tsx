import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Box, Image, Progress, Typography, scale } from '@hero-design/rn';
import { CurrencyText } from '../../../common/components/currency-text/CurrencyText';
import { getFloatAmountFromMoneyV2 } from '../../../common/utils/currency';
import type { StashItem } from '../../../new-graphql/generated';
import { getStashImage } from '../utils/getStashImage';

type StashCardProps = {
  stash: Omit<StashItem, 'id'>;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  showBalance?: boolean;
};

const STASH_CARD_WIDTH = 112;
const STASH_IMAGE_HEIGHT = 96;

export const StashCard = ({ onPress, showBalance = true, stash, style }: StashCardProps) => {
  const { balance, imageUrl, name, targetAmount } = stash;
  const parsedTargetAmount = targetAmount ? getFloatAmountFromMoneyV2(targetAmount) : 0;
  const parsedBalance = balance ? getFloatAmountFromMoneyV2(balance) : 0;

  return (
    <TouchableOpacity testID={`stash-card-${name}`} onPress={onPress} disabled={!onPress} style={style}>
      <Box
        padding="small"
        style={{
          height: STASH_CARD_WIDTH,
        }}
        borderRadius="medium"
        backgroundColor="defaultGlobalSurface"
        marginBottom="small"
        flexDirection="row"
      >
        <Box>
          <Image
            source={getStashImage(imageUrl)}
            style={{
              width: scale(STASH_IMAGE_HEIGHT),
              height: scale(STASH_IMAGE_HEIGHT),
            }}
          />
        </Box>
        <Box flex={1} flexDirection="column" justifyContent="space-around" display="flex" paddingHorizontal="small">
          <Typography.Body variant="small-bold" typeface="playful">
            {name}
          </Typography.Body>

          {!!parsedTargetAmount && showBalance && <Progress.Bar value={(parsedBalance / parsedTargetAmount) * 100} />}

          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box>
              {!!parsedTargetAmount && (
                <Box flexDirection="row">
                  <Typography.Caption intent="muted">Goal: </Typography.Caption>
                  <CurrencyText
                    amount={parsedTargetAmount}
                    renderCurrency={amount => <Typography.Caption intent="muted">{amount}</Typography.Caption>}
                    renderDecimal={amount => (
                      <Typography.Label intent="muted" style={{ alignSelf: 'flex-end' }}>
                        {amount}
                      </Typography.Label>
                    )}
                  />
                </Box>
              )}
            </Box>
            {showBalance && (
              <CurrencyText
                amount={parsedBalance}
                renderCurrency={amount => <Typography.Body variant="regular">{amount}</Typography.Body>}
                renderDecimal={amount => <Typography.Body variant="small">{amount}</Typography.Body>}
              />
            )}
          </Box>
        </Box>
      </Box>
    </TouchableOpacity>
  );
};
