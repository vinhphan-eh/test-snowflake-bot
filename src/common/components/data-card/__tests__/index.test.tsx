import React from 'react';
import type { DataCardItem } from '..';
import { DataCard } from '..';
import { render, fireEvent } from '../../../utils/testing';

const data: Array<DataCardItem> = [
  {
    label: 'Label 1',
    content: 'Content 1',
  },
  {
    label: 'Label 2',
    content: 'Content 2',
  },
  {
    label: 'Label 3',
    content: 'Content 3',
  },
];

describe('DataCard', () => {
  it('renders correctly', () => {
    const { getByLabelText, getByText } = render(<DataCard data={data} />);
    expect(getByText('Label 1')).toBeDefined();
    expect(getByText('Content 1')).toBeDefined();
    expect(getByText('Label 2')).toBeDefined();
    expect(getByText('Content 2')).toBeDefined();
    expect(getByText('Label 3')).toBeDefined();
    expect(getByText('Content 3')).toBeDefined();

    expect(getByLabelText('icon')).toBeDefined();
  });

  it('can hide icon correctly', () => {
    const { queryByLabelText } = render(<DataCard hideIcon data={data} />);

    expect(queryByLabelText('icon')).toBeNull();
  });

  it('renders correctly without label', () => {
    const { getByLabelText, getByText, queryByTestId } = render(
      <DataCard
        data={[
          {
            content: 'This is content',
          },
        ]}
      />
    );
    expect(queryByTestId('card_label_1')).toBeNull();
    expect(getByText('This is content')).toBeDefined();
    expect(getByLabelText('icon')).toBeDefined();
  });

  it('labelPosition works correctly', () => {
    const { getByTestId } = render(
      <DataCard
        labelPosition="last"
        data={[
          {
            content: 'This is content',
          },
        ]}
      />
    );

    expect(getByTestId('vstack_container_1')).toHaveProperty('props.flexDirection', 'column-reverse');
  });

  it('disabled works correctly', () => {
    const { getByLabelText, getByTestId } = render(
      <DataCard disabled testID="data_card" labelPosition="last" data={data} />
    );
    expect(getByTestId('data_card')).toHaveProperty('props.accessibilityState.disabled', true);
    expect(getByLabelText('icon')).toBeDefined();
  });

  it('onPress works correctly', () => {
    const mockPress = jest.fn();
    const { getByTestId } = render(<DataCard onPress={mockPress} testID="data_card" data={data} />);

    fireEvent.press(getByTestId('data_card'));
    expect(mockPress).toBeCalledTimes(1);
  });

  it('it displays thumbnail image correctly', () => {
    const imageLink = { uri: 'image-link' };
    const { getByLabelText } = render(<DataCard data={data} thumbnailSource={imageLink} />);

    expect(getByLabelText('Thumbnail')).toHaveProperty('props.source', imageLink);
  });
});
