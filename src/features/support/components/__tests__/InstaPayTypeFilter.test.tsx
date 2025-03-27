import React from 'react';
import { act, fireEvent, render } from '../../../../common/utils/testing';
import { InstapayPayType } from '../../../../new-graphql/generated';
import type { InstaPayTypeFilterItem } from '../InstaPayTypeFilter';
import { InstaPayTypeFilter } from '../InstaPayTypeFilter';

describe('InstaPayTypeFilter', () => {
  const instapayTypeFilterItems: InstaPayTypeFilterItem[] = [
    {
      label: 'All',
      value: 'ALL',
    },
    {
      label: 'InstaPay Daily',
      value: InstapayPayType.Dailypay,
    },
    {
      label: 'InstaPay Now',
      value: InstapayPayType.Instapay,
    },
  ];

  it('should render correctly', () => {
    const { getByText } = render(
      <InstaPayTypeFilter
        items={instapayTypeFilterItems}
        selectedItem={instapayTypeFilterItems[0]}
        onItemSelected={() => {}}
      />
    );

    expect(getByText('Filter')).toBeVisible();
    expect(getByText('All')).toBeVisible();
    expect(getByText('InstaPay Daily')).toBeVisible();
    expect(getByText('InstaPay Now')).toBeVisible();
  });

  it('should run the callback when press on item', () => {
    const onItemSelected = jest.fn();
    const { getByText } = render(
      <InstaPayTypeFilter
        items={instapayTypeFilterItems}
        selectedItem={instapayTypeFilterItems[0]}
        onItemSelected={onItemSelected}
      />
    );
    act(() => {
      fireEvent.press(getByText('InstaPay Daily'));
    });

    expect(onItemSelected).toHaveBeenCalledWith({ label: 'InstaPay Daily', value: InstapayPayType.Dailypay });
  });

  it('should show the number of applied filters', () => {
    const onItemSelected = jest.fn();
    const { getByText } = render(
      <InstaPayTypeFilter
        items={instapayTypeFilterItems}
        selectedItem={instapayTypeFilterItems[1]}
        onItemSelected={onItemSelected}
      />
    );

    expect(getByText('Filter (1)')).toBeVisible();
  });
});
