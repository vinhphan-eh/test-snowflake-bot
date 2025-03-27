import React from 'react';
import { Typography } from '@hero-design/rn';
import { fireEvent, render } from '../../../../../../common/utils/testing';
import { InstapayBankAccountEntriesRadioCard } from '../InstapayBankAccountEntriesRadioCard';

describe('rendering', () => {
  it('renders correctly when checked', () => {
    const { getByText, queryAllByTestId } = render(
      <InstapayBankAccountEntriesRadioCard
        title="Option A title"
        subtitle="Option A subtitle"
        content={<Typography.Body>Option A content</Typography.Body>}
        testID="Option A"
        onPress={jest.fn}
        checked
      />
    );

    expect(getByText('Option A title')).toBeDefined();
    expect(getByText('Option A subtitle')).toBeDefined();
    expect(getByText('Option A content')).toBeDefined();
    expect(queryAllByTestId('Option A-checked')).toHaveLength(1);
  });

  it('renders correctly when not checked', () => {
    const { getByText, queryAllByTestId } = render(
      <InstapayBankAccountEntriesRadioCard
        title="Option A title"
        subtitle="Option A subtitle"
        content={<Typography.Body>Option A content</Typography.Body>}
        testID="Option A"
        onPress={jest.fn}
        checked={false}
      />
    );

    expect(getByText('Option A title')).toBeDefined();
    expect(getByText('Option A subtitle')).toBeDefined();
    expect(getByText('Option A content')).toBeDefined();
    expect(queryAllByTestId('Option A-circle')).toHaveLength(0);
  });
});

describe('behavior', () => {
  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    const { getByTestId } = render(
      <InstapayBankAccountEntriesRadioCard
        title="Option A title"
        subtitle="Option A subtitle"
        content="Option A content"
        testID="Option A"
        onPress={onPress}
        checked
      />
    );

    fireEvent.press(getByTestId('Option A'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
