import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedGoBack, mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { fireEvent, render } from '../../../../common/utils/testing';
import { mockNavigateToTopTabs } from '../../../../navigation/__mocks__/rootNavigation';
import { StashWithdrawOutcomeScreen } from '../StashWithdrawOutcomeScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Stash Withdraw Outcome Screen', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  describe('Successful outcome', () => {
    describe('Withdraw', () => {
      beforeEach(() => {
        mockedUseRoute.mockReturnValue({
          params: {
            id: '1',
            amount: '100',
            name: 'Holiday',
            isClosed: false,
            isError: false,
          },
          key: '',
          name: '',
        });
      });

      it('should render properly', () => {
        const { getByText } = render(<StashWithdrawOutcomeScreen />);
        expect(getByText('Your money was moved')).toBeTruthy();
        expect(getByText('$100.00')).toBeTruthy();
      });

      it('should go to Stash Details screen by clicking Done button', () => {
        const { getByText } = render(<StashWithdrawOutcomeScreen />);
        const button = getByText('Done');
        fireEvent.press(button);
        expect(mockedNavigate).toBeCalledWith('StashIndividual', expect.anything());
      });
    });

    describe('Withdraw and Close', () => {
      beforeEach(() => {
        mockedUseRoute.mockReturnValue({
          params: {
            amount: '100',
            name: 'Holiday',
            isClosed: true,
          },
          key: '',
          name: '',
        });
      });

      it('should render properly', () => {
        const { getByText } = render(<StashWithdrawOutcomeScreen />);
        expect(getByText('Your money was moved')).toBeTruthy();
        expect(getByText('$100.00')).toBeTruthy();
        expect(getByText('Holiday')).toBeTruthy();
      });

      it('should go to Stash Dashboard screen by clicking Done button', () => {
        const { getByLabelText } = render(<StashWithdrawOutcomeScreen />);
        const button = getByLabelText('Done');
        fireEvent.press(button);
        expect(mockNavigateToTopTabs).toBeCalledWith('stash-tab');
      });
    });
  });

  describe('Error outcome', () => {
    beforeEach(() => {
      mockedUseRoute.mockReturnValue({
        params: {
          amount: '100',
          isError: true,
        },
        key: '',
        name: '',
      });
    });

    it('should render properly', () => {
      const { getByText } = render(<StashWithdrawOutcomeScreen />);
      expect(getByText("We're sorry, something went wrong")).toBeTruthy();
      expect(getByText('Please try again later')).toBeTruthy();
    });

    it('should go to Stash Details screen by clicking Close button', () => {
      const { getByText } = render(<StashWithdrawOutcomeScreen />);
      const button = getByText('Close');
      fireEvent.press(button);
      expect(mockedNavigate).toBeCalledWith('StashIndividual', expect.anything());
    });

    it('should go to Withdraw Amount screen by clicking Try again button', () => {
      const { getByLabelText } = render(<StashWithdrawOutcomeScreen />);
      const button = getByLabelText('Try again');
      fireEvent.press(button);
      expect(mockedGoBack).toBeCalledWith();
    });
  });
});
