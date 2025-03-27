import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { render, renderHook, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockUpdateCardPinMutation } from '../../../../../new-graphql/generated';
import { useRequestNewCardStore } from '../../../../card-management/request-new-card/stores/useRequestNewCardStore';
import { LoadingScreen } from '../LoadingScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Loading Screen', () => {
  beforeEach(() => {
    mockedUseRoute.mockReturnValue({
      params: { pin: '1234' },
      key: '',
      name: '',
    });
  });

  it('should go to success screen', async () => {
    mockServerNode.use(
      mockUpdateCardPinMutation((_, res, context) => res(context.data({ card: { updatePin: { success: true } } })))
    );
    const mockSetShowResetPinAlert = jest.fn();
    const { result: recoverCardStore } = renderHook(() => useRequestNewCardStore());
    recoverCardStore.current.setShowResetPinAlert = mockSetShowResetPinAlert;
    const { getByText } = render(<LoadingScreen />);

    await waitFor(() => {
      expect(getByText('Resetting your PIN.')).toBeTruthy();
      expect(mockedNavigate).toHaveBeenCalledWith('Success', { resetCardPin: true });
      expect(mockSetShowResetPinAlert).toHaveBeenCalledWith(false);
    });
  });

  it('should go to error screen', async () => {
    mockServerNode.use(
      mockUpdateCardPinMutation((_, res, context) =>
        res(context.status(400), context.errors([{ message: 'some error' }]))
      )
    );
    const { getByText } = render(<LoadingScreen />);

    await waitFor(() => {
      expect(getByText('Resetting your PIN.')).toBeTruthy();
      expect(mockedNavigate).toHaveBeenCalledWith('Error', { resetCardPin: true });
    });
  });
});
