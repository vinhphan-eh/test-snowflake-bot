import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import { CardStatus, mockGetCurrentCardDetailsQuery } from '../../../../../new-graphql/generated';
import { PaySplitOutcomeScreen } from '../PaySplitOutcomeScreen';

describe('Pay Account Switch Outcome Screen', () => {
  it('should render correctly', () => {
    const { getByLabelText, getByText } = render(<PaySplitOutcomeScreen />);

    expect(getByText('Nice! Your Pay Split has been set up.')).toBeTruthy();
    expect(getByText(`Now it's time to set up your card.`)).toBeTruthy();
    expect(getByLabelText('Rocket Money')).toBeTruthy();
    expect(getByLabelText('Next')).toBeTruthy();
  });

  it('should end the flow if card setup is done', async () => {
    mockServerNode.use(
      mockGetCurrentCardDetailsQuery((_, res, context) =>
        res.once(context.data({ me: { wallet: { card: { details: { id: '123', status: CardStatus.Active } } } } }))
      )
    );

    const { findByText } = render(<PaySplitOutcomeScreen />);

    const doneBtn = await findByText('Done');
    await waitFor(() => {
      expect(doneBtn).toBeEnabled();
    });

    fireEvent.press(doneBtn);

    expect(mockNavigateToTopTabs).toBeCalledWith('income-tab');
  });

  it('should continue card setup if card setup not completed yet', async () => {
    mockServerNode.use(
      mockGetCurrentCardDetailsQuery((_, res, context) =>
        res.once(context.data({ me: { wallet: { card: { details: { id: '', status: CardStatus.Active } } } } }))
      )
    );

    const { findByText, getByText } = render(<PaySplitOutcomeScreen />);

    const nextBtn = await findByText('Next');
    await waitFor(() => {
      expect(nextBtn).toBeEnabled();
    });

    expect(getByText(`Now it's time to set up your card.`)).toBeTruthy();

    fireEvent.press(nextBtn);

    await waitFor(() => {
      expect(mockedNavigate).toBeCalledWith('CardSetupStack', {
        screen: 'PinSetupStack',
        params: {
          screen: 'ChoosePin',
          params: {
            header: 'Card set-up',
            title: 'Choose a secure 4 digit PIN for your card.',
            repeatedPinScreen: {
              header: 'Card set-up',
              title: 'Repeat your PIN.',
              onPinVerifiedSuccess: expect.anything(),
            },
          },
        },
      });
    });
  });
});
