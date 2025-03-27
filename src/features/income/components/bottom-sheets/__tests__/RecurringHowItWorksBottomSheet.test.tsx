import React from 'react';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import * as useSeenRecurringHowItWorksBts from '../../../instapay/hooks/useSeenRecurringHowItWorksBts';
import { RecurringHowItWorksBottomSheet } from '../RecurringHowItWorksBottomSheet';

describe('RecurringHowItWorksBottomSheet', () => {
  const pageAssertionContents = [
    '1. Choose a recurring amount or day (if applicable)',
    '2. Select a receiving account',
    '3. When your balance reaches the chosen amount or your set payment day arrives, the payment will be processed at 9 PM.',
    'Plan your budget carefully and be mindful of the actual amount you’ll receive on payday.',
  ];
  const mockedSetSeen = jest.fn();

  beforeEach(() => {
    jest.spyOn(useSeenRecurringHowItWorksBts, 'useSeenRecurringHowItWorksBts').mockReturnValue({
      setSeen: mockedSetSeen,
      isSeen: false,
      hasHydrate: true,
    });
  });

  it('should display the content properly and update seen state if opened', async () => {
    const { getByTestId, getByText } = render(
      <RecurringHowItWorksBottomSheet isOpening setIsOpening={jest.fn()} isUK={false} isExtendedVersion={false} />
    );

    await waitFor(() => {
      // Expect the content of Page 1 to be rendered by default
      expect(getByText('Getting started')).toBeTruthy();
      expect(getByText('1. Choose a recurring amount or day (if applicable)')).toBeTruthy();
      expect(getByText('Next')).toBeTruthy();
      expect(getByTestId('recurring-how-it-works-bts')).toBeVisible();
      expect(mockedSetSeen).toHaveBeenCalledWith(true);
    });
  });

  it('should not dipslay if not opened', async () => {
    const { queryByTestId } = render(
      <RecurringHowItWorksBottomSheet
        isOpening={false}
        setIsOpening={jest.fn()}
        isUK={false}
        isExtendedVersion={false}
      />
    );

    await waitFor(() => {
      expect(queryByTestId('recurring-how-it-works-bts')).not.toBeTruthy();
    });
  });

  describe('not extended version', () => {
    it.each<{ pageIndex: number; content: string; buttons: string[] }>([
      {
        buttons: ['Back', 'Next'],
        content: pageAssertionContents[1],
        pageIndex: 2,
      },
      {
        buttons: ['Back', 'Got it'],
        content: pageAssertionContents[2],
        pageIndex: 3,
      },
    ])('should render the content properly for page $pageIndex', async ({ buttons, content, pageIndex }) => {
      const mockedSetIsOpening = jest.fn();

      const { getByText } = render(
        <RecurringHowItWorksBottomSheet
          isOpening
          setIsOpening={mockedSetIsOpening}
          isUK={false}
          isExtendedVersion={false}
        />
      );

      for (let i = 0; i < pageIndex - 1; i += 1) {
        // Switch to the current page
        fireEvent.press(getByText('Next'));
      }

      // Assert the content
      expect(getByText(content)).toBeTruthy();
      buttons.forEach(button => {
        expect(getByText(button)).toBeTruthy();
      });

      // Assert the Back button - content of the previous page should be visible after pressed
      fireEvent.press(getByText('Back'));
      expect(getByText(pageAssertionContents[pageIndex - 2])).toBeTruthy();

      // Going back to the old page
      fireEvent.press(getByText('Next'));

      // Assert the Next / Got it button
      if (pageIndex === 3) {
        fireEvent.press(getByText('Got it'));

        await waitFor(() => {
          expect(mockedSetIsOpening).toHaveBeenCalledWith(false);
        });
      } else {
        // Expect the content of the next page is rendered
        fireEvent.press(getByText('Next'));
        expect(getByText(pageAssertionContents[pageIndex])).toBeTruthy();
      }
    });
  });

  describe('extended version', () => {
    it('should allow navigating next at page 3 and display correct content for page 4', async () => {
      const { getByText, queryByText } = render(
        <RecurringHowItWorksBottomSheet isOpening setIsOpening={jest.fn()} isUK={false} isExtendedVersion />
      );

      for (let i = 0; i < 2; i += 1) {
        // Navigate next 2 times to Page 3
        fireEvent.press(getByText('Next'));
      }

      // Check if Next button is rendered instead of Got it
      expect(getByText('Next')).toBeTruthy();
      expect(queryByText('Got it')).not.toBeTruthy();

      fireEvent.press(getByText('Next'));

      // Assert the content of the additional page to be correctly rendered
      expect(getByText(pageAssertionContents[3])).toBeTruthy();
    });
  });

  describe('UK user', () => {
    const pageAssertionContentsForUK = [
      '1. Choose a recurring amount',
      '2. Select a receiving account',
      '3. Once the balance accumulates to your chosen amount, you’ll receive it at 9 PM.',
    ];

    it.each<{ pageIndex: number; content: string; buttons: string[] }>([
      {
        buttons: ['Back', 'Next'],
        content: pageAssertionContentsForUK[1],
        pageIndex: 2,
      },
      {
        buttons: ['Back', 'Got it'],
        content: pageAssertionContentsForUK[2],
        pageIndex: 3,
      },
    ])('should render the content properly for page $pageIndex', async ({ buttons, content, pageIndex }) => {
      const mockedSetIsOpening = jest.fn();

      const { getByText } = render(
        <RecurringHowItWorksBottomSheet isOpening setIsOpening={mockedSetIsOpening} isUK isExtendedVersion={false} />
      );

      for (let i = 0; i < pageIndex - 1; i += 1) {
        // Switch to the current page
        fireEvent.press(getByText('Next'));
      }

      // Assert the content
      expect(getByText(content)).toBeTruthy();
      buttons.forEach(button => {
        expect(getByText(button)).toBeTruthy();
      });

      // Assert the Back button - content of the previous page should be visible after pressed
      fireEvent.press(getByText('Back'));
      expect(getByText(pageAssertionContentsForUK[pageIndex - 2])).toBeTruthy();

      // Going back to the old page
      fireEvent.press(getByText('Next'));

      // Assert the Next / Got it button
      if (pageIndex === 3) {
        fireEvent.press(getByText('Got it'));

        await waitFor(() => {
          expect(mockedSetIsOpening).toHaveBeenCalledWith(false);
        });
      } else {
        // Expect the content of the next page is rendered
        fireEvent.press(getByText('Next'));
        expect(getByText(pageAssertionContentsForUK[pageIndex])).toBeTruthy();
      }
    });
  });
});
