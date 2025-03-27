import React from 'react';
import type { ListRenderItem, StyleProp, ViewStyle } from 'react-native';
import { FlatList } from 'react-native';
import { Box, Typography, useTheme } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { GroupItem } from './GroupItem';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import type { RootStackNavigationProp } from '../../../../../navigation/navigationTypes';
import type { TCustomGroupDetail } from '../../hooks/useGroupsData';
import { useGroupsData } from '../../hooks/useGroupsData';
import { useIsAbleToShowGroups } from '../../hooks/useIsAbleToShowGroups';
import { GroupItemSkeleton } from '../skeletons/GroupItemSkeleton';

type GroupListProps = {
  title: string;
  style?: StyleProp<ViewStyle>;
};

const TILE_WIDTH = 265;

const GroupList = ({ style, title }: GroupListProps) => {
  const { space } = useTheme();
  const navigation = useNavigation<RootStackNavigationProp<'dashboard'>>();

  const { groups, isLoading, isLoadingError } = useGroupsData();
  const isEmptyAfterFetch = groups.length === 0 && !isLoading && !isLoadingError;

  if (isEmptyAfterFetch) {
    return null;
  }

  const onPressItem = (item: TCustomGroupDetail) => {
    navigation.navigate('BenefitsStack', {
      screen: 'GroupStack',
      params: {
        screen: 'GroupDetailScreen',
        params: {
          group: item,
        },
      },
    });
  };

  const renderItem: ListRenderItem<TCustomGroupDetail> = ({ index, item }) => {
    return (
      <GroupItem
        testID={`megadeal-group-item-${index}`}
        group={item}
        onPress={() => onPressItem(item)}
        style={{ width: TILE_WIDTH, marginLeft: space.medium }}
      />
    );
  };

  const renderBody = () => {
    if (isLoading) {
      return (
        <>
          <Typography.Body style={{ marginHorizontal: space.medium, marginBottom: space.medium }} variant="small">
            {title}
          </Typography.Body>
          <Box flexDirection="row">
            <GroupItemSkeleton style={{ marginLeft: space.medium }} />
            <GroupItemSkeleton style={{ marginLeft: space.medium }} />
          </Box>
        </>
      );
    }

    if (isLoadingError) {
      return null;
    }

    return (
      <>
        <Typography.Body style={{ marginHorizontal: space.medium }} variant="small">
          {title}
        </Typography.Body>
        <FlatList<TCustomGroupDetail>
          horizontal
          data={groups}
          keyExtractor={(item, index) => `${item.id}${index}`}
          accessibilityRole="menu"
          renderItem={renderItem}
          contentContainerStyle={{ padding: space.medium, paddingLeft: 0, paddingBottom: space.small }}
          showsHorizontalScrollIndicator={false}
        />
      </>
    );
  };

  return (
    <Box testID="group-list" style={style}>
      {renderBody()}
    </Box>
  );
};

const GroupListWrapper = ({ style, title }: GroupListProps) => {
  const isAbleToShowGroups = useIsAbleToShowGroups();
  const toggleMegaDealsGroupsPermission = usePermissionStore(
    state => state.permissions?.toggleMegaDealsCommunitiesCtas?.view
  );

  if (!isAbleToShowGroups) {
    return null;
  }

  if (!toggleMegaDealsGroupsPermission) {
    return null;
  }

  return <GroupList style={style} title={title} />;
};

export { GroupListWrapper as GroupList };
