import React, { useMemo, useState } from 'react';
import { Dimensions } from 'react-native';
import { Accordion, useTheme } from '@hero-design/rn';
import RenderHtml, { type MixedStyleDeclaration } from 'react-native-render-html';
import type { ShopProductDetails } from '../../../../../new-graphql/generated';
import { useIntl } from '../../../../../providers/LocalisationProvider';
import { useSwagStoreTracking } from '../../hooks/useSwagStoreTracking';

const { width: screenWidth } = Dimensions.get('window');

type Props = {
  product: Partial<ShopProductDetails>;
};

export const ProductDetailsAccordion = ({ product }: Props) => {
  const { borderWidths, colors, fontSizes, radii, space } = useTheme();
  const [activeAccordionKey, setActiveAccordionKey] = useState('');
  const { trackClickDropdown } = useSwagStoreTracking();
  const { formatMessage } = useIntl();

  const textStyle: MixedStyleDeclaration = useMemo(
    () => ({
      fontSize: fontSizes.medium,
      fontWeight: '400',
    }),
    [fontSizes]
  );

  const onItemPress = (key: string) => {
    trackClickDropdown(key, {
      productName: product.title ?? '',
      productCategory: product.productType ?? '',
    });
    setActiveAccordionKey(key);
  };

  return (
    <Accordion
      testID="product-details-accordion"
      style={{ marginTop: space.large, marginHorizontal: space.medium }}
      items={[
        {
          header: formatMessage({ id: 'benefits.swagStore.product.description' }),
          content: (
            <RenderHtml baseStyle={textStyle} contentWidth={screenWidth} source={{ html: product.description ?? '' }} />
          ),
          key: 'Description',
          style: {
            borderTopRightRadius: radii.large,
            borderTopLeftRadius: radii.large,
            borderBottomWidth: borderWidths.base,
            borderColor: colors.disabledOnDefaultGlobalSurface,
          },
          testID: 'Description',
        },
        {
          header: formatMessage({ id: 'benefits.swagStore.product.howItWorks' }),
          content: (
            <RenderHtml baseStyle={textStyle} contentWidth={screenWidth} source={{ html: product.howItWorks ?? '' }} />
          ),

          key: 'How it works',
          style: {
            borderBottomWidth: borderWidths.base,
            borderColor: colors.disabledOnDefaultGlobalSurface,
          },
          testID: 'How it works',
        },
        {
          header: formatMessage({ id: 'benefits.swagStore.product.termsAndConditions' }),
          content: (
            <RenderHtml
              baseStyle={textStyle}
              contentWidth={screenWidth}
              source={{ html: product.termsAndConditions ?? '' }}
            />
          ),
          key: 'Terms and conditions',
          style: {
            borderBottomWidth: borderWidths.base,
            borderColor: colors.disabledOnDefaultGlobalSurface,
          },
          testID: 'Terms and conditions',
        },
        {
          header: formatMessage({ id: 'benefits.swagStore.product.otherInformation' }),
          content: (
            <RenderHtml
              baseStyle={textStyle}
              contentWidth={screenWidth}
              source={{
                html: formatMessage(
                  { id: 'benefits.swagStore.product.otherInfoDescription' },
                  { serviceFee: product.serviceFee ?? 0 }
                ),
              }}
            />
          ),
          key: 'Other information',
          style: {
            borderBottomRightRadius: radii.large,
            borderBottomLeftRadius: radii.large,
          },
          testID: 'Other information',
        },
      ]}
      activeItemKey={activeAccordionKey}
      onItemPress={onItemPress}
    />
  );
};
