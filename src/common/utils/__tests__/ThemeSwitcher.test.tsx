import React from 'react';
import { Button, ehWorkDarkSystemPalette, swagLightSystemPalette } from '@hero-design/rn';
import { render } from '@testing-library/react-native';
import { useSessionStore } from '../../stores/useSessionStore';
import ThemeSwitcher from '../ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('renders correctly when darkmode is true', () => {
    useSessionStore.setState({
      darkModeEnabled: true,
    });

    const { getByTestId, getByText } = render(
      <ThemeSwitcher name="swag">
        <Button testID="test-button" text="Content" onPress={() => {}} />
      </ThemeSwitcher>
    );

    expect(getByText('Content')).toBeVisible();
    expect(getByTestId('test-button')).toHaveStyle({ backgroundColor: ehWorkDarkSystemPalette.primary });
  });

  it('renders correctly when darkmode is false', () => {
    useSessionStore.setState({
      darkModeEnabled: false,
    });

    const { getByTestId, getByText } = render(
      <ThemeSwitcher name="swag">
        <Button testID="test-button" text="Content" onPress={() => {}} />
      </ThemeSwitcher>
    );

    expect(getByText('Content')).toBeVisible();
    expect(getByTestId('test-button')).toHaveStyle({ backgroundColor: swagLightSystemPalette.primary });
  });
});
