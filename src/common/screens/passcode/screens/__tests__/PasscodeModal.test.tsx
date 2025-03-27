import React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { render } from '../../../../utils/testing';
import { usePasscodeStore } from '../../stores/usePasscodeStore';
import { PasscodeModal } from '../PasscodeModal';

describe('Passcode Modal', () => {
  it('should show Passcode screen when requirePasscode', () => {
    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    passcodeStore.current.requirePasscode = true;
    const { getByTestId } = render(<PasscodeModal />);

    expect(getByTestId('passcode_modal')).toHaveProperty('props.visible', true);
  });

  it('should not show Passcode screen when not requirePasscode', () => {
    const { result: passcodeStore } = renderHook(() => usePasscodeStore());
    passcodeStore.current.requirePasscode = false;
    const { queryByTestId } = render(<PasscodeModal />);

    expect(queryByTestId('passcode_modal')).toBeNull();
  });
});
