import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockInitiateEWalletSetupMutation } from '../../../../new-graphql/generated';
import { CheckingDetailsScreen } from '../CheckingDetailsScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

describe('Checking details screen', () => {
  it('should render with loading indicator properly', () => {
    mockedUseRoute.mockReturnValue({ params: { statusIsInprogress: false }, key: '', name: '' });

    const { getByText } = render(<CheckingDetailsScreen />);
    expect(getByText('Checking your details')).toBeTruthy();
  });

  it('should navigate Waiting Screen when API is successful', async () => {
    mockedUseRoute.mockReturnValue({ params: { statusIsInprogress: false }, key: '', name: '' });
    mockServerNode.use(
      mockInitiateEWalletSetupMutation((_, res, ctx) => res(ctx.data({ initiateAUWallet: { success: true } })))
    );

    render(<CheckingDetailsScreen />);
    // eslint-disable-next-line no-promise-executor-return
    await new Promise(res => setTimeout(res, 6000));
    expect(mockedNavigate).toHaveBeenCalledWith('Waiting');
  }, 10000);

  it('should navigate General Error Screen when API has an error', async () => {
    mockedUseRoute.mockReturnValue({ params: { statusIsInprogress: false }, key: '', name: '' });
    mockServerNode.use(
      mockInitiateEWalletSetupMutation((_, res, ctx) => res(ctx.errors([{ message: 'Something went wrong' }])))
    );

    render(<CheckingDetailsScreen />);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('GeneralError', expect.anything());
    });
  });

  test('should navigate waiting page when a user goes this screen second time and more', async () => {
    mockedUseRoute.mockReturnValue({ params: { statusIsInprogress: true }, key: '', name: '' });
    render(<CheckingDetailsScreen />);

    // eslint-disable-next-line no-promise-executor-return
    await new Promise(res => setTimeout(res, 5000));
    expect(mockedNavigate).toHaveBeenCalledWith('Waiting');
  }, 10000);
});
