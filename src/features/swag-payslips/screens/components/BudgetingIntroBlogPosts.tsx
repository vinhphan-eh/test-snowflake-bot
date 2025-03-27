import React, { useMemo } from 'react';
import { Image, TouchableOpacity, FlatList } from 'react-native';
import { Box, scale, Typography, useTheme } from '@hero-design/rn';
import images from '../../../../common/assets/images';
import { useInAppBrowser } from '../../../../common/shared-hooks/useInAppBrowser';
import { useIntl } from '../../../../providers/LocalisationProvider';
import { useTrackPayslipsExperiment } from '../../hooks/useTrackPayslipsExperiment';

const BLOG_BUDGETING_LINK = 'https://swagapp.com/blog/budgeting-in-a-cost-of-living-crisis/';
const BLOG_COST_OF_LIVING_IN_AUTRALIA_LINK = 'https://swagapp.com/blog/cost-of-living-in-australia/';
const BLOG_BULLETPROOF_BUDGET_LINK = 'https://swagapp.com/blog/how-to-create-a-bulletproof-budget/';

export const BudgetingIntroBlogPosts = ({ isShowInstapayTile }: { isShowInstapayTile: boolean }) => {
  const theme = useTheme();
  const Intl = useIntl();
  const { openUrl } = useInAppBrowser();
  const { trackVisitBudgetingIntroScreen } = useTrackPayslipsExperiment();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const BLOG_POSTS: { title: string; readTime: string; image: any; onPress: () => void }[] = useMemo(
    () => [
      {
        title: Intl.formatMessage({ id: 'budgetingIntro.blogTitle1' }),
        readTime: Intl.formatMessage({ id: 'budgetingIntro.blogReadTime1' }),
        image: images.budgetingBlog1,
        onPress: () => {
          openUrl(BLOG_BUDGETING_LINK);
          trackVisitBudgetingIntroScreen({
            website: '10 Tips for Budgeting',
            'InstaPay Available': isShowInstapayTile,
          });
        },
      },
      {
        title: Intl.formatMessage({ id: 'budgetingIntro.blogTitle2' }),
        readTime: Intl.formatMessage({ id: 'budgetingIntro.blogReadTime2' }),
        image: images.budgetingBlog2,
        onPress: () => {
          openUrl(BLOG_COST_OF_LIVING_IN_AUTRALIA_LINK);
          trackVisitBudgetingIntroScreen({
            website: 'Cost of Living',
            'InstaPay Available': isShowInstapayTile,
          });
        },
      },
      {
        title: Intl.formatMessage({ id: 'budgetingIntro.blogTilte3' }),
        readTime: Intl.formatMessage({ id: 'budgetingIntro.blogReadTime3' }),
        image: images.budgetingBlog3,
        onPress: () => {
          openUrl(BLOG_BULLETPROOF_BUDGET_LINK);
          trackVisitBudgetingIntroScreen({
            website: 'Bulletproof Budget',
            'InstaPay Available': isShowInstapayTile,
          });
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Intl, openUrl, isShowInstapayTile]
  );

  return (
    <FlatList
      testID="list-shortcut"
      data={BLOG_POSTS}
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginTop: theme.space.xxlarge, flexGrow: 0 }}
      keyExtractor={item => {
        return item.title;
      }}
      renderItem={({ index, item }) => {
        return (
          <TouchableOpacity
            testID={`blog-link-${index}`}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: theme.colors.defaultGlobalSurface,
              borderRadius: theme.radii.xlarge,
              padding: theme.space.small,
              height: scale(172),
              marginLeft: index === 0 ? theme.space.medium : 0,
              marginRight: theme.space.medium,
            }}
            onPress={item.onPress}
          >
            <Image
              source={item.image}
              resizeMode="contain"
              style={{
                width: scale(154),
                height: '100%',
                marginRight: theme.space.smallMedium,
                borderRadius: theme.radii.medium,
              }}
            />
            <Box flex={1} justifyContent="space-between" style={{ width: scale(149) }}>
              <Typography.Body variant="small-bold">{item.title}</Typography.Body>
              <Typography.Caption intent="subdued" style={{ marginBottom: theme.space.small }}>
                {item.readTime}
              </Typography.Caption>
            </Box>
          </TouchableOpacity>
        );
      }}
    />
  );
};
