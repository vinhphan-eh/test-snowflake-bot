import React from 'react';
import type { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import { Image, Pressable } from 'react-native';
import type { IconName } from '@hero-design/rn';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';

export type DataCardItem = {
  label?: string;
  content: string | React.ReactChild;
  bottomLabel?: string | React.ReactChild;
  capitalizeContent?: boolean;
};

type DataItemProps = {
  index: number;
  label: string;
  content: string | React.ReactChild;
  labelPosition: 'first' | 'last';
  hideIcon: boolean;
  bottomLabel?: string | React.ReactChild;
  thumbnailSource?: ImageSourcePropType;
  capitalizeContent?: boolean;
};

const DataItem = ({
  bottomLabel,
  capitalizeContent = false,
  content,
  hideIcon,
  index,
  label,
  labelPosition,
  thumbnailSource,
}: DataItemProps) => {
  const { space } = useTheme();
  const isLabelFirst = labelPosition === 'first';
  const flexDirection = isLabelFirst ? 'column' : 'column-reverse';
  // prevent long label overlay icon:  label position: first
  const shouldRestrictLabelWidth = isLabelFirst;
  // prevent long content overlay icon: no label or label position: last
  const shouldRestrictContentWidth = !label || !isLabelFirst;
  const marginTopLabel = isLabelFirst ? 0 : space.small;
  // no label case, should have 0 margin
  const marginTopContent = isLabelFirst && label ? space.small : 0;

  // if hideIcon, margin should be 0
  const marginRightLabel = shouldRestrictLabelWidth && !hideIcon ? space.xlarge : 0;
  const marginRightContent = shouldRestrictContentWidth && !hideIcon ? space.xlarge : 0;

  const contentWidth = thumbnailSource ? '90%' : '100%';

  const bottomLabelDisplay =
    typeof bottomLabel === 'string' ? (
      <Typography.Caption style={{ marginTop: space.small }}>{bottomLabel}</Typography.Caption>
    ) : (
      bottomLabel
    );

  return (
    <Box testID={`vstack_container_${index + 1}`} flexDirection={flexDirection}>
      {label ? (
        <Typography.Caption
          testID={`card_label_${index + 1}`}
          intent="subdued"
          style={{
            marginTop: marginTopLabel,
            marginRight: marginRightLabel,
          }}
        >
          {label}
        </Typography.Caption>
      ) : null}
      <Box style={{ width: contentWidth }}>
        <Typography.Body
          testID={`card_content_${index + 1}`}
          style={{
            marginTop: marginTopContent,
            marginRight: marginRightContent,
            ...(capitalizeContent ? { textTransform: 'capitalize' } : {}),
          }}
          variant="regular-bold"
        >
          {content}
        </Typography.Body>
      </Box>
      {bottomLabel ? bottomLabelDisplay : null}
    </Box>
  );
};

type DataCardProps = {
  /**
   * this prop enables multiple line mode
   */
  data: Array<DataCardItem>;
  /**
   * icon to replace default icon
   */
  iconName?: IconName;
  /**
   * container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * determine whether disable this card
   */
  disabled?: boolean;
  /**
   * a string to add test id to component
   */
  testID?: string;
  /**
   * on press action
   */
  onPress?: () => void;
  /**
   * A label in a localized string that identifies the accessibility element
   */
  accessibilityLabel?: string;
  /**
   * Helps users understand what will happen when they perform an action on the accessibility element when that result is not clear from the accessibility label.
   */
  accessibilityHint?: string;
  /**
   * used for test only, pressed state
   */
  testOnly_pressed?: boolean;
  /**
   * determine position of label
   */
  labelPosition?: 'first' | 'last';
  /**
   *  determine whether to hide icon of this card
   */
  hideIcon?: boolean;
  /**
   * able to display the whole image according to size or in 88px
   */
  imageContain?: boolean;
  /**
   * displays thumbnail image (image link)
   */
  thumbnailSource?: ImageSourcePropType;
  /**
   * Remove shadow from card
   */
  noShadow?: boolean;
} & BoxProps;

/**
 * @description DataCard
 */
const DataCard = ({
  accessibilityHint,
  accessibilityLabel,
  data,
  disabled,
  hideIcon = false,
  iconName = 'edit-template-outlined',
  imageContain,
  labelPosition = 'first',
  noShadow,
  onPress = () => {},
  style,
  testID,
  testOnly_pressed,
  thumbnailSource,
  ...boxProps
}: DataCardProps) => {
  const { colors, radii, shadows, space } = useTheme();

  const backgroundColor = (isPressed: boolean) => {
    if (isPressed) {
      return colors.highlightedSurface;
    }
    return colors.defaultGlobalSurface;
  };

  const renderItems = () => {
    return data.map((e, index) => {
      const isLastItem = index === data.length - 1;
      return (
        <Box marginBottom={isLastItem ? undefined : 'smallMedium'} key={`${e.label}${e.content}`}>
          <DataItem
            index={index}
            label={e.label ?? ''}
            content={e.content}
            labelPosition={labelPosition}
            hideIcon={hideIcon}
            bottomLabel={e.bottomLabel}
            thumbnailSource={thumbnailSource}
            capitalizeContent={e.capitalizeContent}
          />
        </Box>
      );
    });
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      accessibilityLabel={accessibilityLabel}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled }}
      testOnly_pressed={testOnly_pressed}
      {...boxProps}
      testID={testID}
      style={({ pressed }) => [
        noShadow ? undefined : shadows.default,
        {
          backgroundColor: backgroundColor(pressed),
          padding: space.medium,
          borderRadius: radii.large,
        },
        style,
      ]}
    >
      <Box flexDirection="row">
        {thumbnailSource ? (
          <Image
            resizeMode={imageContain ? 'contain' : undefined}
            accessibilityLabel="Thumbnail"
            style={{ width: 88, height: 88, marginRight: space.medium }}
            source={thumbnailSource}
          />
        ) : null}
        <Box flexDirection="column" flex={1}>
          {renderItems()}
        </Box>
      </Box>
      {!hideIcon && (
        <Box style={{ position: 'absolute', right: space.medium, top: space.medium }}>
          <Icon
            intent={disabled ? 'disabled-text' : 'primary'}
            size="small"
            accessibilityLabel="icon"
            icon={iconName}
          />
        </Box>
      )}
    </Pressable>
  );
};

export { DataCard };
