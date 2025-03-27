import type { ReactElement } from 'react';
import type { FormatXMLElementFn, Options as IntlMessageFormatOptions, PrimitiveType } from 'intl-messageformat';
// eslint-disable-next-line no-restricted-imports
import type { MessageFormatElement } from 'react-intl';
// eslint-disable-next-line no-restricted-imports
import { useIntl as useIntlLib } from 'react-intl';
import type { LocaleMessageID } from '../constants';

interface MessageDescriptor {
  id?: LocaleMessageID;
  description?: string | object;
  defaultMessage?: string | MessageFormatElement[];
}

export const useIntl = () => {
  const { formatMessage: formatMessageIntl } = useIntlLib();

  return {
    formatMessage(
      descriptor: MessageDescriptor,
      values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string> | ReactElement>,
      opts?: IntlMessageFormatOptions
    ): string {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return formatMessageIntl(descriptor, values, opts);
    },
  };
};

export type FormatMessageFuncType = (
  descriptor: MessageDescriptor,
  values?: Record<string, PrimitiveType | FormatXMLElementFn<string, string> | ReactElement>,
  opts?: IntlMessageFormatOptions
) => string;
