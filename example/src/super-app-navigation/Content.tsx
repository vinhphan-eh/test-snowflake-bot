/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Typography, Button, useTheme } from '@hero-design/rn';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { PillarIds, PILLARS } from './constants';
import { useEbfPillarPermission } from '../../../src/common/hooks/useEbfPillarPermission';

const Item = ({
  id,
  name,
  icon,
  color,
  hideContent,
  setCurrentPillarId,
}: {
  id: PillarIds;
  name: string;
  icon: string;
  color: string;
  hideContent: () => void;
  setCurrentPillarId: React.Dispatch<React.SetStateAction<PillarIds>>;
}) => {
  const theme = useTheme();
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Button.Icon
        // @ts-ignore:next-line
        icon={icon}
        testID={`test-id-${id}`}
        intent={icon === 'swag' ? 'text-inverted' : 'text'}
        size={icon === 'swag' ? 'xsmall' : 'medium'}
        onPress={() => {
          setCurrentPillarId(id);
          hideContent();
        }}
        style={{
          width: theme.space.xlarge * 2,
          height: theme.space.xlarge * 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: color,
          borderRadius: 100,
        }}
      />
      <Typography.Body
        variant="small"
        style={{ paddingTop: theme.space.small }}>
        {name}
      </Typography.Body>
    </View>
  );
};

const Content = ({
  hideContent,
  style,
  currentPillarId,
  setCurrentPillarId,
}: {
  hideContent: () => void;
  style?: StyleProp<ViewStyle>;
  currentPillarId: PillarIds;
  setCurrentPillarId: React.Dispatch<React.SetStateAction<PillarIds>>;
}) => {
  const theme = useTheme();
  const { benefitsPillarPermission } = useEbfPillarPermission();
  const pillars = PILLARS(benefitsPillarPermission).filter(
    e => e.id !== currentPillarId,
  );

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          width: '100%',
          padding: theme.space.medium,
        },
        style,
      ]}>
      {pillars.map(item => {
        return (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            icon={item.icon}
            color={item.color}
            hideContent={hideContent}
            setCurrentPillarId={setCurrentPillarId}
          />
        );
      })}
    </View>
  );
};

export default Content;
