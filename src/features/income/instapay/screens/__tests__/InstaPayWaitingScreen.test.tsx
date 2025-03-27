import React from 'react';
import { useRoute } from '@react-navigation/native';
import { mockedReplace } from '../../../../../../__mocks__/react-navigation';
import { render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockAddBeneficiaryMutation } from '../../../../../new-graphql/generated';
import { InstaPayWaitingScreen } from '../InstaPayWaitingScreen';

describe('InstaPayWaitingScreen', () => {
  describe('When flow is AddBeneficiary', () => {
    beforeEach(() => {
      const mockedUseRoute = useRoute as jest.Mock;

      mockedUseRoute.mockReturnValue({
        params: {
          flow: 'AddBeneficiary',
        },
      });
    });

    it('should navigate to InstapayConfirm after success', async () => {
      mockServerNode.use(
        mockAddBeneficiaryMutation((_, res, ctx) => {
          return res(
            ctx.delay(500),
            ctx.data({
              floatAccount: {
                addBeneficiary: {
                  __typename: 'NewBeneficiaryPayload',
                  beneficiaryId: '123',
                },
              },
            })
          );
        })
      );

      render(<InstaPayWaitingScreen />);
      await waitFor(() => {
        expect(mockedReplace).toBeCalledWith('InstaPayConfirm');
      });
    });

    it('should navigate to InstaPayTrustedBeneficiaryError after fail', async () => {
      mockServerNode.use(
        mockAddBeneficiaryMutation((_, res) => {
          return res.networkError('Failed to fetch');
        })
      );

      render(<InstaPayWaitingScreen />);
      await waitFor(() => {
        expect(mockedReplace).toHaveBeenCalledWith('InstaPayTrustedBeneficiaryError');
      });
    });
  });
});
