import React from 'react';
import type { Control } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { render, renderHook } from '../../../../common/utils/testing';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import type { FormInput } from '../../screens/EditResidentialAddressManualScreen';
import { PostcodeInput } from '../PostcodeInput';

describe('PostcodeInput', () => {
  it('should render correctly for AU users', () => {
    const { result } = renderHook(() => useForm());

    const { getByText } = render(
      <PostcodeInput
        currentRegion={Region.au}
        control={result.current.control as unknown as Control<FormInput>}
        keyboardType="numeric"
        maxLength={4}
      />
    );

    expect(getByText('Postcode')).toBeTruthy();
    expect(getByText('0/4')).toBeTruthy();
  });

  it('should render correctly for UK users', () => {
    const { result } = renderHook(() => useForm());

    const { getByText } = render(
      <PostcodeInput
        currentRegion={Region.gb}
        control={result.current.control as unknown as Control<FormInput>}
        maxLength={8}
      />
    );

    expect(getByText('Postcode')).toBeTruthy();
    expect(getByText('0/8')).toBeTruthy();
  });
});
