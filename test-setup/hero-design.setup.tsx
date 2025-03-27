/* eslint-disable react/prefer-stateless-function */
/* eslint-disable max-classes-per-file */
// testing guideline
// https://github.com/Thinkei/hero-design/blob/534cab1dbdf083af8cfa2f77379b31a673fd2bc9/packages/website-next/docs/mobile/02-Guidelines/Testing.mdx
import React from 'react';

jest.mock('react-native-pager-view', () => {
  const RealComponent = jest.requireActual('react-native-pager-view').default;
  const React = jest.requireActual('react');

  return class ViewPager extends React.Component<{
    children: React.ReactNode;
  }> {
    index = 0;

    setPage = (page: number) => {
      const { children } = this.props;

      this.index = Math.max(0, Math.min(page, React.Children.count(children)));
    };

    setPageWithoutAnimation = (page: number) => {
      const { children } = this.props;

      this.index = Math.max(0, Math.min(page, React.Children.count(children)));
    };

    render() {
      const { children } = this.props;
      return <RealComponent>{children}</RealComponent>;
    }
  };
});

jest.mock('react-native-vector-icons', () => ({
  createIconSet: jest.fn(() => 'HeroIcon'),
}));

jest.mock('@react-native-community/slider', () => {
  const React = jest.requireActual('react');
  return class Slider extends React.Component {
    render() {
      return React.createElement('Slider', this.props, this.props.children);
    }
  };
});

jest.mock('react-native-webview', () => {
  const { View } = require('react-native');

  return {
    WebView: ({ renderLoading, source, startInLoadingState, testID, ...rest }: any) => (
      <>
        {startInLoadingState && renderLoading()}
        <View testID={testID} source={source} {...rest} />
      </>
    ),
  };
});
