import React from 'react';
import { fireEvent, render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockBlockUkCardMutation, mockUnblockUkCardMutation } from '../../../../new-graphql/generated';
import { CardSettingsUk } from '../CardSettingsUk';

const mockDisplayToastContent = jest.fn();
const mockDisplayInfoTooltip = jest.fn();
const testCardId = 'testCardId';

describe('Card Settings Uk', () => {
  it('should render properly', () => {
    const { getByText } = render(
      <CardSettingsUk
        isCardBlocked={false}
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );
    expect(getByText('Virtual card')).toBeTruthy();
    expect(getByText('Card is enabled')).toBeTruthy();
  });

  it('should not render if card is loading', () => {
    const { queryByText } = render(
      <CardSettingsUk
        isCardBlocked={false}
        isCardLoading
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );
    expect(queryByText('Virtual card')).not.toBeTruthy();
  });

  it('should switch off the toggle by default if card is blocked', () => {
    const { getByText } = render(
      <CardSettingsUk
        isCardBlocked
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );
    expect(getByText('Card is disabled')).toBeTruthy();
  });

  it('should switch off the toggle by default if card is blocked', () => {
    const { getByText } = render(
      <CardSettingsUk
        isCardBlocked
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );
    expect(getByText('Card is disabled')).toBeTruthy();
  });

  it('should block card if switched off the toggle', async () => {
    mockServerNode.use(
      mockBlockUkCardMutation((_, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.delay(100),
          ctx.data({
            blockUKCard: {
              success: true,
            },
          })
        );
      })
    );

    const { getByLabelText, getByText, queryByText } = render(
      <CardSettingsUk
        isCardBlocked={false}
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );

    const toggle = getByLabelText('Card is enabled toggle');
    fireEvent.press(toggle);

    await waitFor(() => {
      expect(getByText('Card is disabled')).toBeTruthy();
      expect(queryByText('Card is enabled')).not.toBeTruthy();
    });
  });

  it('should unblock card if switched off the toggle', async () => {
    mockServerNode.use(
      mockUnblockUkCardMutation((_, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.delay(100),
          ctx.data({
            unblockUKCard: {
              success: true,
            },
          })
        );
      })
    );

    const { getByLabelText, getByText, queryByText } = render(
      <CardSettingsUk
        isCardBlocked
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );

    const toggle = getByLabelText('Card is disabled toggle');
    fireEvent.press(toggle);

    await waitFor(() => {
      expect(getByText('Card is enabled')).toBeTruthy();
      expect(queryByText('Card is disabled')).not.toBeTruthy();
    });
  });

  it('should trigger toast error if failed to request blocking card', async () => {
    mockServerNode.use(
      mockBlockUkCardMutation((_, res, ctx) => {
        return res(ctx.status(500), ctx.delay(100));
      })
    );

    const { getByLabelText, getByText, queryByText } = render(
      <CardSettingsUk
        isCardBlocked
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );

    const toggle = getByLabelText('Card is disabled toggle');
    fireEvent.press(toggle);

    await waitFor(() => {
      expect(mockDisplayToastContent).toHaveBeenCalledWith(
        'Sorry, we could not process your request. Try again later.'
      );
      expect(getByText('Card is disabled')).toBeTruthy();
      expect(queryByText('Card is enabled')).not.toBeTruthy();
    });
  });

  it('should trigger toast error if failed to request unblocking card', async () => {
    mockServerNode.use(
      mockBlockUkCardMutation((_, res, ctx) => {
        return res(
          ctx.status(201),
          ctx.delay(100),
          ctx.data({
            blockUKCard: {
              success: false,
            },
          })
        );
      })
    );

    const { getByLabelText, getByText, queryByText } = render(
      <CardSettingsUk
        isCardBlocked={false}
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );

    const toggle = getByLabelText('Card is enabled toggle');
    fireEvent.press(toggle);

    await waitFor(() => {
      expect(mockDisplayToastContent).toHaveBeenCalledWith(
        'Sorry, we could not process your request. Try again later.'
      );
      expect(getByText('Card is enabled')).toBeTruthy();
      expect(queryByText('Card is disabled')).not.toBeTruthy();
    });
  });

  it('should request showing drawer if user clicked on the info icon', async () => {
    const { getByLabelText } = render(
      <CardSettingsUk
        isCardBlocked={false}
        isCardLoading={false}
        displayToastContent={mockDisplayToastContent}
        displayInfoTooltip={mockDisplayInfoTooltip}
        cardId={testCardId}
        accessToken="accessToken"
      />
    );

    const infoIcon = getByLabelText('Virtual card info icon');
    fireEvent.press(infoIcon);

    await waitFor(() => {
      expect(mockDisplayInfoTooltip).toHaveBeenCalledWith({
        description: 'Disabling these toggles will disable the functionality for your virtual card.',
        title: 'Card settings',
      });
    });
  });
});
