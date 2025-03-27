import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import { SelectCountryBottomSheet } from './SelectCountryBottomSheet';
import { useGetSuperAppToken } from '../../common/auth/store/useSuperAppTokenStore';
import type { BottomSheetRef } from '../../common/components/bottom-sheet/BottomSheet';
import { queryClient } from '../../common/libs/queryClient';
import ThemeSwitcher from '../../common/utils/ThemeSwitcher';
import { useGetEhProfileQuery, usePatchProfileMutation } from '../../new-graphql/generated';

export type CountryPickerHandlers = {
  open: () => void;
};

export const CountryPickerCon = forwardRef<CountryPickerHandlers, unknown>((_, ref) => {
  const btsRef = useRef<BottomSheetRef>(null);
  const { token } = useGetSuperAppToken('CountryPickerCon');

  useImperativeHandle(ref, () => ({
    open: () => {
      btsRef.current?.open();
    },
  }));

  const { mutateAsync } = usePatchProfileMutation();

  const onSelectCountry = async (code: string) => {
    if (token) {
      await mutateAsync({ patch: { countryCode: code } });
      queryClient.invalidateQueries(useGetEhProfileQuery.getKey());
    }
  };

  return (
    <ThemeSwitcher name="swag">
      <SelectCountryBottomSheet
        btsRef={btsRef}
        onSelectCountry={onSelectCountry}
        title="Country of residence"
        description="Some features may be unavailable based on the country selected. Please contact support to update this."
      />
    </ThemeSwitcher>
  );
});
