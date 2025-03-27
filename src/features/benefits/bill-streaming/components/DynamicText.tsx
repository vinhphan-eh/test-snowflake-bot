import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Box, Typography } from '@hero-design/rn';
import type { BodyProps } from '@hero-design/rn/types/components/Typography/Body';

type DynamicTextProps = {
  content: string;
  style?: StyleProp<ViewStyle>;
};

type DynamicContent = {
  text: string;
  isUnderline: boolean;
  intent?: BodyProps['intent'];
};

export const DynamicText = ({ content, style }: DynamicTextProps) => {
  // Extract custom string
  function extractStrings(input: string): DynamicContent[] {
    const regex = /u\{(.*?)\}/g;
    const matches = input.matchAll(regex);
    const result: DynamicContent[] = [];
    let originText = input;
    [...matches].forEach(match => {
      const matchedContent = originText.split(match[0]);
      originText = matchedContent[1] ?? '';
      result.push({
        text: matchedContent[0],
        isUnderline: false,
        intent: 'body',
      });
      result.push({
        text: match[1],
        isUnderline: true,
        intent: 'primary',
      });
    });
    if (originText) {
      result.push({ text: originText, isUnderline: false });
    }
    return result;
  }

  const contents = extractStrings(content);

  return (
    <Box style={[style]}>
      <Typography.Body>
        {contents.map(({ intent, isUnderline, text }) => {
          return (
            <Typography.Body
              key={text}
              intent={intent}
              style={{ textDecorationLine: isUnderline ? 'underline' : 'none' }}
            >
              {text}
            </Typography.Body>
          );
        })}
      </Typography.Body>
    </Box>
  );
};
