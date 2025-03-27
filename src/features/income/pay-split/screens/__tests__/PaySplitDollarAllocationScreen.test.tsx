import React from 'react';
import { mockedGoBack, mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { addInputSuffix, fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import * as flowHook from '../../hooks/usePaySplitFlowStore';
import { PaySplitDollarAllocationScreen, VALIDATION_MSG_MINIMUM } from '../PaySplitDollarAllocationScreen';

describe('Dollar Allocation Screen', () => {
  beforeEach(() => {
    jest.spyOn(flowHook, 'usePaySplitFlowStore').mockReturnValue({
      edit: jest.fn(),
      finishEditing: jest.fn(),
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<PaySplitDollarAllocationScreen />);

    expect(getByText('Pay Split')).toBeTruthy();
    expect(getByText('How much of your pay would you like to split into your Swag Spend account?')).toBeTruthy();
    expect(getByText('The remaining amount will be deposited into your other nominated accounts.')).toBeTruthy();
  });

  it('should enable next button after entering an amount', async () => {
    const screen = render(<PaySplitDollarAllocationScreen />);

    expect(screen.getByLabelText('Next')).toBeDisabled();

    const textInput = screen.getByTestId(addInputSuffix('dollar-amount'));
    fireEvent(textInput, 'changeText', '100');
    fireEvent(textInput, 'blur');

    const nextBtn = screen.getByLabelText('Next');
    fireEvent.press(nextBtn);

    // bottom sheet
    const gotIt = screen.getByText('Got it!');
    fireEvent.press(gotIt);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('PaySplitOrgList');
    });
    screen.unmount();
  });

  it('should validate input', async () => {
    const screen = render(<PaySplitDollarAllocationScreen />);

    expect(screen.getByLabelText('Next')).toBeDisabled();

    const textInput = screen.getByTestId(addInputSuffix('dollar-amount'));
    fireEvent.changeText(textInput, 'xyz');
    await waitFor(() => expect(screen.getByDisplayValue('')).toBeTruthy());
    fireEvent(textInput, 'blur');

    await waitFor(() => {
      expect(screen.getByLabelText('Next')).toBeDisabled();
    });

    fireEvent.changeText(textInput, '0.1');
    await waitFor(() => expect(screen.getByDisplayValue('0.1')).toBeTruthy());
    fireEvent(textInput, 'blur');
    await waitFor(() => {
      expect(screen.queryByText(VALIDATION_MSG_MINIMUM)).toBeTruthy();
      expect(screen.getByLabelText('Next')).toBeDisabled();
    });

    // now the happy path
    fireEvent.changeText(textInput, '1');
    await waitFor(() => expect(screen.getByDisplayValue('1')).toBeTruthy());
    fireEvent(textInput, 'blur');
    await waitFor(() => {
      expect(screen.getByLabelText('Next')).toBeEnabled();
    });
  });

  it('should able to go back', async () => {
    const { getByTestId } = render(<PaySplitDollarAllocationScreen />);

    const button = getByTestId('topbar-back-icon');
    fireEvent.press(button);

    await waitFor(() => {
      expect(mockedGoBack).toBeCalled();
    });
  });
});
