import React from 'react';
import { Typography } from '@hero-design/rn';
import Drawer, { DrawerFlatList, DrawerSectionList } from '..';
import { render } from '../../../utils/testing';

describe('Drawer', () => {
  it('should render with integrated FlatList', () => {
    const { getByText } = render(
      <Drawer snapPoints={['50%', '100%']}>
        <DrawerFlatList
          data={[
            {
              id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
              title: 'First Item',
            },
            {
              id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
              title: 'Second Item',
            },
            {
              id: '58694a0f-3da1-471f-bd96-145571e29d72',
              title: 'Third Item',
            },
          ]}
          keyExtractor={item => item.id}
          renderItem={item => <Typography.Body variant="small">{item.item.title}</Typography.Body>}
        />
      </Drawer>
    );

    expect(getByText('First Item')).toBeTruthy();
  });

  it('should render with integrated SectionList', () => {
    const { getByText } = render(
      <Drawer snapPoints={['50%', '100%']}>
        <DrawerSectionList
          sections={[
            {
              title: 'Main dishes',
              data: ['Pizza', 'Burger', 'Risotto'],
            },
            {
              title: 'Sides',
              data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
            },
            {
              title: 'Drinks',
              data: ['Water', 'Coke', 'Beer'],
            },
            {
              title: 'Desserts',
              data: ['Cheese Cake', 'Ice Cream'],
            },
          ]}
          keyExtractor={(item, index) => item + index}
          renderSectionHeader={({ section: { title } }) => <Typography.Body variant="small">{title}</Typography.Body>}
          renderItem={item => <Typography.Body variant="small">{item.item}</Typography.Body>}
        />
      </Drawer>
    );

    expect(getByText('Main dishes')).toBeTruthy();
  });
});
