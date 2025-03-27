import React, { useState } from 'react';
import { Text } from 'react-native';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../../utils/testing';
import { RadioCardGroup, type RadioCardComponentProps } from '../RadioCardGroup';

const options = [
  { title: 'option 1 title', subtitle: 'option 1 subtitle', content: 'option 1 content', value: 'option_1' },
  { title: 'option 2 title', subtitle: 'option 2 subtitle', content: 'option 2 content', value: 'option_2' },
  { title: 'option 3 title', subtitle: 'option 3 subtitle', content: 'option 3 content', value: 'option_3' },
];

describe('rendering', () => {
  it('renders correctly', () => {
    const { getByText, queryAllByTestId } = render(
      <RadioCardGroup options={options} value="option_3" onChange={jest.fn()} />
    );

    expect(getByText('option 1 title')).toBeDefined();
    expect(getByText('option 1 title')).toBeDefined();
    expect(getByText('option 1 title')).toBeDefined();
    expect(queryAllByTestId('option 3 content-checked')).toHaveLength(1);
  });
});

describe('behavior', () => {
  it('calls onPress with correct params', () => {
    const onPress = jest.fn();
    const { getByText } = render(<RadioCardGroup options={options} value="option_3" onChange={onPress} />);

    fireEvent.press(getByText('option 1 content'));
    expect(onPress).toBeCalledWith('option_1');
  });

  it('calls onPress with select right option and unselect all the rest', () => {
    const TestRadioCardComponent = () => {
      const [selectedOption, setSelectedOption] = useState<string>('option_3');
      return <RadioCardGroup options={options} value={selectedOption} onChange={setSelectedOption} />;
    };

    const { getByText, queryAllByTestId } = render(<TestRadioCardComponent />);

    expect(queryAllByTestId('option 1 content-checked')).toHaveLength(0);
    expect(queryAllByTestId('option 2 content-checked')).toHaveLength(0);
    expect(queryAllByTestId('option 3 content-checked')).toHaveLength(1);

    fireEvent.press(getByText('option 1 content'));
    expect(queryAllByTestId('option 1 content-checked')).toHaveLength(1);
    expect(queryAllByTestId('option 2 content-checked')).toHaveLength(0);
    expect(queryAllByTestId('option 3 content-checked')).toHaveLength(0);
  });

  it('uses the prop to render the radio items', () => {
    const CustomRadioCard = ({ checked, content }: RadioCardComponentProps) => {
      return (
        <Text>
          This is the custom radio card: {content} {checked ? 'checked' : ''}
        </Text>
      );
    };

    const onPress = jest.fn();
    const { queryByText } = render(
      <RadioCardGroup options={options} value="option_3" onChange={onPress} RadioCardComponent={CustomRadioCard} />
    );
    expect(queryByText('This is the custom radio card: option 3 content checked')).toBeVisible();
  });
});
