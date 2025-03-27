import {
  addBreadcrumb as sentryAddBreadcrumb,
  captureException,
  captureMessage,
  withScope,
} from '@sentry/react-native';
import { appVersion } from '../libs/appVersion';

/**
 * Log exception (as in, an Error) to Sentry with optional metadata
 * @param error
 * @param meta
 */
export const logException = (error: unknown, meta: Record<string, unknown> = {}) => {
  withScope(scope => {
    scope.setTag('team', 'eben');
    scope.setTag('ebenMiniAppVersion', appVersion.CURRENT_PERSONAL_VERSION);
    captureException(error, {
      extra: meta,
    });
  });
};

/**
 * Log error message to Sentry with optional metadata
 * @param msg
 * @param extra
 */
export const logError = (msg: string, extra?: Record<string, unknown>) => {
  withScope(scope => {
    scope.setTag('team', 'eben');
    scope.setTag('ebenMiniAppVersion', appVersion.CURRENT_PERSONAL_VERSION);
    captureMessage(msg, {
      extra,
      level: 'error',
    });
  });
};

/**
 * Log info message to Sentry with optional metadata
 * @param msg
 * @param extra
 */
export const logInfo = (msg: string, extra?: Record<string, unknown>) => {
  withScope(scope => {
    scope.setTag('team', 'eben');
    scope.setTag('ebenMiniAppVersion', appVersion.CURRENT_PERSONAL_VERSION);
    captureMessage(msg, {
      extra,
      level: 'info',
    });
  });
};

export const addBreadcrumb = (params: { message: string; data: Record<string, unknown> }) => {
  const { data, message } = params;
  sentryAddBreadcrumb({
    message,
    data,
  });
};

export const createSentryError = (title: string, subTitle: string) => {
  const error = new Error(subTitle);
  error.name = title;
  return error;
};
