import React from 'react';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import * as sessionStore from '../../../../../common/stores/useSessionStore';
import type { MockQueryResult } from '../../../../../common/types/react-query';
import { fireEvent, render } from '../../../../../common/utils/testing';
import type { PickForYouQuery } from '../../../../../graphql/generated';
import { usePickForYouQuery } from '../../../../../graphql/generated';
import { MockGetCatalogues } from '../../../../../graphql/handlers/custom-mock/catalogues';
import { FeatureOffers } from '../FeatureOffers';

const mockUsePickForYouQuery = usePickForYouQuery as unknown as jest.Mock<MockQueryResult<PickForYouQuery>>;
(mockUsePickForYouQuery as unknown as { getKey: () => string }).getKey = jest.fn();

jest.mock('../../../../../graphql/generated');

const data = MockGetCatalogues.at(0);

describe('FeatureOffers', () => {
  const initialPermissionsState = {
    instapay: {
      view: true,
    },
    superAppBenefits: {
      view: true,
    },
    superAppWallet: {
      view: true,
    },
    superAppSettings: {
      view: true,
    },
    superAppHome: {
      view: true,
    },
    superAppCashback: {
      view: true,
    },
    superAppBenefitsFeaturedOffers: {
      view: true,
    },
    superAppCashbackCategories: {
      view: true,
    },
    heroPoints: {
      view: false,
    },
  };

  beforeEach(() => {
    mockUsePickForYouQuery.mockReturnValue({
      data: {
        pickForYou: {
          items: [data?.items[0]] as never,
        },
      },
      isLoading: false,
    });
    jest.spyOn(sessionStore, 'useSessionStore').mockReturnValue({
      currentOrgId: '123',
    });

    usePermissionStore.setState({ permissions: initialPermissionsState });
  });
  it('should navigate to product detail screen when featured offer card is clicked', async () => {
    const { findByLabelText } = render(<FeatureOffers />);

    const button = await findByLabelText('Feature item');
    fireEvent.press(button);
    expect(mockedNavigate).toBeCalledWith('BenefitsStack', {
      screen: 'DiscountShopStack',
      params: {
        screen: 'ProductDetail',
        params: {
          productCode: data?.items[0].productCode,
        },
      },
    });
  });

  it('should not show featured section when query returns error', async () => {
    mockUsePickForYouQuery.mockReturnValue({
      data: {
        pickForYou: {
          items: [data?.items[0]] as never,
        },
      },
      isLoading: false,
      isError: true,
    });
    const { queryByText } = render(<FeatureOffers />);
    expect(queryByText('Featured')).toBeNull();
  });

  it('should not show featured section when returns empty', async () => {
    mockUsePickForYouQuery.mockReturnValue({
      data: {
        pickForYou: undefined as never,
      },
      isLoading: false,
      isSuccess: true,
    });
    const { queryByText } = render(<FeatureOffers />);
    expect(queryByText('Featured')).toBeNull();
  });

  it('should not show featured section when no permission', async () => {
    usePermissionStore.setState({
      permissions: {
        superAppBenefitsFeaturedOffers: {
          view: false,
        },
      } as never,
    });

    const { queryByText } = render(<FeatureOffers />);
    expect(queryByText('Featured')).toBeNull();
  });
});
