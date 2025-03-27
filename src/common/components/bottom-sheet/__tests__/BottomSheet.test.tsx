import React from 'react';
import { Typography } from '@hero-design/rn';
import { render } from '../../../utils/testing';
import {
  BottomSheetFlatList,
  BottomSheetView,
  BottomSheetScrollView,
  BottomSheetSectionList,
  BottomSheet,
} from '../BottomSheet';

const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger'],
  },
];

describe('Bottom Sheet HD', () => {
  it('should render correctly with BottomSheetView properly', () => {
    const { getByText } = render(
      <BottomSheet snapPoints={[0, '50%']}>
        <BottomSheetView>
          <Typography.Body variant="small">Hello world</Typography.Body>
        </BottomSheetView>
      </BottomSheet>
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render correctly with BottomSheetScrollView properly', () => {
    const { getByText } = render(
      <BottomSheet snapPoints={[0, '50%']}>
        <BottomSheetScrollView>
          <Typography.Body variant="small">Hello world</Typography.Body>
        </BottomSheetScrollView>
      </BottomSheet>
    );
    expect(getByText('Hello world')).toBeTruthy();
  });

  it('should render correctly with BottomSheetFlatList', () => {
    const { getByText } = render(
      <BottomSheet snapPoints={[0, '50%']}>
        <BottomSheetFlatList
          data={['Hello', 'World']}
          renderItem={e => <Typography.Body variant="small">{e.item}</Typography.Body>}
        />
      </BottomSheet>
    );

    expect(getByText('Hello')).toBeTruthy();
    expect(getByText('World')).toBeTruthy();
  });
  it('should render correctly with BottomSheetSectionList', () => {
    const { getByText } = render(
      <BottomSheet snapPoints={[0, '50%']}>
        <BottomSheetSectionList
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          renderSectionHeader={({ section }) => <Typography.Body variant="small">{section.title}</Typography.Body>}
          renderItem={({ item }) => <Typography.Body variant="small">{item as string}</Typography.Body>}
          sections={DATA}
        />
      </BottomSheet>
    );

    expect(getByText('Main dishes')).toBeTruthy();
    expect(getByText('Pizza')).toBeTruthy();
    expect(getByText('Burger')).toBeTruthy();
  });
});
