import React from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { Box, Card, scale, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { CLICK_ON_BUDGETING_TILE_IN_PAYSLIPS_TAB, PAYSLIPS_EXPERIMENT_MODULE } from './constants';
import images from '../../common/assets/images';
import { useMixpanel } from '../../common/hooks/useMixpanel';
import ThemeSwitcher from '../../common/utils/ThemeSwitcher';
import type { RootStackNavigationProp } from '../../navigation/navigationTypes';
import { useIntl } from '../../providers/LocalisationProvider';

const IMAGE_HEIGHT = 106;
const IMAGE_WIDTH = 106;

export const BudgetingPayslipsTile = ({ isShowInstapayTile }: { isShowInstapayTile: boolean }) => {
  const Intl = useIntl();
  const theme = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();
  const { eventTracking } = useMixpanel();

  // show intro image only if instapay tile is not visible
  const isShowIntroImage = !isShowInstapayTile;

  const onTryBudgetingPress = () => {
    navigation.navigate('SwagPayslipsExperimentStack', { screen: 'BudgetingIntroScreen' });
    eventTracking({
      event: CLICK_ON_BUDGETING_TILE_IN_PAYSLIPS_TAB,
      categoryName: 'user action',
      metaData: {
        module: PAYSLIPS_EXPERIMENT_MODULE,
        'InstaPay Available': isShowInstapayTile,
      },
    });
  };

  return (
    <ThemeSwitcher name="wallet">
      <Card style={{ flex: 1 }}>
        <TouchableOpacity style={{ flexGrow: 1 }} onPress={onTryBudgetingPress} testID="budgeting-tile">
          <Box
            // hack to make the Box component take full height of the Card
            flexGrow={1}
            padding="medium"
            backgroundColor="defaultGlobalSurface"
            flexDirection={isShowIntroImage ? 'row' : 'column'}
          >
            {isShowIntroImage && (
              <Image
                testID="budgeting-intro-image"
                source={images.budgetingPayslipsExperiment}
                resizeMode="contain"
                style={{
                  width: scale(IMAGE_WIDTH),
                  height: scale(IMAGE_HEIGHT),
                  marginRight: theme.space.medium,
                }}
              />
            )}
            <Box flex={1} justifyContent="space-between">
              <Box>
                <Typography.Body variant="regular-bold">
                  {Intl.formatMessage({
                    id: 'payslipsExperimentTile.budgetingTile.title',
                  })}
                </Typography.Body>
                <Typography.Body variant="small" style={{ marginTop: theme.space.xsmall }}>
                  {Intl.formatMessage({
                    id: 'payslipsExperimentTile.budgetingTile.description',
                  })}
                </Typography.Body>
              </Box>
              <Box justifyContent="flex-end">
                <Typography.Body variant="regular-bold" intent="primary">
                  {Intl.formatMessage({
                    id: 'payslipsExperimentTile.budgetingTile.tryBudgeting',
                  })}
                </Typography.Body>
              </Box>
            </Box>
          </Box>
        </TouchableOpacity>
      </Card>
    </ThemeSwitcher>
  );
};
