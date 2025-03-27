import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render, renderHook, waitFor } from '../../../../common/utils/testing';
import { useOnboardingStore } from '../../stores/useOnboardingStore';
import { ProfileNameScreen } from '../ProfileNameScreen';

describe('Profile Name Screen', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useOnboardingStore());

    // Prefill valid details for name and mobile to prevent being navigated back
    result.current.personalDetails.firstName = 'MockedFirstName';
    result.current.personalDetails.lastName = 'MockedLastName';
    result.current.personalDetails.middleName = 'MockedMiddleName';
  });

  it('should render properly', async () => {
    const { findByText, getByTestId, getByText } = render(<ProfileNameScreen />);
    expect(getByText('Next')).toBeTruthy();
    expect(getByText('Personal details')).toBeTruthy();
    expect(await findByText(`MockedFirstName, what's your full name as displayed on your ID?`));
    expect(getByText('First name')).toBeTruthy();
    expect(getByText('Middle name or initial')).toBeTruthy();
    expect(getByText('Last name')).toBeTruthy();
    expect(getByTestId('topbar-back-icon')).toBeTruthy();
  });

  it('should go back properly', async () => {
    const { getByTestId } = render(<ProfileNameScreen />);
    const button = getByTestId('topbar-back-icon');

    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });

  it('should handle click properly', async () => {
    const { getByLabelText } = render(<ProfileNameScreen />);
    const button = getByLabelText('Next');

    fireEvent.press(button);
    expect(mockedNavigate).not.toBeCalled();
  });

  it('should replace helper text with error in middle name', async () => {
    const { getByDisplayValue, getByTestId, getByText } = render(<ProfileNameScreen />);

    const textInput = getByTestId(addInputSuffix('middleName'));

    // Wait for the prefilling to be done
    await waitFor(() => {
      expect(getByDisplayValue('MockedMiddleName')).toBeTruthy();
    });

    fireEvent.changeText(textInput, 'InvalidMiddleName*');
    await waitFor(() => {
      expect(getByDisplayValue('InvalidMiddleName*')).toBeTruthy();
    });
    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(getByText('Field cannot contain numbers or special characters')).toBeTruthy();
    });
  });

  test.each([
    { fieldName: 'firstName', value: `O'Nelly`, expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'middleName', value: 'Hey-Name', expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'lastName', value: 'Tran Dang', expected: 'Field cannot contain numbers or special characters' },
  ])('should not show error message: $fieldName, $value', async ({ expected, fieldName, value }) => {
    const { getByDisplayValue, getByTestId, queryByText } = render(<ProfileNameScreen />);

    // Wait for the prefilling to be done
    await waitFor(() => {
      expect(getByDisplayValue('MockedMiddleName')).toBeTruthy();
    });

    const textInput = getByTestId(addInputSuffix(fieldName));
    fireEvent.changeText(textInput, value);

    await waitFor(() => {
      expect(getByDisplayValue(value)).toBeTruthy();
    });

    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(mockedNavigate).not.toBeCalled();
      expect(queryByText(expected)).toBeNull();
    });
  });

  test.each([
    { fieldName: 'firstName', value: '123', expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'middleName', value: '456', expected: 'Field cannot contain numbers or special characters' },
    { fieldName: 'lastName', value: 'A789', expected: 'Field cannot contain numbers or special characters' },
  ])('should show error message: $fieldName, $value', async ({ expected, fieldName, value }) => {
    const { getByDisplayValue, getByTestId, getByText } = render(<ProfileNameScreen />);

    // Wait for the prefilling to be done
    await waitFor(() => {
      expect(getByDisplayValue('MockedMiddleName')).toBeTruthy();
    });

    const textInput = getByTestId(addInputSuffix(fieldName));
    fireEvent.changeText(textInput, value);

    await waitFor(() => {
      expect(getByDisplayValue(value)).toBeTruthy();
    });

    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(mockedNavigate).not.toBeCalled();
      expect(getByText(expected)).toBeTruthy();
    });
  });

  it('should submit success', async () => {
    const { getByLabelText, getByTestId } = render(<ProfileNameScreen />);
    const fieldsName = ['firstName', 'middleName', 'lastName'];
    fieldsName.forEach(fieldName => {
      const textInput = getByTestId(addInputSuffix(fieldName));
      fireEvent.changeText(textInput, fieldName);
    });

    await waitFor(() => {
      const button = getByLabelText('Next');

      fireEvent.press(button);
      expect(mockedNavigate).toBeCalledWith('ProfilePhoneNumber');
    });
  });

  it('should prefill name fields and show error message by default if already set', async () => {
    const { result } = renderHook(() => useOnboardingStore());

    // Prefill valid details for name and mobile to prevent being navigated back
    result.current.personalDetails.firstName = 'ValidFirstName';
    result.current.personalDetails.lastName = 'InvalidLastName*';

    const { getByDisplayValue, getByLabelText, getByText } = render(<ProfileNameScreen />);

    await waitFor(() => {
      expect(getByDisplayValue('ValidFirstName')).toBeTruthy();
      expect(getByDisplayValue('InvalidLastName*')).toBeTruthy();
      expect(getByText('Field cannot contain numbers or special characters')).toBeTruthy();
    });

    const button = getByLabelText('Next');

    fireEvent.press(button);
    expect(mockedNavigate).not.toBeCalled();
  });
});
