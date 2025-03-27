import React from 'react';
import { fireEvent, render, waitFor } from '../../../../../../common/utils/testing';
import { RecurringPushNotificationBottomSheet } from '../RecurringPushNotificationBottomSheet';
import images from '../../../../../../common/assets/images';
import type { LocaleMessageID } from '../../../../../../providers/LocalisationProvider/constants';

describe('RecurringPushNotificationBottomSheet', () => {
  const mockedBtsDetails = {
    captionKey: 'instapay.pushNotification.bottomSheet.successfulPayment.caption' as LocaleMessageID,
    contentKey: 'instapay.pushNotification.bottomSheet.successfulPayment.content' as LocaleMessageID,
    image: {
      source: {
        AU: images.ewaRecurringHowItWorksAU4,
        GB: images.ewaRecurringHowItWorksUK4,
      },
      rawHeight: 230,
      rawWidth: 358,
    },
  };

  it('should display the content properly and update seen state if opened', async () => {
    const { getByTestId, getByText } = render(
      <RecurringPushNotificationBottomSheet isOpening setIsOpening={jest.fn()} {...mockedBtsDetails} />
    );

    await waitFor(() => {
      expect(getByText('More information')).toBeTruthy();
      expect(
        getByText('Successful payment notifications will trigger whenever a scheduled transaction is successful.')
      ).toBeTruthy();
      expect(getByText('Got it')).toBeTruthy();
      expect(getByTestId('recurring-push-notification-bts')).toBeVisible();
    });
  });

  it('should not dipslay if not opened', async () => {
    const { queryByTestId } = render(
      <RecurringPushNotificationBottomSheet isOpening={false} setIsOpening={jest.fn()} {...mockedBtsDetails} />
    );

    await waitFor(() => {
      expect(queryByTestId('recurring-push-notification-bts')).not.toBeTruthy();
    });
  });

  it('should close the bottom sheet if pressed on Got it button', async () => {
    const mockedSetIsOpening = jest.fn();

    const { getByText } = render(
      <RecurringPushNotificationBottomSheet isOpening setIsOpening={mockedSetIsOpening} {...mockedBtsDetails} />
    );

    fireEvent.press(getByText('Got it'));

    await waitFor(() => {
      expect(mockedSetIsOpening).toHaveBeenCalledWith(false);
    });
  });

  it('should close the bottom sheet if pressed on the close icon', async () => {
    const mockedSetIsOpening = jest.fn();

    const { getByTestId } = render(
      <RecurringPushNotificationBottomSheet isOpening setIsOpening={mockedSetIsOpening} {...mockedBtsDetails} />
    );

    fireEvent.press(getByTestId('bottom-sheet-close-icon'));

    await waitFor(() => {
      expect(mockedSetIsOpening).toHaveBeenCalledWith(false);
    });
  });
});
