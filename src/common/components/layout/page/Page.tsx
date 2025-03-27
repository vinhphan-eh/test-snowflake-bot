import type { ReactNode } from 'react';
import React, { forwardRef } from 'react';
import type { ScrollViewProps, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { ScrollView, View } from 'react-native';
import type { Box } from '@hero-design/rn';
import { useTheme } from '@hero-design/rn';
import PageBody from './PageBody';
import PageFooter from './PageFooter';
import PageTitle from './PageTitle';
import PageTopBar from './PageTopBar';
import { useDetectVisibleKeyboard } from '../../../shared-hooks/useDetectVisibleKeyboard';

type PageBaseProps = ScrollViewProps & {
  /**
   * Container style
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Page title: equivalent to Page.Title, support combine text, renders nothing when not provided
   */
  title?: string | ReactNode;
  /**
   * Title Style
   */
  titleStyle?: StyleProp<TextStyle>;
  /**
   * Page body: equivalent to Page.Body, renders nothing when not provided
   */
  body?: () => ReactNode;
  /**
   * Body Style
   */
  bodyStyle?: StyleProp<ViewStyle>;
  /**
   * Footer: equivalent to Page.Footer, always at bottom, renders nothing when not provided
   */
  footer?: () => ReactNode;
  /**
   * Footer Style
   */
  footerStyle?: StyleProp<ViewStyle>;
  /**
   * Adding children replace shorthand props title, body, footer
   */
  children?: ReactNode;
  /**
   * A unique string that appears as a data attribute testID in the rendered code
   */
  testID?: string;
};

type PageProps = PageBaseProps & {
  /**
   * Container Title Style
   */
  containerTitleStyle?: React.ComponentProps<typeof Box>;
};

/**
 * @description Template helps align page content, for (gradual) design migration from Page
 * @extends ScrollView
 * @usage use shorthand props for title, body, footer or Page.Title, Page.Body, Page.Footer
 */
const PageRef = forwardRef<ScrollView, PageProps>(
  (
    {
      body,
      bodyStyle,
      children,
      containerTitleStyle,
      footer,
      footerStyle,
      style,
      testID,
      title,
      titleStyle,
      ...scrollViewProps
    },
    ref
  ) => {
    const { colors, space } = useTheme();
    const isKeyboardVisible = useDetectVisibleKeyboard();

    return (
      <ScrollView
        ref={ref}
        alwaysBounceVertical={false}
        {...scrollViewProps}
        // leave this below spread props to avoid destroy prop
        testID={testID}
        contentContainerStyle={[
          {
            flexGrow: 1,
            // override this with paddingHorizontal, padding won't work
            paddingHorizontal: space.medium,
            paddingBottom: space.medium,
          },
          scrollViewProps.contentContainerStyle,
        ]}
        style={[
          { flex: 1, backgroundColor: colors.defaultSurface, marginBottom: -1, borderWidth: 0 },
          style,
          // KeyboardAvoiding pushes bottom up with content so when keyboard opens, should remove all bottom of Page
          isKeyboardVisible && { paddingBottom: 0, marginBottom: 0 },
        ]}
      >
        {children ?? (
          <>
            {title ? (
              <PageTitle containerTitleStyle={containerTitleStyle} style={titleStyle}>
                {title}
              </PageTitle>
            ) : null}
            {body ? <PageBody style={bodyStyle}>{body()}</PageBody> : <View style={{ flex: 1 }} />}
            {footer ? <PageFooter style={footerStyle}>{footer()}</PageFooter> : null}
          </>
        )}
      </ScrollView>
    );
  }
);

interface CommpoundPageHDProps extends React.ForwardRefExoticComponent<PageProps & React.RefAttributes<ScrollView>> {
  TopBar: typeof PageTopBar;
  Title: typeof PageTitle;
  Body: typeof PageBody;
  Footer: typeof PageFooter;
}

const Page = {
  ...PageRef,
  TopBar: PageTopBar,
  Title: PageTitle,
  Body: PageBody,
  Footer: PageFooter,
} as CommpoundPageHDProps;

export default Page;
