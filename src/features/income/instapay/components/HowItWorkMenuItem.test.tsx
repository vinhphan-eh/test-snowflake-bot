import React from 'react';
import { act, renderHook } from '@testing-library/react-hooks';
import { HowItWorkMenuItem } from './HowItWorkMenuItem';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { Region } from '../../../../providers/LocalisationProvider/constants';
import { useInstaPayDrawdownStore } from '../stores/useInstaPayDrawdownStore';

describe('HowItWorkMenuItem', () => {
  it('should display bottom sheet when click', async () => {
    const { getByLabelText, getByText } = render(
      <HowItWorkMenuItem withdrawalMaxLimit={1000} withdrawalMinLimit={100} />
    );
    const howItWorkBtn = getByText('How it works');

    act(() => {
      fireEvent.press(howItWorkBtn);
    });

    await waitFor(() => {
      expect(getByLabelText('How it works content scroll view')).toBeTruthy();
    });
  });

  describe('should display correct content', () => {
    test.each([
      {
        workCountry: Region.au,
        text: 'A fee is charged per transaction depending on what account you nominate your funds be deposited into - 1.3% to your Swag Spend Account or 1.5% to all other bank accounts.',
      },
      {
        workCountry: Region.gb,
        text: 'A fee is charged per transaction depending on what account you nominate your funds be deposited into - 1.3% to your Swag Spend Account or 1.5% to all other bank accounts.',
      },
    ])('when user work country is $workCountry', async ({ text, workCountry }) => {
      const { result: instaPayStore } = renderHook(() => useInstaPayDrawdownStore());
      act(() => {
        instaPayStore.current.setWorkCountry(workCountry);
      });

      const { getByText } = render(<HowItWorkMenuItem withdrawalMaxLimit={1000} withdrawalMinLimit={100} />);
      const howItWorkBtn = getByText('How it works');

      act(() => {
        fireEvent.press(howItWorkBtn);
      });

      await waitFor(() => {
        expect(getByText(text)).toBeTruthy();
      });
    });
  });
});
