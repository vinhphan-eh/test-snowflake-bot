import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import * as passCodeStore from '../../../../common/screens/passcode/stores/usePasscodeStore';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { useGetMoneyProfileQuery, useUpdateWalletProfileMutation } from '../../../../new-graphql/generated';
import { MoneyProfile } from '../../MoneyProfile';

jest.mock('../../../../new-graphql/generated', () => ({
  ...jest.requireActual('../../../../new-graphql/generated'),
  useGetMoneyProfileQuery: jest.fn(),
  useUpdateWalletProfileMutation: jest.fn(),
}));

const userProfile = {
  dateOfBirth: '1995-09-20',
  firstName: 'Khoa',
  lastName: 'Tran',
  phoneNumber: {
    countryCode: '+84',
    number: '987654321',
  },
  residentialAddress: {
    unitNumber: '123',
    streetNumber: '456',
    streetName: 'street name',
    streetType: 'street type',
    townOrCity: 'HCM',
    region: 'SA',
    postcode: '1234',
    country: 'Vietnam',
  },
};

const changeRequests = [
  {
    type: 'NAME',
    name: {
      firstName: 'Khoathuhai',
      lastName: 'Tran',
    },
  },
  {
    type: 'DATE_OF_BIRTH',
    dateOfBirth: '1995-09-21',
  },
];
const result = {
  me: {
    profileChangeRequests: {
      requests: changeRequests,
    },
    details: userProfile,
  },
};

describe('Money Profile', () => {
  describe('user has change requests', () => {
    beforeEach(() => {
      (useGetMoneyProfileQuery as unknown as jest.Mock).mockReturnValue({
        data: result,
        isLoading: false,
      });
      (useUpdateWalletProfileMutation as jest.Mock).mockResolvedValue({});
    });

    it('should open passcode for first time', async () => {
      const spyOpenPasscode = jest.spyOn(passCodeStore, 'openEbenPasscode');

      render(<MoneyProfile onExitPasscode={() => {}} />);

      await waitFor(() => {
        expect(spyOpenPasscode).toHaveBeenCalledWith(true, expect.anything(), expect.anything());
      });
    });

    it('should render correctly', async () => {
      jest.spyOn(React, 'useState').mockImplementation(() => [true, () => {}]);

      const { getByText } = render(<MoneyProfile onExitPasscode={() => {}} />);

      expect(getByText('Full name')).toBeTruthy();
      expect(getByText('Khoa Tran')).toBeTruthy();
      expect(getByText('Mobile number')).toBeTruthy();
      expect(getByText('+84987654321')).toBeTruthy();
      expect(getByText('Residential address')).toBeTruthy();
      expect(getByText('123/456 street name street type, HCM SA 1234')).toBeTruthy();
      expect(getByText('Birthday')).toBeTruthy();
      expect(getByText('20 Sep 1995')).toBeTruthy();
    });

    it('should render spinner while loading', async () => {
      jest.spyOn(React, 'useState').mockImplementation(() => [true, () => {}]);

      (useGetMoneyProfileQuery as unknown as jest.Mock).mockReturnValue({
        data: result,
        isLoading: true,
      });
      const { getByTestId } = render(<MoneyProfile onExitPasscode={() => {}} />);
      expect(getByTestId('spinner')).toBeTruthy();
    });

    it('should navigate to Waiting', async () => {
      jest.spyOn(React, 'useState').mockImplementation(() => [true, () => {}]);

      const { getByText } = render(<MoneyProfile onExitPasscode={() => {}} />);

      fireEvent.press(getByText('Khoa Tran'));

      expect(mockedNavigate).toHaveBeenCalledWith('Waiting', { isNameChanged: true, onBack: expect.anything() });
    });
  });

  describe('user has not have change requests', () => {
    beforeEach(() => {
      (useGetMoneyProfileQuery as unknown as jest.Mock).mockReturnValue({
        data: {
          me: {
            profileChangeRequests: {
              requests: [],
            },
            details: userProfile,
          },
        },
        isLoading: false,
      });
      (useUpdateWalletProfileMutation as jest.Mock).mockResolvedValue({});
    });

    it('should open edit Name', () => {
      jest.spyOn(React, 'useState').mockImplementation(() => [true, () => {}]);
      const { getByText } = render(<MoneyProfile onExitPasscode={() => {}} />);

      fireEvent.press(getByText('Khoa Tran'));

      expect(mockedNavigate).toHaveBeenCalledWith('EditName', {
        name: {
          firstName: 'Khoa',
          lastName: 'Tran',
          middleName: '',
        },
        updateCallback: expect.anything(),
        pageTitle: 'Your name',
        topBarTitle: 'Edit',
        navigationTo: {
          screen: 'Waiting',
          params: {
            isNameChanged: true,
            onBack: expect.anything(),
          },
        },
      });
    });

    it('should open edit DoB', () => {
      jest.spyOn(React, 'useState').mockImplementation(() => [true, () => {}]);

      const { getByText } = render(<MoneyProfile onExitPasscode={() => {}} />);

      fireEvent.press(getByText('20 Sep 1995'));

      expect(mockedNavigate).toHaveBeenCalledWith('EditDoB', {
        dateOfBirth: '1995-09-20',
        updateCallback: expect.anything(),
        pageTitle: 'Your birthday',
        topBarTitle: 'Edit',
        navigationTo: {
          screen: 'Waiting',
          params: {
            onBack: expect.anything(),
          },
        },
      });
    });
  });
});
