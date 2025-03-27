/* eslint-disable import/first */
const mockMarkSeen = jest.fn();
const mockNavigateBack = jest.fn();
const mockNavigateToLegalAgreement = jest.fn();
const mockCreateConsolidationSupportMutation = jest.fn();
const mockNavigateToCreateConsolidationRequestSuccess = jest.fn();

import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useSessionStore } from '../../../../../common/stores/useSessionStore';
import { fireEvent, render } from '../../../../../common/utils/testing';
import { SuperConsolidationIntroScreenInner } from '../SuperConsolidationIntroScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

jest.mock('../../../../../common/stores/useSessionStore');
jest.mock('../../../store/useSeenSuperConsolidationIntro', () => ({
  useSeenSuperConsolidationIntro: () => ({
    markSeen: mockMarkSeen,
  }),
}));

jest.mock('../../../hooks/useSuperConsolidationNavigation', () => ({
  useSuperConsolidationNavigation: () => ({
    navigateBack: mockNavigateBack,
    navigateToLegalAgreement: mockNavigateToLegalAgreement,
    navigateToCreateConsolidationRequestSuccess: mockNavigateToCreateConsolidationRequestSuccess,
    navigateToCreateConsolidationFailed: jest.fn(),
  }),
}));

jest.mock('../../../../../new-graphql/generated', () => ({
  useCreateSuperConsolidationSupportRequestMutation: () => ({
    mutateAsync: mockCreateConsolidationSupportMutation,
  }),
}));

describe('SuperConsolidationIntroScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: false,
    });
  });

  const swagSuperfund = {
    superfundFeatureFlag: {
      consolidationSupported: true,
    },
    fundName: 'abc fund',
    usi: 'usi',
  };

  it('step 1 should render correctly with supported consolidation fund', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        swagSuperfund,
      },
      key: '',
      name: '',
    });
    const { getByLabelText, getByText, queryByText } = render(
      <SuperConsolidationIntroScreenInner selectedItemIndex={0} />
    );
    expect(getByLabelText('Super Consolidation Intro')).toBeTruthy();

    expect(getByText('How might I have lost super?')).toBeTruthy();

    expect(queryByText('Not now')).toBeFalsy();
    expect(queryByText(`Let's go!`)).toBeFalsy();
  });

  it('step 2 should render correctly supported consolidation fund', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        swagSuperfund,
      },
      key: '',
      name: '',
    });
    const { getByLabelText, getByText } = render(<SuperConsolidationIntroScreenInner selectedItemIndex={1} />);
    expect(getByLabelText('Super Consolidation Intro')).toBeTruthy();

    expect(getByText('How does it work?')).toBeTruthy();

    expect(getByText('Not now')).toBeTruthy();
    expect(getByText(`Let's go!`)).toBeTruthy();
    fireEvent.press(getByText(`Not now`));
    expect(mockMarkSeen).toBeCalled();
    expect(mockNavigateBack).toBeCalled();
    fireEvent.press(getByText(`Let's go!`));
    expect(mockMarkSeen).toBeCalled();
    expect(mockNavigateToLegalAgreement).toHaveBeenCalledWith(swagSuperfund);
  });

  it('step 1 should render correctly unsupported consolidation fund', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        swagSuperfund: {
          ...swagSuperfund,
          superfundFeatureFlag: {
            consolidationSupported: false,
          },
        },
      },
      key: '',
      name: '',
    });
    const { getByText } = render(<SuperConsolidationIntroScreenInner selectedItemIndex={0} />);

    expect(
      getByText(`If you've ever changed your name, address or job, you may have lost track of some of your super.`)
    ).toBeTruthy();
    expect(
      getByText(
        "Don't worry, either your fund or the ATO can help you find your lost super. Bringing all your super together may save on fees and makes it easier to manage."
      )
    ).toBeTruthy();
  });

  it('step 2 should render correctly unsupported consolidation fund without rebrand', async () => {
    mockedUseRoute.mockReturnValue({
      params: {
        swagSuperfund: {
          ...swagSuperfund,
          superfundFeatureFlag: {
            consolidationSupported: false,
          },
        },
      },
      key: '',
      name: '',
    });

    const { getByLabelText, getByText } = render(<SuperConsolidationIntroScreenInner selectedItemIndex={1} />);
    expect(getByLabelText('Super Consolidation Intro')).toBeTruthy();

    expect(getByText("Your fund isn't supported just yet")).toBeTruthy();
    expect(getByText('Swag partners with super funds to unlock powerful features for you.')).toBeTruthy();
    expect(
      getByText(
        'When your fund partners with us, we make it easy for you to find your lost super right from the Swag app.'
      )
    ).toBeTruthy();

    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('I want this feature')).toBeTruthy();
    fireEvent.press(getByText(`Cancel`));
    expect(mockMarkSeen).toBeCalled();
    expect(mockNavigateBack).toBeCalled();
    fireEvent.press(getByText(`I want this feature`));
    expect(mockCreateConsolidationSupportMutation).toHaveBeenCalledWith({
      usi: swagSuperfund.usi,
    });
  });

  it('step 2 should render correctly unsupported consolidation fund with rebrand', async () => {
    (useSessionStore as unknown as jest.Mock).mockReturnValue({
      swagTextAndImageRebrandEnabled: true,
    });
    mockedUseRoute.mockReturnValue({
      params: {
        swagSuperfund: {
          ...swagSuperfund,
          superfundFeatureFlag: {
            consolidationSupported: false,
          },
        },
      },
      key: '',
      name: '',
    });

    const { getByLabelText, getByText } = render(<SuperConsolidationIntroScreenInner selectedItemIndex={1} />);
    expect(getByLabelText('Super Consolidation Intro')).toBeTruthy();

    expect(getByText("Your fund isn't supported just yet")).toBeTruthy();
    expect(getByText('Employment Hero partners with super funds to unlock powerful features for you.')).toBeTruthy();
    expect(
      getByText(
        'When your fund partners with us, we make it easy for you to find your lost super right from the Employment Hero Work app.'
      )
    ).toBeTruthy();

    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('I want this feature')).toBeTruthy();
    fireEvent.press(getByText(`Cancel`));
    expect(mockMarkSeen).toBeCalled();
    expect(mockNavigateBack).toBeCalled();
    fireEvent.press(getByText(`I want this feature`));
    expect(mockCreateConsolidationSupportMutation).toHaveBeenCalledWith({
      usi: swagSuperfund.usi,
    });
  });
});
