import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, Dimensions, ImageBackground, ScrollView, StyleSheet, StatusBar, Share } from 'react-native';
import { Button, Accordion, Box, Spinner, Icon, Typography, useTheme } from '@hero-design/rn';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import type { MixedStyleDeclaration } from 'react-native-render-html';
import RenderHtml from 'react-native-render-html';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import images from '../../../../common/assets/images';
import type { BottomSheetRef } from '../../../../common/components/bottom-sheet/BottomSheet';
import { GeneralError } from '../../../../common/components/error';
import { Page } from '../../../../common/components/layout/page';
import { useMixpanel } from '../../../../common/hooks/useMixpanel';
import { queryClient } from '../../../../common/libs/queryClient';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { EventTrackingCategory } from '../../../../common/stores/useSessionStore';
import { formatNumberValue } from '../../../../common/utils/numbers';
import type { GroupDetail } from '../../../../new-graphql/generated';
import {
  useGetGroupDetailQuery,
  useGetUserGroupMembershipAndConsentQuery,
  useJoinGroupWithConsentAgreementMutation,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { CustomInfo } from '../components/group-detail/CustomInfo';
import { GroupIndicator } from '../components/group-detail/GroupIndicator';
import { JoinGroupBottomSheet } from '../components/JoinGroupBottomSheet';
import { CLICK_JOIN_GROUP_BUTTON, EVENT_PREFIX, MODULE_NAME } from '../constants';
import type { GroupNavigationProp, GroupRouteProp } from '../navigation/navigationType';
import { getPositionSuffix } from '../utils/getPositionSuffix';

const { width: screenWidth } = Dimensions.get('screen');
const COVER_HEIGHT = screenWidth * 0.92;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.18,
    shadowRadius: 3,
    elevation: 3,
  },
});

export const GroupDetailScreen = () => {
  const Intl = useIntl();
  const { eventTracking } = useMixpanel();
  const navigation = useNavigation<GroupNavigationProp<'GroupDetailScreen'>>();
  const route = useRoute<GroupRouteProp<'GroupDetailScreen'>>();
  const { borderWidths, colors, fontSizes, radii, space } = useTheme();
  const { bottom: bottomInset, top: topInset } = useSafeAreaInsets();
  const textStyle: MixedStyleDeclaration = { fontSize: fontSizes.large, fontWeight: '400' };
  const overlaySpace = radii.xxxlarge;

  const [accordionOptions, setAccordionOptions] = useState('About');
  const bsRef = useRef<BottomSheetRef>(null);
  const { openUrl } = useInAppBrowser();
  const { group } = route.params;
  const groupId = group.id;
  const [groupData, setGroupData] = useState(group);

  const {
    data: groupDetailData,
    isError,
    isLoading,
  } = useGetGroupDetailQuery({ groupId: groupId ?? '' }, { enabled: !!groupId });

  const { data: userGroupMembershipData, isLoading: isFetchingUserGroupMembership } =
    useGetUserGroupMembershipAndConsentQuery({ groupId });

  const { isLoading: isJoiningGroup, mutateAsync: joinGroupWithConsent } = useJoinGroupWithConsentAgreementMutation();

  const groupDataResponse = groupDetailData?.group?.groupDetail as GroupDetail;
  const userJoinedPosition = userGroupMembershipData?.me?.group?.groupMembership?.position;
  const isJoinedGroup = !!userJoinedPosition;
  const isConsented = userGroupMembershipData?.me?.userGroupConsent?.consented !== undefined;

  useEffect(() => {
    if (groupDataResponse) {
      setGroupData({ ...groupDataResponse, memberAvatars: group?.memberAvatars?.slice(0, 3) });
    }
  }, [groupDataResponse, group]);

  const {
    description,
    howItWorks,
    imageSrc,
    memberAvatars,
    memberCount,
    promoTitle,
    savingPeriod,
    savingRange,
    shareContent,
  } = groupData ?? {};

  const handleJoinGroupWithConsent = async (consented: boolean) => {
    try {
      await joinGroupWithConsent({ input: { groupId }, consented });

      eventTracking({
        event: `${EVENT_PREFIX}#${CLICK_JOIN_GROUP_BUTTON}`,
        categoryName: EventTrackingCategory.USER_ACTION,
        metaData: {
          module: MODULE_NAME,
          groupName: group.promoTitle,
          consented,
        },
      });

      navigation.navigate('JoinGroupSuccessScreen');
      // Refetch all groups data after join group
      queryClient.invalidateQueries(['GetGroupDetail', { groupId }]);
      queryClient.invalidateQueries(['GetUserGroupMembershipAndConsent', { groupId }]);
      queryClient.invalidateQueries(['GetGroups']);
    } catch (error: unknown) {
      if (error instanceof Error) {
        navigation.navigate('JoinGroupFailedScreen', { errorMessage: error.message || 'failed to join group' });
      }
    } finally {
      bsRef?.current?.close();
    }
  };

  const onPressInviteOthers = () => {
    Share.share({
      message: shareContent,
    });
  };

  const onPressJoinGroup = () => {
    if (isConsented) {
      handleJoinGroupWithConsent(true);
    } else {
      bsRef?.current?.open();
    }
  };

  const renderDropdownItem = (item: string): JSX.Element => {
    return (
      <RenderHtml
        tagsStyles={{
          a: {
            color: colors.primary,
            textDecorationColor: colors.primary,
          },
        }}
        renderersProps={{
          a: {
            onPress(_event: unknown, url: string) {
              openUrl(url);
            },
          },
        }}
        baseStyle={textStyle}
        contentWidth={screenWidth}
        source={{ html: item }}
      />
    );
  };

  const accordionItems = useMemo(() => {
    const items = [];
    if (description) {
      items.push({
        header: Intl.formatMessage({ id: 'benefits.group.detail.info.header1' }),
        content: renderDropdownItem(description),
        key: 'About',
        style: {
          borderTopRightRadius: radii.large,
          borderTopLeftRadius: radii.large,
          borderBottomWidth: howItWorks ? borderWidths.base : 0,
          borderColor: howItWorks ? colors.disabledOnDefaultGlobalSurface : undefined,
        },
        testID: 'About',
      });
    }

    if (howItWorks) {
      items.push({
        header: Intl.formatMessage({ id: 'benefits.group.detail.info.header2' }),
        content: renderDropdownItem(howItWorks),
        key: 'How it works',
        testID: 'How it works',
      });
    }

    return items;
  }, [description, howItWorks]);

  const renderBody = () => {
    if (isFetchingUserGroupMembership || (isLoading && !group)) {
      return (
        <Box style={{ width: '100%', height: '80%' }}>
          <Spinner size="small" />
        </Box>
      );
    }

    if (isError) {
      return <GeneralError themeName="eBens" />;
    }

    return (
      <ScrollView
        style={{ backgroundColor: colors.defaultGlobalSurface }}
        contentContainerStyle={{ paddingBottom: bottomInset }}
        testID="group_detail_detail_scrollview"
      >
        <ImageBackground
          resizeMode="cover"
          style={{ width: '100%', height: COVER_HEIGHT, position: 'relative' }}
          source={imageSrc ? { uri: imageSrc } : images.groupDetailCover}
        >
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              opacity: 0.6,
            }}
          />
          <Page.TopBar
            style={{ backgroundColor: 'transparent', marginTop: topInset }}
            hideRight
            customLeft={() => (
              <TouchableOpacity testID="topbar-back-icon" onPress={navigation.goBack}>
                <Icon intent="text-inverted" icon="arrow-left" size="medium" />
              </TouchableOpacity>
            )}
          />
          <GroupIndicator memberCount={memberCount} memberAvatars={memberAvatars} />
          <Typography.Title
            testID="group-detail-promo-title"
            style={{
              position: 'absolute',
              bottom: 0,
              color: 'white',
              marginBottom: space.xxlarge,
              paddingHorizontal: space.medium,
              marginRight: space.xxxlarge,
            }}
            numberOfLines={4}
            typeface="playful"
            level="h2"
          >
            {promoTitle}
          </Typography.Title>
        </ImageBackground>
        <Box
          backgroundColor="defaultGlobalSurface"
          paddingHorizontal="medium"
          paddingVertical="large"
          style={[{ marginTop: -overlaySpace, borderRadius: overlaySpace }, styles.shadow]}
        >
          <Box flexDirection="row" justifyContent="space-evenly">
            {isJoinedGroup ? (
              <CustomInfo
                header={Intl.formatMessage({ id: 'benefits.group.detail.custom.info.header1' })}
                footer={Intl.formatMessage({ id: 'benefits.group.detail.custom.info.footer1' })}
                value={formatNumberValue({ rawValue: userJoinedPosition, delimiter: ',', precision: 0 })}
                suffix={getPositionSuffix(userJoinedPosition)}
              />
            ) : (
              <CustomInfo
                header={Intl.formatMessage({ id: 'benefits.group.detail.custom.info.header3' })}
                footer={Intl.formatMessage({ id: 'benefits.group.detail.custom.info.footer1' })}
                value={formatNumberValue({ rawValue: memberCount + 1, delimiter: ',', precision: 0 })}
                suffix={getPositionSuffix(memberCount + 1)}
              />
            )}
            <CustomInfo
              header={Intl.formatMessage({ id: 'benefits.group.detail.custom.info.header2' })}
              footer={savingPeriod}
              value={savingRange.substring(0, savingRange.length - 1)}
              suffix={savingRange.charAt(savingRange.length - 1)}
            />
          </Box>
          {isJoinedGroup ? (
            <Button
              variant="outlined"
              style={{ marginTop: space.medium }}
              text={Intl.formatMessage({ id: 'benefits.group.detail.invite.others.button' })}
              onPress={onPressInviteOthers}
            />
          ) : (
            <Button
              testID="join-group-button"
              loading={isJoiningGroup}
              style={{ marginTop: space.medium }}
              text={Intl.formatMessage({ id: 'benefits.group.detail.join.group.button' })}
              onPress={onPressJoinGroup}
            />
          )}
        </Box>
        <Box marginTop="medium">
          <Accordion items={accordionItems} activeItemKey={accordionOptions} onItemPress={setAccordionOptions} />
        </Box>
        <JoinGroupBottomSheet bsRef={bsRef} isLoading={isJoiningGroup} onConfirm={handleJoinGroupWithConsent} />
      </ScrollView>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      {renderBody()}
    </>
  );
};
