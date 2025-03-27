import React from 'react';
import { GeneralError } from '../common/components/error';
import type { ThemeName } from '../common/types/hero-design';
import { logError } from '../common/utils/sentry';

type ErrorBoundaryProps = {
  themeName: ThemeName;
  children: React.ReactNode;
  onCtaPress?: () => void;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /**
   * Catch any uncaught error
   *
   * @param {Error} error
   * @memberof ErrorBoundaries
   */
  componentDidCatch(error: Error) {
    logError(`eBenErrorBoundary: ${error}`, { error });
  }

  render() {
    if (this.state.hasError) {
      return <GeneralError themeName={this.props.themeName} onCtaPress={this.props.onCtaPress} />;
    }

    return this.props.children;
  }
}

export const withErrorBoundary = (
  C: React.ComponentType<Record<string, unknown>>,
  themeName: ThemeName,
  onCtaPress?: () => void
) => (
  <ErrorBoundary themeName={themeName} onCtaPress={onCtaPress}>
    <C />
  </ErrorBoundary>
);
