import React from 'react';
import type { Control } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { render, renderHook, waitFor } from '../../../../common/utils/testing';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import type { FormInput } from '../../screens/EditResidentialAddressManualScreen';
import { StateRegionInput } from '../StateRegionInput';

describe('StateRegionInput', () => {
  it('should render correctly for AU users', async () => {
    const { result } = renderHook(() => useForm());

    const { getByLabelText, getByText } = render(
      <StateRegionInput
        control={result.current.control as unknown as Control<FormInput>}
        label="Suburb"
        currentRegion={Region.au}
        marginRight="medium"
      />
    );

    await waitFor(() => {
      expect(getByText('Suburb')).toBeTruthy();
      expect(getByLabelText('region-input-container').props.marginRight).toBe('medium');
    });
  });

  it('should render correctly for UK users', async () => {
    const { result } = renderHook(() => useForm());

    const { getByLabelText, getByText } = render(
      <StateRegionInput
        control={result.current.control as unknown as Control<FormInput>}
        label="Town/City"
        currentRegion={Region.gb}
      />
    );

    await waitFor(() => {
      expect(getByText('Town/City')).toBeTruthy();
      expect(getByLabelText('region-input-container').props.marginRight).toBeUndefined();
    });
  });
});
