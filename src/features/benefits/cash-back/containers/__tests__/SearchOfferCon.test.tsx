import React from 'react';
import { render, fireEvent } from '../../../../../common/utils/testing';
import { SearchOfferCon } from '../SearchOfferCon';

describe('SearchOfferCon', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <SearchOfferCon
        location="instore tab"
        onChangeText={() => {}}
        placeHolder="place holder"
        onGoBack={() => {}}
        selectedCategory=""
        onSelectionChange={() => {}}
        onClearFilter={() => {}}
      />
    );

    const searchBar = getByTestId('search-bar');

    expect(getByTestId('back-btn')).toBeTruthy();
    expect(getByText('place holder')).toBeTruthy();
    expect(searchBar).toBeTruthy();
  });

  it('should trigger onGoBack correctly', () => {
    const mockGoBack = jest.fn();
    const { getByTestId } = render(
      <SearchOfferCon
        location="instore tab"
        onChangeText={() => {}}
        placeHolder="place holder"
        onGoBack={mockGoBack}
        selectedCategory=""
        onSelectionChange={() => {}}
        onClearFilter={() => {}}
      />
    );

    fireEvent.press(getByTestId('back-btn'));

    expect(mockGoBack).toBeCalledTimes(1);
  });
});
