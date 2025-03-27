import type { ReactNode } from 'react';
import React, { useCallback, useRef, useState } from 'react';
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Box, Icon, List, Typography } from '@hero-design/rn';
import type { BottomSheetRef } from '../bottom-sheet/BottomSheet';
import { BottomSheetScrollView } from '../bottom-sheet/BottomSheet';
import { BottomSheetWithHD } from '../bottom-sheet/BottomSheetWithHD';
import { useBottomSheetDynamicSnapPoints } from '../bottom-sheet/useBottomSheetDynamicSnapPoints';

export type PolicyCheckboxProps = {
  /**
   * Set if item is checked
   */
  isChecked?: boolean;
  /**
   * Title that briefly describes the action to the user.
   */
  title: string;
  /**
   * Content of the item.
   */
  content?: string;
  /**
   * A testId prop is provided for specified elements, which is a unique string that appears as a data attribute testID in the rendered code, serving as a hook for automated tests
   */
  testId?: string;
  /**
   * Fire whenever user accept the policy
   */
  onAccepted?: () => void;
  /**
   * Used only for documentation or testing (e.g. snapshot testing).
   */
  customContent?: ReactNode;
  /**
   * Used only for rebranding purposes.
   */
  defaultDisableAcceptBtn?: boolean;
  /**
   * Used only for rebranding with custom bottom sheet title.
   */
  customBtsTitle?: string;
};

export const PolicyCheckbox = ({
  content = '',
  customBtsTitle,
  customContent,
  defaultDisableAcceptBtn,
  isChecked = false,
  onAccepted,
  testId,
  title,
}: PolicyCheckboxProps) => {
  const bs = useRef<BottomSheetRef>(null);
  const [isBtnDisabled, setIsBtnDisabled] = useState(defaultDisableAcceptBtn);
  const [isAccepted, setIsAccepted] = useState(isChecked);

  const onPress = useCallback(() => {
    bs.current?.open();
  }, []);

  const onScrollEnd = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const isCloseToBottom = ({ contentOffset, contentSize, layoutMeasurement }: NativeScrollEvent) => {
      const paddingToBottom = 20;
      return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
    };

    if (isCloseToBottom(event.nativeEvent)) {
      setIsBtnDisabled(false);
    }
  }, []);

  const onAccept = useCallback(() => {
    setIsAccepted(true);
    bs.current?.close();
    onAccepted?.();
  }, [onAccepted]);

  const {
    animatedContentHeight,
    animatedHandleHeight,
    animatedSnapPoints,
    contentContainerHeightStyle,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(true);

  return (
    <>
      <List.Item
        title={title}
        variant="card"
        prefix={<Icon icon="file" size="small" />}
        suffix={<Icon icon={isAccepted ? 'checkmark' : 'arrow-up'} size="small" />}
        testID={testId}
        onPress={onPress}
        selected={isAccepted}
      />
      <BottomSheetWithHD
        ref={bs}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        title={customBtsTitle || title}
        handleIconName="cancel"
        handleIconSize="xsmall"
        handleIconIntent="text"
        actions={[
          { testID: 'policy-ck-box-accept-btn', title: 'Accept', onPress: onAccept, isDisabled: isBtnDisabled },
        ]}
      >
        {() => (
          <BottomSheetScrollView
            style={contentContainerHeightStyle}
            onLayout={handleContentLayout}
            onMomentumScrollEnd={onScrollEnd}
            testID="bottom-sheet-scroll-view"
          >
            {customContent ? (
              <Box
                testID={`${testId}_custom_content`}
                paddingHorizontal="large"
                paddingTop="small"
                paddingBottom="medium"
              >
                {customContent}
              </Box>
            ) : (
              <Box paddingHorizontal="large" paddingTop="small" paddingBottom="medium">
                <Typography.Body variant="regular" testID={`${testId}_text`}>
                  {content}
                </Typography.Body>
              </Box>
            )}
          </BottomSheetScrollView>
        )}
      </BottomSheetWithHD>
    </>
  );
};
