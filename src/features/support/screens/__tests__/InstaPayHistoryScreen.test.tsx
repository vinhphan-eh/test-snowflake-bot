import React from 'react';
import { mockedNavigate } from '../../../../../__mocks__/react-navigation';
import { render, waitFor } from '../../../../common/utils/testing';
import { mockServerNode } from '../../../../mock-server/mockServerNode';
import { mockGetInstapayUserTransactionsQuery } from '../../../../new-graphql/generated';
import { InstaPayHistoryScreen } from '../InstaPayHistoryScreen';

describe('InstaPayHistoryScreen', () => {
  it('should render correctly', () => {
    const { getAllByText } = render(<InstaPayHistoryScreen />);

    expect(getAllByText('Earned Pay history')).toHaveLength(2);
  });

  describe('error', () => {
    beforeEach(() => {
      mockServerNode.use(
        mockGetInstapayUserTransactionsQuery((_, res, ctx) => {
          return res(ctx.status(500));
        })
      );
    });

    it('should show error page', async () => {
      render(<InstaPayHistoryScreen />);

      await waitFor(() => {
        expect(mockedNavigate).toHaveBeenCalledWith('GeneralError');
      });
    });
  });
});
