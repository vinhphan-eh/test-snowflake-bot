import React, { useState } from 'react';
import { Typography } from '@hero-design/rn';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../../../../../common/utils/testing';
import { InstapayBankAccountEntriesRadioCardGroup } from '../InstapayBankAccountEntriesRadioCardGroup';

const options = [
  {
    title: 'option 1 title',
    subtitle: 'option 1 subtitle',
    content: <Typography.Body>option 1 content</Typography.Body>,
    value: 'option_1',
    testID: 'option_1',
  },
  {
    title: 'option 2 title',
    subtitle: 'option 2 subtitle',
    content: <Typography.Body>option 2 content</Typography.Body>,
    value: 'option_2',
    testID: 'option_2',
  },
  {
    title: 'option 3 title',
    subtitle: 'option 3 subtitle',
    content: <Typography.Body>option 3 content</Typography.Body>,
    value: 'option_3',
    testID: 'option_3',
  },
];

describe('rendering', () => {
  it('renders correctly', () => {
    const { getByText, queryAllByTestId } = render(
      <InstapayBankAccountEntriesRadioCardGroup options={options} value="option_3" onChange={jest.fn()} />
    );

    expect(getByText('option 1 title')).toBeDefined();
    expect(getByText('option 2 title')).toBeDefined();
    expect(getByText('option 3 title')).toBeDefined();
    expect(queryAllByTestId('option 3 title-checked')).toHaveLength(1);
  });
});

describe('behavior', () => {
  it('calls onPress with correct params', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <InstapayBankAccountEntriesRadioCardGroup options={options} value="option_3" onChange={onPress} />
    );

    fireEvent.press(getByText('option 1 content'));
    expect(onPress).toHaveBeenCalledWith('option_1');
  });

  it('calls onPress with select right option and unselect all the rest', () => {
    const TestRadioCardComponent = () => {
      const [selectedOption, setSelectedOption] = useState<string>('option_3');
      return (
        <InstapayBankAccountEntriesRadioCardGroup
          options={options}
          value={selectedOption}
          onChange={setSelectedOption}
        />
      );
    };

    const { getByText, queryAllByTestId } = render(<TestRadioCardComponent />);

    expect(queryAllByTestId('option 1 content-checked')).toHaveLength(0);
    expect(queryAllByTestId('option 2 content-checked')).toHaveLength(0);
    expect(queryAllByTestId('option 3 title-checked')).toHaveLength(1);

    fireEvent.press(getByText('option 1 content'));
    expect(queryAllByTestId('option 1 title-checked')).toHaveLength(1);
    expect(queryAllByTestId('option 2 content-checked')).toHaveLength(0);
    expect(queryAllByTestId('option 3 content-checked')).toHaveLength(0);
  });
});
