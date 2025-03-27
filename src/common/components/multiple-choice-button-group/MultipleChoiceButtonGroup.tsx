import React from 'react';
import { Pressable } from 'react-native';
import { Box, Icon, Typography, useTheme } from '@hero-design/rn';
import type { BoxProps } from '@hero-design/rn/types/components/Box';
import type { IconProps } from '@hero-design/rn/types/components/Icon';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';

interface Choice {
  label: string;
  selected?: boolean;
}

type MultipleChoiceButtonGroupTheme = 'default' | 'interest-bearing-experiment';

interface MultipleChoiceButtonGroupProps {
  choices: Choice[];
  onChoicePressed: (key: string) => void;
  theme?: MultipleChoiceButtonGroupTheme;
}

type ModeThemeProps = {
  [theme in MultipleChoiceButtonGroupTheme]: {
    backgroundColor: BoxProps['backgroundColor'];
    selectedBackgroundColor: BoxProps['backgroundColor'];
    iconIntent: IconProps['intent'];
    captionIntent: BodyProps['intent'];
    selectedCaptionIntent: BodyProps['intent'];
    selectedCaptionMarginHorizontal: number;
    captionMarginHorizontal: number;
  };
};

const ChoiceItem = ({
  choice: { label, selected },
  onChoicePressed,
  theme,
}: {
  choice: Choice;
  onChoicePressed: (choiceKey: string) => void;
  theme: MultipleChoiceButtonGroupTheme;
}) => {
  const { space } = useTheme();

  const modeThemeColor = {
    default: {
      backgroundColor: 'defaultGlobalSurface',
      selectedBackgroundColor: 'highlightedSurface',
      iconIntent: 'text',
      captionIntent: 'body',
      selectedCaptionIntent: 'body',
      selectedCaptionMarginHorizontal: 0,
      captionMarginHorizontal: 0,
    },
    'interest-bearing-experiment': {
      backgroundColor: 'decorativePrimarySurface',
      selectedBackgroundColor: 'darkGlobalSurface',
      iconIntent: 'text-inverted',
      captionIntent: 'body',
      selectedCaptionIntent: 'inverted',
      selectedCaptionMarginHorizontal: 0,
      captionMarginHorizontal: space.xsmall,
    },
  } as ModeThemeProps;

  return (
    <Pressable onPress={() => onChoicePressed(label)}>
      <Box
        flexDirection="row"
        alignItems="center"
        borderWidth="base"
        borderColor={selected ? 'highlightedSurface' : 'inactiveOutline'}
        borderRadius="rounded"
        paddingVertical="small"
        paddingHorizontal="smallMedium"
        backgroundColor={modeThemeColor[theme][selected ? 'selectedBackgroundColor' : 'backgroundColor']}
        marginTop="smallMedium"
        marginRight="small"
      >
        {selected && (
          <Icon
            intent={modeThemeColor[theme].iconIntent}
            icon="checkmark"
            size="xsmall"
            style={{ marginRight: space.small }}
          />
        )}
        <Typography.Body
          variant="small"
          intent={modeThemeColor[theme][selected ? 'selectedCaptionIntent' : 'captionIntent']}
          style={{
            marginHorizontal:
              modeThemeColor[theme][selected ? 'selectedCaptionMarginHorizontal' : 'captionMarginHorizontal'],
          }}
        >
          {label}
        </Typography.Body>
      </Box>
    </Pressable>
  );
};

export const MultipleChoiceButtonGroup = ({ choices, onChoicePressed, theme }: MultipleChoiceButtonGroupProps) => {
  return (
    <Box flexDirection="row" flexWrap="wrap">
      {choices.map(choice => {
        return (
          <ChoiceItem theme={theme ?? 'default'} key={choice.label} choice={choice} onChoicePressed={onChoicePressed} />
        );
      })}
    </Box>
  );
};
