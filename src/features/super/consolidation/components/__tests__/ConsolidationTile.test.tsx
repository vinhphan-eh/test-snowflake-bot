import React from 'react';
import { LocalStorage, LocalStorageKey } from '../../../../../common/libs/storage/localStorage';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { render } from '../../../../../common/utils/testing';
import {
  useGetSuperConsolidationQuery,
  useGetSuperConsolidationSupportRequestQuery,
} from '../../../../../new-graphql/generated';
import { aSuperConsolidationRequestSupport } from '../../../../../new-graphql/mocks/generated-mocks';
import { ConsolidationTile } from '../ConsolidationTile';

const initialPermissionsState = {
  superConsolidation: {
    view: false,
  },
};

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetSuperConsolidationQuery: jest.fn(),
  useGetSuperConsolidationSupportRequestQuery: jest.fn(),
}));

describe('should render consolidation properly', () => {
  const swagSuperfund = {
    abn: '1234',
    fundChoice: 'ART',
    fundName: 'ART',
    id: '12345',
    memberNumber: '123456',
    superfundFeatureFlag: {
      consolidationSupported: true,
    },
    superfundMetadata: {
      externalLink: 'http://employmenthero.com',
    },
    usi: '1234567',
  };

  beforeEach(() => {
    (useGetSuperConsolidationQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superConsolidation: undefined,
        },
      },
    });
    (useGetSuperConsolidationSupportRequestQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superConsolidationRequestSupport: undefined,
        },
      },
    });
  });

  it('should render not render consolidation if user does not have permission', () => {
    usePermissionStore.setState({
      permissions: initialPermissionsState as never, // cause I only care about superConsolidation
    });
    const { queryByText } = render(<ConsolidationTile swagSuperfund={swagSuperfund} />);
    expect(queryByText('Find your lost Super')).toBeNull();
  });

  it('should render consolidation if have permission', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superConsolidation: { view: true } } as never, // cause I only care about superConsolidation
    });

    const { getByText } = render(<ConsolidationTile swagSuperfund={swagSuperfund} />);
    expect(getByText('Do you have lost Super?')).toBeTruthy();
  });

  it('should not render ad card if user has seen intro', async () => {
    await LocalStorage.setItem(LocalStorageKey.EbenConsolidateIntroSeen, true);
    const { queryByText } = render(<ConsolidationTile swagSuperfund={swagSuperfund} />);
    expect(queryByText('Find your lost Super')).toBeNull();
  });

  it('should render properly for unsupported funds without request support', async () => {
    await LocalStorage.setItem(LocalStorageKey.EbenConsolidateIntroSeen, false);
    const supportSwagSuperfund = {
      ...swagSuperfund,
      superfundFeatureFlag: {
        consolidationSupported: false,
      },
    };
    const { queryByText } = render(<ConsolidationTile swagSuperfund={supportSwagSuperfund} />);
    expect(queryByText('Find and combine your funds')).toBeTruthy();
  });

  it('should render properly for unsupported funds with request support', async () => {
    (useGetSuperConsolidationSupportRequestQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superConsolidationRequestSupport: aSuperConsolidationRequestSupport,
        },
      },
    });
    await LocalStorage.setItem(LocalStorageKey.EbenConsolidateIntroSeen, false);
    const supportSwagSuperfund = {
      ...swagSuperfund,
      superfundFeatureFlag: {
        consolidationSupported: false,
      },
    };
    const { queryByText } = render(<ConsolidationTile swagSuperfund={supportSwagSuperfund} />);
    expect(queryByText('Find and combine your funds')).toBeNull();
    expect(queryByText("We've received your feature request!")).toBeTruthy();
  });
});
