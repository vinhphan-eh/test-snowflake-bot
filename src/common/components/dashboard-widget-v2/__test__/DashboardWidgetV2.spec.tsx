import React from 'react';
import { render } from '../../../utils/testing';
import { DashboardWidgetV2 } from '../DashboardWidgetV2';

describe('DashboardWidgetV2', () => {
  test.each([
    { propName: 'description', value: 'description' },
    { propName: 'tagText', value: 'Hi' },
  ])('should render correctly with prop $propName', ({ propName, value }) => {
    const { getByText } = render(
      <DashboardWidgetV2
        title="title"
        description={propName === 'description' ? value : undefined}
        tagText={propName === 'tagText' ? value : undefined}
        onPress={() => {}}
      />
    );

    expect(getByText(value)).toBeTruthy();
  });
});
