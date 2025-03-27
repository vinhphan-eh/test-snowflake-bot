import React, { useState } from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { render, renderHook } from '../../../../../../common/utils/testing';
import { aShopProductDetails, aShopProductVariant } from '../../../../../../new-graphql/mocks/generated-mocks';
import { VariantQuantitySelect, type VariantsWithQuantity } from '../VariantQuantitySelect';

const generateVariant = (quantity: number, numberInStock: number): VariantsWithQuantity => {
  return {
    ...aShopProductVariant(),
    selectedQuantity: quantity,
    stockAvailable: numberInStock > 0,
    numberInStock,
    currency: 'AUD',
    serviceFee: 1.1,
  };
};

describe(VariantQuantitySelect, () => {
  const product = aShopProductDetails();
  describe('when only variant', () => {
    it('should render', () => {
      const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(1, 3)];

      const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
      const { getByText } = render(
        <VariantQuantitySelect
          variantsWithQuantity={variantsWithQuantityState.current[0]}
          product={product}
          onQuantityChanged={variantsWithQuantityState.current[1]}
        />
      );

      expect(getByText('Quantity')).toBeTruthy();
    });

    describe('when add quantity', () => {
      it('should able to increase quantity', async () => {
        const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(1, 3)];

        const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
        const { getByTestId } = render(
          <VariantQuantitySelect
            variantsWithQuantity={variantsWithQuantityState.current[0]}
            product={product}
            onQuantityChanged={variantsWithQuantityState.current[1]}
          />
        );

        const addButton = getByTestId('add-quantity-button');

        fireEvent.press(addButton);

        await waitFor(() => {
          expect(variantsWithQuantityState.current[0][0].selectedQuantity).toBe(2);
        });
      });

      it('should not exceed number in stock', async () => {
        const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(3, 3)];

        const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
        const { getByTestId } = render(
          <VariantQuantitySelect
            variantsWithQuantity={variantsWithQuantityState.current[0]}
            product={product}
            onQuantityChanged={variantsWithQuantityState.current[1]}
          />
        );

        const addButton = getByTestId('add-quantity-button');

        fireEvent.press(addButton);

        await waitFor(() => {
          expect(variantsWithQuantityState.current[0][0].selectedQuantity).toBe(3);
        });
      });
    });

    describe('when remove quantity', () => {
      it('should able to decrease quantity', async () => {
        const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(2, 3)];

        const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
        const { getByTestId } = render(
          <VariantQuantitySelect
            variantsWithQuantity={variantsWithQuantityState.current[0]}
            product={product}
            onQuantityChanged={variantsWithQuantityState.current[1]}
          />
        );

        const removeButton = getByTestId('remove-quantity-button');

        fireEvent.press(removeButton);

        await waitFor(() => {
          expect(variantsWithQuantityState.current[0][0].selectedQuantity).toBe(1);
        });
      });

      it('should not below 0', async () => {
        const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(0, 3)];

        const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
        const { getByTestId } = render(
          <VariantQuantitySelect
            variantsWithQuantity={variantsWithQuantityState.current[0]}
            product={product}
            onQuantityChanged={variantsWithQuantityState.current[1]}
          />
        );

        const removeButton = getByTestId('remove-quantity-button');

        fireEvent.press(removeButton);

        await waitFor(() => {
          expect(variantsWithQuantityState.current[0][0].selectedQuantity).toBe(0);
        });
      });
    });

    describe('manually input', () => {
      it('should revert when input invalid integer', async () => {
        const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(2, 3)];

        const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
        const { getByTestId } = render(
          <VariantQuantitySelect
            variantsWithQuantity={variantsWithQuantityState.current[0]}
            product={product}
            onQuantityChanged={variantsWithQuantityState.current[1]}
          />
        );

        const manualInput = getByTestId('quantity-text-input');

        fireEvent.changeText(manualInput, 'a');
        fireEvent(manualInput, 'onBlur');

        await waitFor(() => {
          expect(variantsWithQuantityState.current[0][0].selectedQuantity).toBe(2);
        });
      });

      it('should increase quantity to number in stock when input more than stock', async () => {
        const variantsWithQuantity: VariantsWithQuantity[] = [generateVariant(2, 3)];

        const { result: variantsWithQuantityState } = renderHook(() => useState(variantsWithQuantity));
        const { getByTestId } = render(
          <VariantQuantitySelect
            variantsWithQuantity={variantsWithQuantityState.current[0]}
            product={product}
            onQuantityChanged={variantsWithQuantityState.current[1]}
          />
        );

        const manualInput = getByTestId('quantity-text-input');

        fireEvent.changeText(manualInput, '4');
        fireEvent(manualInput, 'onBlur');

        await waitFor(() => {
          expect(variantsWithQuantityState.current[0][0].selectedQuantity).toBe(3);
        });
      });
    });
  });

  describe('when multiple variants', () => {});
});
