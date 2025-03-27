import React from 'react';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { PureSalarySacrificeIntroScreen } from '../SalarySacrificeIntroScreen';

describe('PureSalarySacrificeIntroScreen', () => {
  it('step 1 should render correctly', async () => {
    const props = {
      isSeen: false,
      onIntroClose: jest.fn(),
      onIntroIgnore: jest.fn(),
      selectedItemIndex: 0,
    };
    const { getByLabelText, getByText, queryByText } = render(<PureSalarySacrificeIntroScreen {...props} />);
    expect(getByLabelText('Salary Sacrifice Intro')).toBeTruthy();

    expect(getByText('What is salary sacrifice?')).toBeTruthy();

    expect(
      getByText(
        'Salary sacrificing is one of the benefits of superannuation. It’s an agreement between you and your employer that they will contribute some of your income to your super before it is taxed.'
      )
    ).toBeTruthy();
    expect(queryByText(`I'm not ready`)).toBeFalsy();
    expect(queryByText('Request now')).toBeFalsy();
    expect(queryByText('Close')).toBeFalsy();
  });

  it('step 2 should render correctly', async () => {
    const props = {
      isSeen: false,
      onIntroClose: jest.fn(),
      onIntroIgnore: jest.fn(),
      selectedItemIndex: 1,
    };
    const { getByLabelText, getByText, queryByText } = render(<PureSalarySacrificeIntroScreen {...props} />);
    expect(getByLabelText('Salary Sacrifice Intro')).toBeTruthy();

    expect(getByText('Why should I contribute?')).toBeTruthy();

    expect(
      getByText(
        'Contributions made through salary sacrifice are taxed at 15% which for most people is lower than their usual tax rate. You benefit because you pay less tax while boosting your retirement savings.'
      )
    ).toBeTruthy();
    expect(queryByText(`I'm not ready`)).toBeFalsy();
    expect(queryByText('Request now')).toBeFalsy();
    expect(queryByText('Close')).toBeFalsy();
  });

  it('step 3 should render correctly', async () => {
    const props = {
      isSeen: false,
      onIntroClose: jest.fn(),
      onIntroIgnore: jest.fn(),
      selectedItemIndex: 2,
    };
    const { getByLabelText, getByText, queryByText } = render(<PureSalarySacrificeIntroScreen {...props} />);
    expect(getByLabelText('Salary Sacrifice Intro')).toBeTruthy();

    expect(getByText('How does it work?')).toBeTruthy();

    expect(
      getByText(
        'Requesting salary sacrifice is easy. Just tell us how much you want to contribute and when to start and stop. The details will be sent to your payroll admin and they’ll get you set up.'
      )
    ).toBeTruthy();
    expect(getByText(`I'm not ready`)).toBeTruthy();
    expect(getByText('Request now')).toBeTruthy();
    expect(queryByText('Close')).toBeFalsy();
    fireEvent.press(getByText(`I'm not ready`));
    expect(props.onIntroIgnore).toBeCalled();
    fireEvent.press(getByText('Request now'));
    expect(props.onIntroClose).toBeCalled();
  });

  it('have seen UI should render correctly', async () => {
    const props = {
      isSeen: true,
      onIntroClose: jest.fn(),
      onIntroIgnore: jest.fn(),
      selectedItemIndex: 2,
    };
    const { getByLabelText, getByText, queryByText } = render(<PureSalarySacrificeIntroScreen {...props} />);
    expect(getByLabelText('Salary Sacrifice Intro')).toBeTruthy();

    expect(getByText('How does it work?')).toBeTruthy();

    expect(
      getByText(
        'Requesting salary sacrifice is easy. Just tell us how much you want to contribute and when to start and stop. The details will be sent to your payroll admin and they’ll get you set up.'
      )
    ).toBeTruthy();
    expect(queryByText(`I'm not ready`)).toBeFalsy();
    expect(queryByText('Request now')).toBeFalsy();
    expect(getByText('Close')).toBeTruthy();
    fireEvent.press(getByText('Close'));
    expect(props.onIntroClose).toBeCalled();
  });
});
