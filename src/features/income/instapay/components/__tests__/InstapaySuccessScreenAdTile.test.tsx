import React from 'react';
import { fireEvent, render, waitFor, type RenderAPI } from '../../../../../common/utils/testing';
import { InstaPaySuccessScreenAdTile } from '../InstapaySuccessScreenAdTile';

describe('InstaPaySuccessScreenAdTile', () => {
  const mockedOnPressed = jest.fn();
  let renderAPI: RenderAPI;

  beforeEach(() => {
    renderAPI = render(
      <InstaPaySuccessScreenAdTile
        caption="Caption"
        content="Content"
        navigationButtonText="Action Button"
        onPressed={mockedOnPressed}
        testID="ip-success-screen-ad-tile"
      />
    );
  });

  it('should render properly', async () => {
    await waitFor(() => {
      expect(renderAPI.getByText('Caption')).toBeTruthy();
      expect(renderAPI.getByText('Content')).toBeTruthy();
      expect(renderAPI.getByText('Action Button')).toBeTruthy();
    });
  });

  it('should handle properly on pressed to the tile', async () => {
    fireEvent.press(renderAPI.getByTestId('success-screen-ad-tile-action-button'));

    await waitFor(() => {
      expect(mockedOnPressed).toHaveBeenCalled();
    });
  });
});
