import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { mockUseGetSuperAppToken } from '../../../../common/auth/store/__mocks__/useSuperAppTokenStore';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { act, fireEvent, render } from '../../../../common/utils/testing';
import { IdentityDocumentType } from '../../../../new-graphql/generated';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { TaxObligationsScreen } from '../TaxObligationsScreen';

jest.mock('../../../../new-graphql/generated', () => ({
  IdentityDocumentType: { DrivingLincense: 'DrivingLincense' },
}));

useSessionStore.setState({ currentUser: { loginProvider: 'eh', userID: 'fake' }, currentOrgId: 'fake' });

const personalDetails = {
  firstName: 'test',
  lastName: 'test',
  middleName: undefined,
  phoneNumber: {
    countryCode: 'Australia (+61)',
    number: '123455664',
  },
  residentialAddress: {
    region: 'SA',
    country: 'vietnam',
    longForm: 'address 1',
    postcode: '1111',
    townOrCity: 'saigon',
    unitNumber: '123',
    streetNumber: 'streetNumber',
    streetName: 'streetName',
    streetType: 'streetType',
  },
  dateOfBirth: '1995/05/20',
  identityDocumentNumber: '',
  identityDocumentType: IdentityDocumentType.DrivingLicense,
};

describe('Tax Obligations Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    mockUseGetSuperAppToken.mockReturnValue({
      token: 'asdas',
      loginProvider: 'eh',
    });
  });
  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render properly', () => {
    const { getByText } = render(<TaxObligationsScreen />);
    expect(getByText('Do you have tax obligations outside of Australia?')).toBeTruthy();
  });

  it('should navigate Tax obligations entry screen', () => {
    const { getByTestId } = render(<TaxObligationsScreen />);
    const button = getByTestId('tax-obligation-yes');
    fireEvent.press(button);
    expect(mockedNavigate).toHaveBeenCalledWith('TaxObligationsEntry');
  });

  it('should go back previous screen by using back chevron', () => {
    const { getByTestId } = render(<TaxObligationsScreen />);
    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);
    expect(mockedGoBack).toHaveBeenCalled();
  });

  it('should go to ProfileDetailsScreen', () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails,
      });
    });

    const { getByTestId } = render(<TaxObligationsScreen />);
    const nextButton = getByTestId('tax-obligation-no');

    act(() => {
      fireEvent.press(nextButton);
    });

    expect(mockedNavigate).toHaveBeenCalledWith('PersonalDetails');
  });

  it('should go to ProfileNameScreen', () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: {
          ...personalDetails,
          lastName: '',
        },
      });
    });
    const { getByTestId } = render(<TaxObligationsScreen />);
    const nextButton = getByTestId('tax-obligation-no');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith('ProfileName');
  });

  it('should go to ProfileDoBScreen', () => {
    act(() => {
      useOnboardingStore.setState({
        personalDetails: {
          ...personalDetails,
          dateOfBirth: '',
        },
      });
    });
    const { getByTestId } = render(<TaxObligationsScreen />);
    const nextButton = getByTestId('tax-obligation-no');

    fireEvent.press(nextButton);

    expect(mockedNavigate).toHaveBeenCalledWith('ProfileDoB');
  });
});
