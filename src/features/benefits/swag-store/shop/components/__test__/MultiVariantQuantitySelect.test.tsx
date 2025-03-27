import React, { useState } from 'react';
import { fireEvent, render, renderHook } from '../../../../../../common/utils/testing';
import { aShopProductDetails, aShopProductVariant } from '../../../../../../new-graphql/mocks/generated-mocks';
import { MultiVariantWithQuantitySelect } from '../MultiVariantQuantitySelect';
import type { VariantsWithQuantity } from '../VariantQuantitySelect';

const generateVariant = (quantity: number, numberInStock: number): VariantsWithQuantity => {
  return {
    ...aShopProductVariant({
      description: 'this is the description',
      label: 'Movie Ticket',
    }),
    selectedQuantity: quantity,
    stockAvailable: numberInStock > 0,
    numberInStock,
    currency: 'AUD',
    serviceFee: 1.1,
  };
};

describe('MultiVariantQuantitySelect', () => {
  const product = aShopProductDetails();

  describe('variant options', () => {
    it('should render correctly', async () => {
      const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(1, 3)];

      const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
      const { getByText } = render(
        <MultiVariantWithQuantitySelect
          allVariants={variantsWithQuantityState.current[0]}
          product={product}
          onQuantityChanged={() => {}}
        />
      );

      expect(getByText('Ticket types')).toBeTruthy();

      fireEvent.press(getByText('Ticket types'));

      expect(getByText('Movie Ticket')).toBeTruthy();
      expect(getByText('this is the description')).toBeTruthy();
    });
  });
});
