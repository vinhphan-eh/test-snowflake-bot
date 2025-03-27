import React from 'react';
import { Box, Typography } from '@hero-design/rn';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { CustomTabs, type CustomTabItem } from '../CustomTabs';

const mockedTab2OnPressed = jest.fn();
const mockedTabs = [
  {
    key: 'tab1',
    name: 'Tab 1',
    body: (
      <Box>
        <Typography.Body>Body 1</Typography.Body>
      </Box>
    ),
  },
  {
    key: 'tab2',
    name: 'Tab 2',
    body: (
      <Box>
        <Typography.Body>Body 2</Typography.Body>
      </Box>
    ),
    onPressed: mockedTab2OnPressed,
  },
] as CustomTabItem[];

describe('CustomTabs', () => {
  it('should render and handle tab switch properly', async () => {
    const mockedSetSelectedTab = jest.fn();
    const { getByTestId, getByText } = render(
      <CustomTabs selectedTabKey="tab1" setSelectedTabKey={mockedSetSelectedTab} tabs={mockedTabs} />
    );

    await waitFor(() => {
      expect(getByText('Tab 1')).toBeTruthy();
      expect(getByText('Tab 2')).toBeTruthy();
      expect(getByText('Body 1')).toBeTruthy();
    });

    // Switch tab
    fireEvent.press(getByTestId('header-tab-Tab 2'));

    await waitFor(() => {
      expect(mockedSetSelectedTab).toHaveBeenCalledWith('tab2');
      expect(mockedTab2OnPressed).toHaveBeenCalled();
    });
  });

  it('should not render tab header if only having 1 tab in the list', async () => {
    const { getByText, queryByTestId } = render(
      <CustomTabs selectedTabKey="tab2" setSelectedTabKey={jest.fn()} tabs={[mockedTabs[1]]} />
    );

    await waitFor(() => {
      // Render only the Body of selected tab
      expect(getByText('Body 2')).toBeTruthy();
      expect(queryByTestId('custom-tabs-header')).not.toBeTruthy();
    });
  });
});
