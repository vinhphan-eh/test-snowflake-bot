import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Box, Button, Carousel, Typography, useTheme } from '@hero-design/rn';
import type { CarouselData } from '@hero-design/rn/types/components/Carousel/types';
import AddCustomCategoryBottomSheet from './AddCustomCategoryBottomSheet';
import CategorySurvey from './CategorySurvey';
import type { TUseJoinWaitListInput } from './useJoinWaitList';
import useJoinWaitList from './useJoinWaitList';
import useTracking from './useTracking';
import images from '../../../../../common/assets/images';
import useBrandName from '../../../../../common/hooks/useBrandName';
import { useIntl } from '../../../../../providers/LocalisationProvider';

export type TJoinWaitListProps = TUseJoinWaitListInput;

const JoinWaitList = ({ onJoinWaitListFailed, onJoinWaitListSuccess }: TJoinWaitListProps) => {
  const Intl = useIntl();
  const { colors, space } = useTheme();
  const { trackClickLetGo, trackClickNext, trackClickSkip } = useTracking();
  const {
    categories,
    isJoinWaitListLoading,
    isShowAddNewCategory,
    isShowSurveys,
    lastIndexKey,
    onAddNewCategory,
    onCloseAddNewCategory,
    onJoinWaitList,
    onNextCarousel,
    onSkipSurvey,
    selectedCategories,
    selectedItemIndex,
    setSelectedItemIndex,
    suvreyIndexKey,
    toggleById,
  } = useJoinWaitList({ onJoinWaitListSuccess, onJoinWaitListFailed });
  const brandName = useBrandName();

  const carouselData = useMemo(() => {
    const arr: CarouselData[] = [
      {
        background: colors.highlightedSurface,
        image: images.expMegadealCarouselBg1,
        heading: Intl.formatMessage({ id: 'megadeal.group.carousel.step1.heading' }, { brandName }),
        body: Intl.formatMessage({ id: 'megadeal.group.carousel.step1.body' }),
      },
      {
        background: colors.highlightedSurface,
        image: images.expMegadealCarouselBg2,
        heading: Intl.formatMessage({ id: 'megadeal.group.carousel.step2.heading' }),
        body: Intl.formatMessage({ id: 'megadeal.group.carousel.step2.body' }),
      },
    ];

    if (isShowSurveys) {
      arr.push({
        content: (
          <Box>
            <Typography.Title level="h2">
              {Intl.formatMessage({ id: 'megadeal.group.carousel.stepSurvey.heading' })}
            </Typography.Title>
            <Typography.Body style={{ marginTop: space.small }}>
              {Intl.formatMessage({ id: 'megadeal.group.carousel.stepSurvey.body' })}
            </Typography.Body>
            <CategorySurvey categories={categories} selectedCategories={selectedCategories} toggleById={toggleById} />
          </Box>
        ),
        image: { width: 0, height: 0 },
        background: colors.highlightedSurface,
        heading: '',
        body: '',
      });
    }

    arr.push({
      background: colors.highlightedSurface,
      image: images.expMegadealCarouselBg3,
      heading: Intl.formatMessage({ id: 'megadeal.group.carousel.lastStep.heading' }),
      body: Intl.formatMessage({ id: 'megadeal.group.carousel.lastStep.body' }),
    });
    return arr;
  }, [categories, isShowSurveys, selectedCategories]);

  const renderActions = (currentIndex: number) => {
    switch (currentIndex) {
      case suvreyIndexKey: {
        return (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignContent="flex-end"
            style={{ width: '100%', padding: 0 }}
          >
            <Button
              variant="text"
              text={Intl.formatMessage({ id: 'common.skip' })}
              onPress={() => {
                trackClickSkip();
                onSkipSurvey();
              }}
              style={{ marginHorizontal: space.small }}
            />
            <Button
              text={Intl.formatMessage({ id: 'common.next' })}
              onPress={() => {
                trackClickNext();
                onNextCarousel();
              }}
              style={{ marginHorizontal: space.small }}
            />
          </Box>
        );
      }
      case lastIndexKey: {
        return (
          <Box
            display="flex"
            flexDirection="row"
            justifyContent="flex-end"
            alignContent="flex-end"
            style={{ width: '100%', padding: 0 }}
          >
            <Button
              loading={isJoinWaitListLoading}
              text={Intl.formatMessage({ id: 'common.letGo' })}
              onPress={() => {
                onJoinWaitList();
                trackClickLetGo();
              }}
              style={{ marginHorizontal: space.small }}
            />
          </Box>
        );
      }

      default: {
        return <></>;
      }
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.highlightedSurface, paddingTop: space.xxlarge }}>
      <Carousel
        accessibilityLabel="Community plan Intro"
        style={{ flex: 1 }}
        selectedItemIndex={selectedItemIndex}
        onItemIndexChange={setSelectedItemIndex}
        items={carouselData}
        renderActions={renderActions}
      />
      {isShowAddNewCategory && (
        <AddCustomCategoryBottomSheet
          onAddNewCategory={onAddNewCategory}
          onCloseAddNewCategory={onCloseAddNewCategory}
        />
      )}
    </View>
  );
};

export default JoinWaitList;
