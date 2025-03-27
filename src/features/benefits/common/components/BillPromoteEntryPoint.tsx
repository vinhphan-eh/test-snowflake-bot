import React, { useCallback, useRef, useState } from 'react';
import type { ViewStyle, StyleProp, ViewToken } from 'react-native';
import { Dimensions, FlatList } from 'react-native';
import { Box, PageControl, Spinner, Typography, useTheme } from '@hero-design/rn';
import { BillPromoTile } from './BillPromoTile';
import { WaitlistStatiscalCard } from './WaitlistStatiscalCard';
import useBrandName from '../../../../common/hooks/useBrandName';
import { Pid, useGetHomeTilesQuery, useGetPromotionQuery } from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useBillPromotionPermission } from '../../bill-streaming/hooks/useBillPromotionPermission';
import { useBillStreamPermissionByProvider } from '../../bill-streaming/hooks/useBillStreamPermission';

const screenWidth = Dimensions.get('screen').width;

type WaitlistEntryPointProps = {
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const BillPromoteEntryPoint = ({ style, testID }: WaitlistEntryPointProps) => {
  const { colors, space } = useTheme();
  const [currentPage, setCurrentPage] = useState(0);
  const Intl = useIntl();
  const { isFetched: isBillAhmPermissionFetched, permission: billAhmPromoTilePermission } =
    useBillStreamPermissionByProvider(Pid.Ahm);
  const { isFetched: isBillMedibankPermissionFetched, permission: billMedibankPromoTilePermission } =
    useBillStreamPermissionByProvider(Pid.Medibank);
  const { isFetched: isBillENGIEPermissionFetched, permission: billENGIEPermission } =
    useBillStreamPermissionByProvider(Pid.SimplyEnergy);
  const brandName = useBrandName();

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: Array<ViewToken> }) => {
    if (viewableItems.length > 0) {
      setCurrentPage(viewableItems[0].index || 0);
    }
  }, []);

  const viewabilityConfigCallbackPairs = useRef([
    { viewabilityConfig: { itemVisiblePercentThreshold: 50 }, onViewableItemsChanged },
  ]);

  const { data: promotionContent } = useGetPromotionQuery();

  const { homeSubTitle: homeSubTitlePromotion, homeTitle: homeTitlePromotion } = promotionContent?.me?.billManagement
    ?.promotion ?? {
    homeSubTitle: '',
    homeTitle: '',
  };

  const { havingPermission: isPromotion } = useBillPromotionPermission(Pid.SimplyEnergy);

  const { data: getHomeTilesData } = useGetHomeTilesQuery();

  const homeTiles = getHomeTilesData?.me?.billManagement?.homeTiles.tiles || [];

  const items: JSX.Element[] = [];

  const isFetched = isBillAhmPermissionFetched && isBillMedibankPermissionFetched && isBillENGIEPermissionFetched;

  homeTiles.forEach(tile => {
    const { banner, provider, subTitle, title } = tile;
    switch (provider.id) {
      case Pid.Ahm:
        if (billAhmPromoTilePermission) {
          items.push(
            <BillPromoTile
              title={title}
              subTitle={subTitle}
              bannerUrl={banner}
              testID="ahm-promote"
              key="ahm-promote"
              providerId={provider.id}
              offerId="2"
            />
          );
        }
        break;
      case Pid.Medibank:
        if (billMedibankPromoTilePermission) {
          items.push(
            <BillPromoTile
              title={title}
              subTitle={subTitle}
              bannerUrl={banner}
              testID="medibank-promote"
              key="medibank-promote"
              providerId={provider.id}
              offerId="3"
            />
          );
        }
        break;
      case Pid.SimplyEnergy:
        if (billENGIEPermission) {
          items.push(
            <BillPromoTile
              title={isPromotion ? homeTitlePromotion : title}
              subTitle={isPromotion ? homeSubTitlePromotion : subTitle}
              bannerUrl={banner}
              testID="simply-energy-promote"
              key="caro2"
              providerId={provider.id}
              offerId="1"
            />
          );
        }
        break;
      default:
        break;
    }
  });

  if (!isFetched) {
    return (
      <Box style={{ height: 120 }}>
        <Spinner testID="spinner" size="small" />
      </Box>
    );
  }

  if (items.length === 0) {
    return null;
  }

  return (
    <Box
      style={[
        {
          backgroundColor: colors.decorativePrimarySurface,
          paddingTop: space.large,
          flex: 1,
        },
        style,
      ]}
      testID={testID}
    >
      <Typography.Title
        style={[{ justifyContent: 'space-between', textAlign: 'center' }]}
        level="h4"
        typeface="playful"
        accessibilityLabel={Intl.formatMessage({ id: 'benefits.bill.revolutionising' })}
      >
        {Intl.formatMessage({ id: 'benefits.bill.revolutionising' })}
      </Typography.Title>
      <Typography.Body style={{ textAlign: 'center' }} typeface="neutral" variant="small" numberOfLines={2}>
        {Intl.formatMessage({ id: 'benefits.bill.join2MSwaggers' }, { brandName })}
      </Typography.Body>
      <Box style={{ marginTop: space.small, zIndex: 2 }} flexDirection="row" justifyContent="space-evenly">
        <WaitlistStatiscalCard
          title="2,000,000"
          description={Intl.formatMessage({ id: 'benefits.bill.swagMembers' }, { brandName })}
          testID="waitlist-statistical-card"
        />
        <WaitlistStatiscalCard
          title="3"
          testID="waitlist-statistical-card"
          description={Intl.formatMessage({ id: 'benefits.bill.dealsWeAchieved' })}
        />
      </Box>
      <FlatList
        renderItem={({ item }) => {
          return <Box style={{ width: screenWidth, alignItems: 'center', justifyContent: 'center' }}>{item}</Box>;
        }}
        style={{ zIndex: 1, marginTop: -20 }}
        showsHorizontalScrollIndicator={false}
        horizontal
        data={items}
        bounces={false}
        disableIntervalMomentum
        snapToInterval={screenWidth}
        decelerationRate="fast"
        keyExtractor={(_item, index) => `carousel-item-${index}`}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
        scrollEventThrottle={32}
        pagingEnabled
        testID="carousel-flatlist"
      />
      {items.length > 1 ? (
        <Box alignItems="center" style={{ marginTop: space.medium }}>
          <PageControl numberOfPages={items.length} currentPage={currentPage} testID="page-control-indicator" />
        </Box>
      ) : null}
    </Box>
  );
};
