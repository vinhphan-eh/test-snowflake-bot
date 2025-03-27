import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { regionLocalisationMockUtil } from '../../../../../test-setup/utils/regionLocalisationMockUtil';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { EditPhoneNumberScreen } from '../EditPhoneNumberScreen';

const setDataDetails = jest.fn();
const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

beforeEach(() => {
  jest.resetAllMocks();
  mockedUseRoute.mockReturnValue({
    params: {
      phoneNumber: {
        code: '+61',
        number: '1231231231',
      },
      updateCallback: setDataDetails,
    },
    key: '',
    name: '',
  });
});

describe('Profile Phone Number Screen', () => {
  beforeEach(() => {
    regionLocalisationMockUtil('AU');
  });

  it('should render properly', () => {
    const { getAllByText, getByTestId, getByText } = render(<EditPhoneNumberScreen />);
    const selectCountry = getByTestId('country-code');
    fireEvent.press(selectCountry);
    const option = getByText('Australia (+61)');

    expect(getAllByText('Mobile number')).toHaveLength(2);
    expect(option).toBeTruthy();
  });

  it('should handle click properly', async () => {
    const { getByLabelText } = render(<EditPhoneNumberScreen />);
    const button = getByLabelText('Save');

    fireEvent.press(button);
    expect(mockedNavigate).not.toBeCalledWith();
  });

  it('should select code correctly', async () => {
    const { getByTestId, getByText } = render(<EditPhoneNumberScreen />);
    fireEvent.press(getByTestId('country-code'));

    fireEvent.press(getByText('Albania (+355)'));

    await waitFor(() => {
      expect(getByText('Albania (+355)')).toBeTruthy();
    });
  });

  it('should submit success', async () => {
    const { getByLabelText, getByTestId } = render(<EditPhoneNumberScreen />);
    const textInput = getByTestId('phoneNumber-input');
    fireEvent.changeText(textInput, '434567890111');

    await waitFor(() => {
      const button = getByLabelText('Save');
      fireEvent.press(button);
      expect(setDataDetails).toBeCalledWith(
        {
          countryCode: 'Australia (+61)',
          number: '434567890111',
        },
        expect.anything()
      );
    });
  });

  it('should remove leading 0 when submit', async () => {
    const { getByLabelText, getByTestId } = render(<EditPhoneNumberScreen />);
    const textInput = getByTestId('phoneNumber-input');
    fireEvent.changeText(textInput, '0488888888');

    await waitFor(() => {
      const button = getByLabelText('Save');
      fireEvent.press(button);
      expect(setDataDetails).toBeCalledWith(
        {
          countryCode: 'Australia (+61)',
          number: '488888888',
        },
        expect.anything()
      );
    });
  });

  describe('UK User', () => {
    beforeEach(() => {
      regionLocalisationMockUtil('GB');
    });

    it('should submit success', async () => {
      const { getByLabelText, getByTestId } = render(<EditPhoneNumberScreen />);
      const textInput = getByTestId('phoneNumber-input');
      fireEvent.changeText(textInput, '734567890111');

      await waitFor(() => {
        const button = getByLabelText('Save');
        fireEvent.press(button);
        expect(setDataDetails).toBeCalledWith(
          {
            countryCode: 'United Kingdom (+44)',
            number: '734567890111',
          },
          expect.anything()
        );
      });
    });

    it('should remove leading 0 when submit', async () => {
      const { getByLabelText, getByTestId } = render(<EditPhoneNumberScreen />);
      const textInput = getByTestId('phoneNumber-input');
      fireEvent.changeText(textInput, '07911123456');

      await waitFor(() => {
        const button = getByLabelText('Save');
        fireEvent.press(button);
        expect(setDataDetails).toBeCalledWith(
          {
            countryCode: 'United Kingdom (+44)',
            number: '7911123456',
          },
          expect.anything()
        );
      });
    });
  });
});
