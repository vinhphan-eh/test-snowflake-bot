import React, { useEffect, useMemo, useState, type ReactNode } from 'react';
import { ScrollView, type ImageSourcePropType } from 'react-native';
import { BottomSheet, Box, Button, Image, scale, Typography, useTheme } from '@hero-design/rn';
import { EstimatedIncomeTileBottomSheetContent } from './EstimatedIncomeTileBottomSheet';
import images from '../../../../common/assets/images';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useSeenRecurringHowItWorksBts } from '../../instapay/hooks/useSeenRecurringHowItWorksBts';
import type { LocaleMessageID } from '../../../../providers/LocalisationProvider/constants';

interface RecurringHowItWorksBottomSheetProps {
  isOpening: boolean;
  setIsOpening: (isOpening: boolean) => void;
  isUK: boolean;
  isExtendedVersion?: boolean;
}

interface PageImage {
  source: ImageSourcePropType;
  originalSize?: {
    width: number;
    height: number;
  };
}

interface Page {
  image: PageImage;
  content: ReactNode;
}

const COMMON_ORIGINAL_IMAGE_SIZE = {
  height: 230,
  width: 358,
};

export const RecurringHowItWorksBottomSheet = ({
  isExtendedVersion = false,
  isOpening,
  isUK,
  setIsOpening,
}: RecurringHowItWorksBottomSheetProps) => {
  const { formatMessage } = useIntl();
  const { space } = useTheme();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { setSeen } = useSeenRecurringHowItWorksBts();

  useEffect(() => {
    if (isOpening) {
      setSeen(true);
    }
  }, [isOpening]);

  const imagesList: PageImage[] = useMemo(
    () =>
      isUK
        ? [
            {
              source: images.ewaRecurringHowItWorksUK1,
            },
            {
              source: images.ewaRecurringHowItWorksUK2,
            },
            {
              source: images.ewaRecurringHowItWorksUK3,
              originalSize: {
                height: 240,
                width: 358,
              },
            },
            {
              source: images.ewaRecurringHowItWorksUK4,
            },
          ]
        : [
            {
              source: images.ewaRecurringHowItWorksAU1,
            },
            {
              source: images.ewaRecurringHowItWorksAU2,
            },
            {
              source: images.ewaRecurringHowItWorksAU3,
              originalSize: {
                height: 240,
                width: 358,
              },
            },
            {
              source: images.ewaRecurringHowItWorksAU4,
            },
          ],
    [isUK]
  );

  const pagesContentList: string[] = useMemo(() => {
    const keysByStep = ['chooseAmount', 'selectReceivingAccount', 'receiveAt9PM'];
    const keyByType = isUK ? 'withoutDay' : 'withDay';

    return keysByStep.map(step =>
      formatMessage({ id: `instapay.scheduling.howItWorks.steps.${keyByType}.${step}` as LocaleMessageID })
    );
  }, [isUK]);

  const pages: Page[] = useMemo(
    () => [
      {
        image: imagesList[0],
        content: (
          <Box marginHorizontal="small">
            <Typography.Body>{pagesContentList[0]}</Typography.Body>
          </Box>
        ),
      },
      {
        image: imagesList[1],
        content: (
          <Box marginHorizontal="small">
            <Typography.Body>{pagesContentList[1]}</Typography.Body>
          </Box>
        ),
      },
      {
        image: imagesList[2],
        content: (
          <Box marginHorizontal="small">
            <Typography.Body>{pagesContentList[2]}</Typography.Body>
          </Box>
        ),
      },
      ...(isExtendedVersion
        ? [
            {
              image: imagesList[3],
              content: <EstimatedIncomeTileBottomSheetContent />,
            },
          ]
        : []),
    ],
    [isExtendedVersion, imagesList, pagesContentList]
  );

  useEffect(() => {
    if (!isOpening) {
      // Set current page back to be the first page on closed
      setTimeout(() => {
        setCurrentPage(0);
      }, 500);
    }
  }, [isOpening]);

  useEffect(() => {
    setCurrentPage(0);
  }, [isExtendedVersion]);

  const NavigationFooter = useMemo(() => {
    const nextButton = (
      <Button
        variant="text"
        testID="recurring-how-it-works-bts-next-button"
        text={formatMessage({ id: 'common.next' })}
        onPress={() => {
          setCurrentPage(currentPage + 1);
        }}
      />
    );

    const backButton = (
      <Button
        variant="text"
        intent="secondary"
        testID="recurring-how-it-works-bts-back-button"
        text={formatMessage({ id: 'common.back' })}
        onPress={() => {
          setCurrentPage(currentPage - 1);
        }}
      />
    );

    const gotItButton = (
      <Button
        variant="text"
        testID="recurring-how-it-works-bts-got-it-button"
        text={formatMessage({ id: 'common.gotIt' })}
        onPress={() => {
          setIsOpening(false);
        }}
      />
    );

    switch (currentPage) {
      case 0:
        return (
          <Box flexDirection="row" alignItems="flex-end">
            {nextButton}
          </Box>
        );
      case pages.length - 1:
        return (
          <Box flexDirection="row" alignItems="flex-end">
            {backButton}
            {gotItButton}
          </Box>
        );
      default:
        return (
          <Box flexDirection="row" alignItems="flex-end">
            {backButton}
            {nextButton}
          </Box>
        );
    }
  }, [currentPage, pages.length]);

  return (
    <BottomSheet
      open={isOpening}
      onRequestClose={() => setIsOpening(false)}
      testID="recurring-how-it-works-bts"
      header={formatMessage({ id: 'common.gettingStarted' })}
      footer={NavigationFooter}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box paddingHorizontal="medium" paddingBottom="medium">
          <Image
            style={{
              width: scale((pages[currentPage].image.originalSize ?? COMMON_ORIGINAL_IMAGE_SIZE).width),
              height: scale((pages[currentPage].image.originalSize ?? COMMON_ORIGINAL_IMAGE_SIZE).height),
              maxWidth: '100%',
              marginBottom: space.medium,
            }}
            source={pages[currentPage].image.source}
            resizeMode="contain"
          />

          {pages[currentPage].content}
        </Box>
      </ScrollView>
    </BottomSheet>
  );
};
