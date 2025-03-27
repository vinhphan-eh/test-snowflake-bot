import React from 'react';
import { render, waitFor, within } from '../../../../../common/utils/testing';
import { mockServerNode } from '../../../../../mock-server/mockServerNode';
import { mockGetAllPayeeAddressesQuery } from '../../../../../new-graphql/generated';
import { aBsbTransferPayeeAddress } from '../../../../../new-graphql/mocks/generated-mocks';
import { PayeeList } from '../PayeeList';

describe('PayeeList', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render the spinner if loading payees list', async () => {
    mockServerNode.use(
      mockGetAllPayeeAddressesQuery((_, res, context) => {
        return res(context.status(200), context.data({}), context.delay('infinite'));
      })
    );

    const { getByLabelText } = render(<PayeeList />);

    await waitFor(() => {
      expect(getByLabelText('spinner')).toBeTruthy();
    });
  });

  it('should group the payees by starting letter of friendly name properly', async () => {
    const friendlyNames = ['A start 2', 'a start 1', 'Z last 5', 'z last 4', 'G middle 3'];
    const mockedPayeeAddressesList = friendlyNames.map(friendlyName => aBsbTransferPayeeAddress({ friendlyName }));

    mockServerNode.use(
      mockGetAllPayeeAddressesQuery((_, res, context) => {
        return res(
          context.data({
            me: {
              wallet: {
                payeeAddresses: mockedPayeeAddressesList,
              },
            },
          })
        );
      })
    );

    const { getByTestId } = render(<PayeeList />);

    await waitFor(() => {
      const { queryAllByLabelText } = within(getByTestId('payee-list'));

      expect(queryAllByLabelText('payee-list-item')).toHaveLength(5);

      const sectionHeaders = queryAllByLabelText('payee-list-section-header');
      const headers = ['A', 'G', 'Z'];

      expect(sectionHeaders).toHaveLength(3);
      sectionHeaders.forEach((header, index) => {
        expect(within(header).getByText(headers[index])).toBeTruthy();
      });
    });
  });

  it('should filter displaying payees list matching search query and group properly', async () => {
    const friendlyNames = ['A start 2', 'a start 1', 'Z last 5', 'z last 4', 'G middle 3'];
    const mockedPayeeAddressesList = friendlyNames.map(friendlyName => aBsbTransferPayeeAddress({ friendlyName }));

    mockServerNode.use(
      mockGetAllPayeeAddressesQuery((_, res, context) => {
        return res(
          context.data({
            me: {
              wallet: {
                payeeAddresses: mockedPayeeAddressesList,
              },
            },
          })
        );
      })
    );

    const { getByTestId } = render(<PayeeList searchQuery="a" />);

    await waitFor(() => {
      const { queryAllByLabelText } = within(getByTestId('payee-list'));

      // Exclude 'G middle 3' since not matching the search query
      expect(queryAllByLabelText('payee-list-item')).toHaveLength(4);

      const sectionHeaders = queryAllByLabelText('payee-list-section-header');
      const headers = ['A', 'Z'];

      expect(sectionHeaders).toHaveLength(2);
      sectionHeaders.forEach((header, index) => {
        expect(within(header).getByText(headers[index])).toBeTruthy();
      });
    });
  });
});
