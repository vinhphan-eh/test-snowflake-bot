import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import { Image, Typography, scale, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import ThemeSwitcher from '../../../common/utils/ThemeSwitcher';
import type { StashNavigationProp } from '../navigation/navigationTypes';
import { useCreateStashStore } from '../stores/useCreateStashStore';
import { LIST_STASH_IMAGES } from '../utils/getStashImage';

const STASH_IMAGE_WIDTH = 96;

export const StashImageScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashImage'>>();
  const { setImage } = useCreateStashStore();
  const { space } = useTheme();

  const navigateToNextStep = () => {
    navigation.navigate('StashConfirmation');
  };

  const handleImageSelect = (id: number) => {
    setImage(`${id === 0 ? '' : `stashImage${id.toString().padStart(2, '0')}`}`);
    navigateToNextStep();
  };

  const onSkip = () => {
    handleImageSelect(0);
  };

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar
        onBack={navigation.goBack}
        title="Create a Stash"
        customRight={() => (
          <ThemeSwitcher name="wallet">
            <Typography.Body variant="regular-bold" intent="secondary" onPress={onSkip} testID="stashImage-skip">
              Skip
            </Typography.Body>
          </ThemeSwitcher>
        )}
        onRightPress={onSkip}
      />
      <Page.Title
        containerTitleStyle={{
          paddingHorizontal: 'medium',
          backgroundColor: 'defaultSurface',
        }}
      >
        Select an image for your Stash
      </Page.Title>
      <Page.Body paddingHorizontal="medium" backgroundColor="defaultSurface">
        <FlatList
          data={LIST_STASH_IMAGES}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          accessibilityLabel="Stash images list"
          accessibilityRole="menu"
          renderItem={({ index, item }) => (
            <TouchableOpacity
              onPress={() => handleImageSelect(index + 1)}
              style={{
                flexGrow: 1,
                display: 'flex',
                alignItems: 'center',
                marginBottom: space.medium,
              }}
              testID={`stashImage${index + 1}`}
            >
              <Image
                source={item}
                resizeMode="contain"
                style={{
                  width: scale(STASH_IMAGE_WIDTH),
                  height: scale(STASH_IMAGE_WIDTH),
                }}
              />
            </TouchableOpacity>
          )}
        />
      </Page.Body>
    </>
  );
};
