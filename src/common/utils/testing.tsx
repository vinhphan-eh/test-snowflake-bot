/**
 * Use this test util instead of `@testing-library/react-native`.
 *
 * Function `render` is override with wrapper contains required Providers
 * - `HeroDesignProvider`
 * - `QueryClientProvider`: caching is disabled
 */
import type { PropsWithChildren } from 'react';
import React from 'react';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { HeroDesignProvider, theme } from '@hero-design/rn';
import { NavigationContainer } from '@react-navigation/native';
import type { RenderHookOptions } from '@testing-library/react-hooks';
import { renderHook } from '@testing-library/react-hooks';
import type { RenderAPI, RenderOptions } from '@testing-library/react-native';
import { render } from '@testing-library/react-native';
// eslint-disable-next-line no-restricted-imports
import { IntlProvider } from 'react-intl';
import { QueryClient, QueryClientProvider } from 'react-query';
import { getLocaleMessages } from '../../providers/LocalisationProvider';
import type { SupportedLocaleCode } from '../../providers/LocalisationProvider/constants';
import { FALLBACK_LOCALE } from '../../providers/LocalisationProvider/constants';

const AllTheProviders = ({ children }: PropsWithChildren<unknown>) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        // Disable cache while testing, because caching cause request not send to MSW
        cacheTime: 0,
        staleTime: 0,
        retry: false,
      },
    },
  });
  return (
    <HeroDesignProvider theme={theme}>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <NavigationContainer>{children}</NavigationContainer>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </HeroDesignProvider>
  );
};

export const WithIntlProvider = ({
  children,
  locale = FALLBACK_LOCALE,
}: PropsWithChildren<{ locale?: SupportedLocaleCode }>) => {
  return (
    <AllTheProviders>
      <IntlProvider locale={locale} messages={getLocaleMessages(locale)}>
        {children}
      </IntlProvider>
    </AllTheProviders>
  );
};

/**
 * @deprecated customRenderWithLocalisation is used as default to wrap localisation provider for test suites
 */
export const customRender = (component: React.ReactElement, options?: RenderOptions): RenderAPI => {
  return render(component, { wrapper: AllTheProviders, ...options });
};

export const customRenderWithLocalisation = (
  component: React.ReactElement,
  { locale } = { locale: FALLBACK_LOCALE }
) => {
  return render(<WithIntlProvider locale={locale}>{component}</WithIntlProvider>);
};

/**
 * @deprecated customRenderHookWithLocalisation is used as default to wrap localisation provider for test suites
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const customRenderHook = <TProps, TResult>(callback: (props: TProps) => TResult, options?: RenderHookOptions<TProps>) =>
  renderHook(callback, { wrapper: AllTheProviders as never, ...options });

export const customRenderHookWithLocalisation = <TProps, TResult>(
  callback: (props: TProps) => TResult,
  options?: RenderHookOptions<TProps>
) => renderHook(callback, { wrapper: WithIntlProvider as never, ...options });

export const addInputSuffix = (name: string) => `${name}-input`;

// re-export everything
export * from '@testing-library/react-native';
// override render method
export {
  customRenderWithLocalisation as render,
  customRenderHookWithLocalisation as renderHook,
  customRender as renderWithoutLocalisation,
  customRenderHook as renderHookWithoutLocalisation,
};
