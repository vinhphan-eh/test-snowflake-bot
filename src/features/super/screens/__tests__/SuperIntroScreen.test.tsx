import React from 'react';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import { render } from '../../../../common/utils/testing';
import { SuperIntroScreen } from '../SuperIntroScreen';

jest.mock('../../../../common/stores/useSessionStore');

describe('SuperIntroScreen', () => {
  beforeEach(() => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('should render correctly without rebrand', async () => {
    const { getByLabelText, getByText } = render(<SuperIntroScreen />);
    expect(getByLabelText('Super Intro')).toBeTruthy();

    expect(
      getByText('Super is important as it allows you to accumulate savings for your retirement years.')
    ).toBeTruthy();

    expect(
      getByText(
        'This money becomes available to you under specific conditions such as reaching retirement age or turning 65.'
      )
    ).toBeTruthy();

    expect(getByText('How can Swag help my super?')).toBeTruthy();
  });

  it('should render correctly with rebrand', async () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });

    const { getByLabelText, getByText } = render(<SuperIntroScreen />);
    expect(getByLabelText('Super Intro')).toBeTruthy();

    expect(
      getByText('Super is important as it allows you to accumulate savings for your retirement years.')
    ).toBeTruthy();

    expect(
      getByText(
        'This money becomes available to you under specific conditions such as reaching retirement age or turning 65.'
      )
    ).toBeTruthy();

    expect(getByText('How can Employment Hero Work help my super?')).toBeTruthy();
  });
});
