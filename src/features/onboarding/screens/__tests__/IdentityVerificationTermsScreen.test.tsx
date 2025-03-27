import React from 'react';
import { mockReset } from '../../../../../__mocks__/react-navigation';
import { expectHeroButton } from '../../../../../test-setup/utils/expectHeroButton';
import { fireEvent, render } from '../../../../common/utils/testing';
import { IdentityVerificationTermsScreen } from '../IdentityVerificationTermsScreen';

describe('Identity Verification Term', () => {
  it('should render properly', () => {
    const { getByLabelText, getByTestId, getByText } = render(<IdentityVerificationTermsScreen />);
    expect(getByText('Almost there! Please read and consent to our identity verification terms.')).toBeTruthy();
    expect(getByTestId('onlineTerm')).toBeTruthy();
    expect(getByTestId('identity-verification-ck-box')).toBeTruthy();
    expectHeroButton(getByLabelText('Submit')).toBeDisabled();
  });

  it('should navigate to CheckingDetails screen', () => {
    const { getByLabelText, getByTestId } = render(<IdentityVerificationTermsScreen />);
    const consentCheckbox = getByTestId('identity-verification-ck-box');
    fireEvent.press(consentCheckbox);

    const button = getByLabelText('Submit');
    fireEvent.press(button);

    expect(mockReset).toBeCalledWith({
      index: 0,
      routes: [
        {
          name: 'VerifyIdentityDocumentInfo',
        },
      ],
    });
  });
});
