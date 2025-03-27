import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { render } from '../../../../../common/utils/testing';
import { LegalAgreementScreen } from '../LegalAgreementScreen';

jest.mock('../../../../../common/stores/useSessionStore');

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('LegalAgreementScreen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: {
        swagSuperfund: {
          superfundMetadata: {
            externalLink: 'url',
          },
          fundName: 'ABC fund',
        },
      },
      key: '',
      name: '',
    });
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  it('render correctly without rebrand', () => {
    const { getByText } = render(<LegalAgreementScreen />);

    expect(getByText('Before continuing, we just need to make sure you understand a few things.')).toBeTruthy();
    expect(
      getByText(
        'Swag does not complete any part of the consolidation process. This process is completed by the trustee of ABC fund.'
      )
    ).toBeVisible();
    expect(
      getByText(
        'Swag has not provided any financial advice and you should seek your own elsewhere before consolidating'
      )
    ).toBeVisible();
  });

  it('render correctly with rebrand', () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });
    const { getByText } = render(<LegalAgreementScreen />);

    expect(getByText('Before continuing, we just need to make sure you understand a few things.')).toBeTruthy();
    expect(
      getByText(
        'Employment Hero does not complete any part of the consolidation process. This process is completed by the trustee of ABC fund.'
      )
    ).toBeVisible();
    expect(
      getByText(
        'Employment Hero has not provided any financial advice and you should seek your own elsewhere before consolidating'
      )
    ).toBeVisible();
  });
});
