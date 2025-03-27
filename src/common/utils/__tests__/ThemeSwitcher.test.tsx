import React from 'react';
import { Button, swagLightSystemPalette, swagSystemPalette } from '@hero-design/rn';
import { render } from '@testing-library/react-native';
import { useSessionStore } from '../../stores/useSessionStore';
import ThemeSwitcher from '../ThemeSwitcher';

describe('ThemeSwitcher', () => {
  it('renders correctly when swagRebrandEnabled is false', () => {
    useSessionStore.setState({
      swagRebrandEnabled: false,
    });

    const { getByTestId, getByText } = render(
      <ThemeSwitcher name="swag">
        <Button testID="test-button" text="Content" onPress={() => {}} />
      </ThemeSwitcher>
    );

    expect(getByText('Content')).toBeVisible();
    expect(getByTestId('test-button')).toHaveStyle({ backgroundColor: swagSystemPalette.primary });
  });

  it('renders correctly when swagRebrandEnabled is true', () => {
    useSessionStore.setState({
      swagRebrandEnabled: true,
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
