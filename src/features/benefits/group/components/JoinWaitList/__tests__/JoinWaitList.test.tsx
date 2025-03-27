import React from 'react';
import { useSessionStore } from '../../../../../../common/stores/useSessionStore';
import { render, fireEvent } from '../../../../../../common/utils/testing';
import JoinWaitList from '../JoinWaitList';
import useJoinWaitList from '../useJoinWaitList';
import useTracking from '../useTracking';

const mockUseJoinWaitList = useJoinWaitList as jest.MockedFn<typeof useJoinWaitList>;
const mockUseTracking = useTracking as jest.MockedFn<typeof useTracking>;

jest.mock('../useJoinWaitList');
jest.mock('../useTracking');
jest.mock('../../../../../../common/stores/useSessionStore');

describe('JoinWaitList', () => {
  beforeEach(() => {
    mockUseTracking.mockReturnValue({
      trackClickSkip: jest.fn(),
      trackClickNext: jest.fn(),
      trackClickLetGo: jest.fn(),
    });
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: false });
  });
  it('should render step 1 correctly', () => {
    mockUseJoinWaitList.mockReturnValue({
      categories: [],
      isFechingCategories: false,
      isJoinWaitListLoading: false,
      isShowAddNewCategory: false,
      isShowSurveys: true,
      lastIndexKey: 3,
      onAddNewCategory: jest.fn(),
      onCloseAddNewCategory: jest.fn(),
      onJoinWaitList: jest.fn(),
      onNextCarousel: jest.fn(),
      onSkipSurvey: jest.fn(),
      selectedCategories: {},
      selectedItemIndex: 0,
      setSelectedItemIndex: jest.fn(),
      suvreyIndexKey: 2,
      toggleById: jest.fn(),
    });
    const { getByText } = render(<JoinWaitList />);

    expect(getByText('Support the Swag community')).toBeTruthy();
    expect(
      getByText(
        `You're part of community of 2M users negotiating VIP deals to fight the rising cost of living. With the strength of millions behind you, unlock the best price on essentials like groceries, fuel and utilities. Shape future deals and secure exclusive offers everywhere you go.`
      )
    ).toBeTruthy();
  });

  it('should render step 1 correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({ swagTextAndImageRebrandEnabled: true });
    mockUseJoinWaitList.mockReturnValue({
      categories: [],
      isFechingCategories: false,
      isJoinWaitListLoading: false,
      isShowAddNewCategory: false,
      isShowSurveys: true,
      lastIndexKey: 3,
      onAddNewCategory: jest.fn(),
      onCloseAddNewCategory: jest.fn(),
      onJoinWaitList: jest.fn(),
      onNextCarousel: jest.fn(),
      onSkipSurvey: jest.fn(),
      selectedCategories: {},
      selectedItemIndex: 0,
      setSelectedItemIndex: jest.fn(),
      suvreyIndexKey: 2,
      toggleById: jest.fn(),
    });
    const { getByText } = render(<JoinWaitList />);

    expect(getByText('Support the Employment Hero community')).toBeTruthy();
    expect(
      getByText(
        `You're part of community of 2M users negotiating VIP deals to fight the rising cost of living. With the strength of millions behind you, unlock the best price on essentials like groceries, fuel and utilities. Shape future deals and secure exclusive offers everywhere you go.`
      )
    ).toBeTruthy();
  });

  it('should render step 2 correctly', () => {
    mockUseJoinWaitList.mockReturnValue({
      categories: [],
      isFechingCategories: false,
      isJoinWaitListLoading: false,
      isShowAddNewCategory: false,
      isShowSurveys: true,
      lastIndexKey: 3,
      onAddNewCategory: jest.fn(),
      onCloseAddNewCategory: jest.fn(),
      onJoinWaitList: jest.fn(),
      onNextCarousel: jest.fn(),
      onSkipSurvey: jest.fn(),
      selectedCategories: {},
      selectedItemIndex: 1,
      setSelectedItemIndex: jest.fn(),
      suvreyIndexKey: 2,
      toggleById: jest.fn(),
    });
    const { getByText } = render(<JoinWaitList />);

    expect(getByText('Power in numbers')).toBeTruthy();
    expect(
      getByText(
        `1,000 people —or 1M people —together have the power to create real change.\nJoin the deal groups to negotiate the best offers on everyday essentials. You can even shape their future.\nInterested? Join today and start curating the deals of tomorrow.`
      )
    ).toBeTruthy();
  });

  it('should render survey step correctly', () => {
    const mockValue = {
      categories: [],
      isFechingCategories: false,
      isJoinWaitListLoading: false,
      isShowAddNewCategory: false,
      isShowSurveys: true,
      lastIndexKey: 3,
      onAddNewCategory: jest.fn(),
      onCloseAddNewCategory: jest.fn(),
      onJoinWaitList: jest.fn(),
      onNextCarousel: jest.fn(),
      onSkipSurvey: jest.fn(),
      selectedCategories: {},
      selectedItemIndex: 2,
      setSelectedItemIndex: jest.fn(),
      suvreyIndexKey: 2,
      toggleById: jest.fn(),
    };
    mockUseJoinWaitList.mockReturnValue(mockValue);
    const { getByText } = render(<JoinWaitList />);

    expect(getByText('Help shape future groups')).toBeTruthy();
    expect(getByText('Saving money in which of these categories would benefit you most?')).toBeTruthy();

    expect(getByText('Skip')).toBeTruthy();
    expect(getByText('Next')).toBeTruthy();
    fireEvent.press(getByText('Skip'));

    expect(mockValue.onSkipSurvey).toBeCalled();
    fireEvent.press(getByText('Next'));
    expect(mockValue.onNextCarousel).toBeCalled();
  });

  it('should render final step correctly', () => {
    const mockValue = {
      categories: [],
      isFechingCategories: false,
      isJoinWaitListLoading: false,
      isShowAddNewCategory: false,
      isShowSurveys: true,
      lastIndexKey: 3,
      onAddNewCategory: jest.fn(),
      onCloseAddNewCategory: jest.fn(),
      onJoinWaitList: jest.fn(),
      onNextCarousel: jest.fn(),
      onSkipSurvey: jest.fn(),
      selectedCategories: {},
      selectedItemIndex: 3,
      setSelectedItemIndex: jest.fn(),
      suvreyIndexKey: 2,
      toggleById: jest.fn(),
    };
    mockUseJoinWaitList.mockReturnValue(mockValue);
    const { getByText } = render(<JoinWaitList />);

    expect(getByText(`What's next?`)).toBeTruthy();
    expect(
      getByText(
        `There's groups waiting for you to join.\nSoon, you'll also be able to create new groups for members to join.`
      )
    ).toBeTruthy();
    expect(getByText(`Let's go`)).toBeTruthy();
    fireEvent.press(getByText(`Let's go`));
    expect(mockValue.onJoinWaitList).toBeCalled();
  });
});
