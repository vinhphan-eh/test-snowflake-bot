import React, { useMemo, type ReactElement } from 'react';
import { Pressable } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';

type HeaderTabProps = {
  text: string;
  isCurrentTab: boolean;
  onSelect: () => void;
};

const HeaderTab = ({ isCurrentTab = false, onSelect, text }: HeaderTabProps) => {
  return (
    <Pressable
      onPress={onSelect}
      style={{
        flex: 1,
      }}
      testID={`header-tab-${text}`}
    >
      <Box
        alignItems="center"
        paddingVertical="small"
        borderBottomWidth="medium"
        borderBottomColor={isCurrentTab ? 'primary' : 'secondaryOutline'}
      >
        <Typography.Body variant={isCurrentTab ? 'regular-bold' : 'regular'}>{text}</Typography.Body>
      </Box>
    </Pressable>
  );
};

export type CustomTabItem = {
  key: string;
  name: string;
  body?: ReactElement;
  onPressed?: () => void;
};

type CustomTabsProps = {
  selectedTabKey: string;
  setSelectedTabKey: (index: string) => void;
  tabs: CustomTabItem[];
};

/**
 * This is a workaround as <Tabs/> HD component does not support dynamic height body for section-level usages.
 * The design for this component clones the one from HD but without sliding animation to support dynamic height
 * based on body's content
 */
export const CustomTabs = ({ selectedTabKey, setSelectedTabKey, tabs }: CustomTabsProps) => {
  const selectedTabDetails = useMemo(() => {
    return tabs.find(item => item.key === selectedTabKey);
  }, [selectedTabKey, tabs]);
  const { space } = useTheme();

  const renderBodyContent = () => {
    const getPaddingTop = () => {
      if (!selectedTabDetails?.body) {
        return tabs?.length > 1 ? space.xxsmall : 0;
      }

      return tabs?.length > 1 ? space.large : space.medium;
    };

    return (
      <Box
        paddingBottom="smallMedium"
        style={{
          paddingTop: getPaddingTop(),
        }}
      >
        {selectedTabDetails?.body}
      </Box>
    );
  };

  return (
    <Box>
      {tabs?.length > 1 && (
        <Box
          testID="custom-tabs-header"
          justifyContent="space-evenly"
          flex={1}
          flexDirection="row"
          flexGrow={1}
          flexShrink={1}
        >
          {tabs.map(tab => (
            <HeaderTab
              key={`tab-${tab.key}`}
              onSelect={() => {
                setSelectedTabKey(tab.key);
                tab.onPressed?.();
              }}
              text={tab.name}
              isCurrentTab={selectedTabKey === tab.key}
            />
          ))}
        </Box>
      )}

      {renderBodyContent()}
    </Box>
  );
};
