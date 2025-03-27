import React from 'react';
import { mockedGoBack } from '../../../../../__mocks__/react-navigation';
import { useCheckUKPermission } from '../../../../common/hooks/useCheckUKPermission';
import { fireEvent, render } from '../../../../common/utils/testing';
import { AgeNotQualifiedScreen } from '../AgeNotQualifiedScreen';

jest.mock('../../../../common/hooks/useCheckUKPermission', () => ({
  useCheckUKPermission: jest.fn(),
}));

describe('Age Not Qualified Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('should render correctly', () => {
    test('for AU', () => {
      (useCheckUKPermission as jest.Mock).mockReturnValue(false);
      const { getByText } = render(<AgeNotQualifiedScreen />);
      expect(getByText("We're sorry, you don't qualify for a Swag Spend account.")).toBeTruthy();
      expect(
        getByText(
          "Your application can't be processed as you need to be over the age of 16 to set up a Swag Spend account."
        )
      ).toBeTruthy();
    });

    test('for UK', () => {
      (useCheckUKPermission as jest.Mock).mockReturnValue(true);
      const { getByText } = render(<AgeNotQualifiedScreen />);
      expect(getByText("We're sorry, you don't qualify for a Swag Spend account.")).toBeTruthy();
      expect(
        getByText(
          "Your application can't be processed as you need to be over the age of 18 to set up a Swag Spend account."
        )
      ).toBeTruthy();
    });
  });

  it('should go back previous screen by clicking Close button', () => {
    const { getByLabelText } = render(<AgeNotQualifiedScreen />);
    const button = getByLabelText('Close');
    fireEvent.press(button);
    expect(mockedGoBack).toBeCalled();
  });
});
