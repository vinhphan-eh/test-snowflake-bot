import React from 'react';
import type { RenderAPI } from '@testing-library/react-native';
import { render } from '../../../../../../common/utils/testing';
import { aShopProductDetails } from '../../../../../../new-graphql/mocks/generated-mocks';
import { ProductDetailsAccordion } from '../ProductDetailsAccordion';

const mockProduct = aShopProductDetails({});

describe(ProductDetailsAccordion, () => {
  let renderApi: RenderAPI;

  beforeEach(() => {
    renderApi = render(<ProductDetailsAccordion product={mockProduct} />);
  });

  it('should render description', () => {
    expect(renderApi.getByTestId('Description')).toBeTruthy();
    if (mockProduct.description) {
      expect(renderApi.getByText(mockProduct.description)).toBeTruthy();
    }
  });

  it('should render how it works', () => {
    expect(renderApi.getByTestId('How it works')).toBeTruthy();
    if (mockProduct.howItWorks) {
      expect(renderApi.getByText(mockProduct.howItWorks)).toBeTruthy();
    }
  });

  it('should render T&C', () => {
    expect(renderApi.getByTestId('Terms and conditions')).toBeTruthy();
    if (mockProduct.termsAndConditions) {
      expect(renderApi.getByText(mockProduct.termsAndConditions)).toBeTruthy();
    }
  });

  it('should render other info', () => {
    expect(renderApi.getByTestId('Other information')).toBeTruthy();
  });
});
