import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedEventTracking } from '../../../../../../test-setup/after-env/mixpanel.setup';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { CashbackSearchScreen } from '../CashbackSearchScreen';

const mockUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('CashbackSearchScreen', () => {
  it('should render correctly for default state', () => {
    const { getByTestId, getByText } = render(<CashbackSearchScreen />);

    expect(getByTestId('search-bar')).toBeTruthy();
    expect(getByText('Search offers')).toBeTruthy();
    expect(getByTestId('filter-outlined-btn')).toBeTruthy();
    expect(getByTestId('list-view')).toBeTruthy();
    expect(getByTestId('online-pill')).toBeTruthy();
    expect(getByTestId('instore-pill')).toBeTruthy();
  });

  it('normal search offer', async () => {
    const { getByTestId } = render(<CashbackSearchScreen />);

    const searchBar = getByTestId('search-bar');
    fireEvent.changeText(searchBar, { nativeEvent: { text: 'Cotton' } });

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        categoryName: 'user action',
        event: 'Type in cashback search bar',
        metaData: {
          module: 'Cashback',
          categoryFilter: undefined,
          searchQuery: 'Cotton',
          selectedType: undefined,
        },
      });
    });
  });

  it('search offer with online offer', async () => {
    mockUseRoute.mockReturnValue({
      params: {
        selectedSearchType: 'online',
        selectedCategory: undefined,
      },
      key: '',
      name: '',
    });

    const { getByTestId } = render(<CashbackSearchScreen />);
    const searchBar = getByTestId('search-bar');
    fireEvent.changeText(searchBar, { nativeEvent: { text: 'Cotton' } });

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        categoryName: 'user action',
        event: 'Type in cashback search bar',
        metaData: {
          module: 'Cashback',
          categoryFilter: undefined,
          searchQuery: 'Cotton',
          selectedType: 'online',
        },
      });
    });
  });

  it('search offer with in store offer and category filter', async () => {
    mockUseRoute.mockReturnValue({
      params: {
        selectedSearchType: undefined,
        selectedCategory: {
          categoryCode: 'dining',
          name: 'Dining',
          imageUrl: '',
        },
      },
      key: '',
      name: '',
    });

    const { getByTestId } = render(<CashbackSearchScreen />);
    const searchBar = getByTestId('search-bar');
    fireEvent.changeText(searchBar, { nativeEvent: { text: 'Cotton' } });

    await waitFor(() => {
      expect(mockedEventTracking).toBeCalledWith({
        categoryName: 'user action',
        event: 'Type in cashback search bar',
        metaData: {
          module: 'Cashback',
          categoryFilter: {
            categoryCode: 'dining',
            name: 'Dining',
            imageUrl: '',
          },
          searchQuery: 'Cotton',
          selectedType: undefined,
        },
      });
    });
  });

  it('should render correctly with category filter from route', () => {
    mockUseRoute.mockReturnValue({
      params: {
        selectedSearchType: undefined,
        selectedCategory: {
          categoryCode: 'dining',
          name: 'Dining',
          imageUrl: '',
        },
      },
      key: '',
      name: '',
    });
    const { getByTestId, getByText } = render(<CashbackSearchScreen />);

    expect(getByText('Search Dining')).toBeTruthy();
    expect(getByTestId('search-bar')).toBeTruthy();
    expect(getByTestId('filter-btn')).toBeTruthy();
    expect(getByTestId('list-view')).toBeTruthy();
    expect(getByTestId('online-pill')).toBeTruthy();
    expect(getByTestId('instore-pill')).toBeTruthy();
  });

  it('should render correctly with online search type from route', () => {
    mockUseRoute.mockReturnValue({
      params: {
        selectedSearchType: 'online',
        selectedCategory: undefined,
      },
      key: '',
      name: '',
    });
    const { getByTestId, getByText } = render(<CashbackSearchScreen />);

    expect(getByText('Search online offers')).toBeTruthy();
    expect(getByTestId('search-bar')).toBeTruthy();
    expect(getByTestId('filter-outlined-btn')).toBeTruthy();
    expect(getByTestId('list-view')).toBeTruthy();
    expect(getByTestId('online-pill-selected')).toBeTruthy();
    expect(getByTestId('instore-pill')).toBeTruthy();
  });

  it('should render correctly with instore search type from route', () => {
    mockUseRoute.mockReturnValue({
      params: {
        selectedSearchType: 'instore',
        selectedCategory: undefined,
      },
      key: '',
      name: '',
    });
    const { getByTestId, getByText } = render(<CashbackSearchScreen />);

    expect(getByText('Search in-store offers')).toBeTruthy();
    expect(getByTestId('search-bar')).toBeTruthy();
    expect(getByTestId('filter-outlined-btn')).toBeTruthy();
    expect(getByTestId('partial-map-list-view')).toBeTruthy();
    expect(getByTestId('online-pill')).toBeTruthy();
    expect(getByTestId('instore-pill-selected')).toBeTruthy();
  });

  it('should render correctly with both search type & category filter from route', () => {
    mockUseRoute.mockReturnValue({
      params: {
        selectedSearchType: 'online',
        selectedCategory: {
          categoryCode: 'dining',
          name: 'Dining',
          imageUrl: '',
        },
      },
      key: '',
      name: '',
    });
    const { getByTestId, getByText } = render(<CashbackSearchScreen />);

    expect(getByText('Search Dining')).toBeTruthy();
    expect(getByTestId('search-bar')).toBeTruthy();
    expect(getByTestId('filter-btn')).toBeTruthy();
    expect(getByTestId('list-view')).toBeTruthy();
    expect(getByTestId('online-pill-selected')).toBeTruthy();
    expect(getByTestId('instore-pill')).toBeTruthy();
  });
});
