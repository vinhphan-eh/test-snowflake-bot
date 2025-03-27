import React from 'react';
import { PillarIds, WalletTabKeys } from '../../../../../common/constants/navigation';
import { mockedSwitchPillar } from '../../../../../common/stores/__mocks__/useMiniAppSwitcherStore';
import { usePermissionStore } from '../../../../../common/stores/usePermissionStore';
import { fireEvent, render } from '../../../../../common/utils/testing';

import { useGetEventsPaginatedQuery, useGetFundNotifyPreferenceQuery } from '../../../../../new-graphql/generated';
import { aFundNotifyPreference, aLifecycleEvent } from '../../../../../new-graphql/mocks/generated-mocks';
import { LifecycleTile } from '../LifecycleTile';

jest.mock('../../../../../new-graphql/generated', () => ({
  useGetEventsPaginatedQuery: jest.fn(),
  useGetFundNotifyPreferenceQuery: jest.fn(),
}));

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
  customFundAssetSwag: {
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
  superChoiceSwag: {
    view: true,
  },
  eBenStash: {
    view: true,
  },
  heroPoints: {
    view: false,
  },
  superfundLifecycleV1: {
    view: true,
  },
};

describe('LifecycleTile', () => {
  beforeEach(() => {
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: aLifecycleEvent(),
          },
        },
      },
    });
    (useGetFundNotifyPreferenceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            fundNotifyPreference: aFundNotifyPreference(),
          },
        },
      },
    });
  });
  it('should renders SuperannuationLifecycleEvent when user have Lifecycle Events', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: [
              {
                id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
                code: 'offboarding',
                source: 'EH',
                user_id: 'cb250894-49d9-4665-835c-73804b06e0cb',
                owner_id: '7e83e548-501f-487e-ad55-9a431616330e',
                fund_usi: '53226460365001',
                author_type: 'owner',
                author_id: '0ab0fbac-6044-45a6-ba3c-69f1001d019c',
                trigger_time: '2024-07-31',
                data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"Aware Super","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
                delivery_status: 'initial',
                delivered_at: null,
                accepted: false,
                accepted_from: '',
                correlation_id:
                  'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
                created_at: '2024-07-31',
                updated_at: '2024-07-31',
              },
            ],
          },
        },
      },
    });
    (useGetFundNotifyPreferenceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            fundNotifyPreference: {
              enabled: false,
            },
          },
        },
      },
    });
    const { getByText } = render(<LifecycleTile />);
    expect(getByText('Super')).toBeTruthy();
    expect(getByText('Moving employers')).toBeTruthy();
    expect(getByText('Tell Aware Supe..')).toBeTruthy();
  });

  it('should not render SuperannuationLifecycleEvent when user dont have Lifecycle Events', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: [],
          },
        },
      },
    });
    const { queryByText } = render(<LifecycleTile />);
    expect(queryByText('Super')).toBeNull();
    expect(queryByText('Moving employers')).toBeNull();
    expect(queryByText('Tell Aware Supe..')).toBeNull();
  });

  it('should not render SuperannuationLifecycleEvent when Lifecycle Event fund_usi is Aus Super', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: [
              {
                id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
                code: 'offboarding',
                source: 'EH',
                user_id: 'user_id',
                owner_id: 'owner_id',
                fund_usi: 'STA0100AU',
                author_type: 'owner',
                author_id: 'author_id',
                trigger_time: '2024-07-31',
                data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"AustralianSuper","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
                delivery_status: 'initial',
                delivered_at: null,
                accepted: false,
                accepted_from: '',
                correlation_id:
                  'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
                created_at: '2024-07-31',
                updated_at: '2024-07-31',
              },
            ],
          },
        },
      },
    });
    const { queryByText } = render(<LifecycleTile />);
    expect(queryByText('Super')).toBeNull();
    expect(queryByText('Moving employers')).toBeNull();
  });

  it('should not render SuperannuationLifecycleEvent when Lifecycle Event fund_usi is Care Super', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: [
              {
                id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
                code: 'offboarding',
                source: 'EH',
                user_id: 'user_id',
                owner_id: 'owner_id',
                fund_usi: 'MTA0100AU',
                author_type: 'owner',
                author_id: 'author_id',
                trigger_time: '2024-07-31',
                data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"CareSuper","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
                delivery_status: 'initial',
                delivered_at: null,
                accepted: false,
                accepted_from: '',
                correlation_id:
                  'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
                created_at: '2024-07-31',
                updated_at: '2024-07-31',
              },
            ],
          },
        },
      },
    });
    (useGetFundNotifyPreferenceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            fundNotifyPreference: {
              enabled: false,
            },
          },
        },
      },
    });
    const { queryByText } = render(<LifecycleTile />);
    expect(queryByText('Super')).toBeNull();
    expect(queryByText('Moving employers')).toBeNull();
  });

  it('should not render SuperannuationLifecycleEvent when fundNotifyPreference is enabled', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: [
              {
                id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
                code: 'offboarding',
                source: 'EH',
                user_id: 'user_id',
                owner_id: 'onwer_id',
                fund_usi: '53226460365001',
                author_type: 'owner',
                author_id: 'author_id',
                trigger_time: '2024-07-31',
                data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"Aware Super","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
                delivery_status: 'initial',
                delivered_at: null,
                accepted: false,
                accepted_from: '',
                correlation_id:
                  'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
                created_at: '2024-07-31',
                updated_at: '2024-07-31',
              },
            ],
          },
        },
      },
    });
    (useGetFundNotifyPreferenceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            fundNotifyPreference: {
              enabled: true,
            },
          },
        },
      },
    });
    const { queryByText } = render(<LifecycleTile />);
    expect(queryByText('Super')).toBeNull();
    expect(queryByText('Moving employers')).toBeNull();
    expect(queryByText('Tell Aware Supe..')).toBeNull();
  });

  it('should redirect to Wallet App when click', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetEventsPaginatedQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            events: [
              {
                id: '1d7b52e0-a7de-4e5a-bd8a-0fab7501a458',
                code: 'offboarding',
                source: 'EH',
                user_id: 'cb250894-49d9-4665-835c-73804b06e0cb',
                owner_id: '7e83e548-501f-487e-ad55-9a431616330e',
                fund_usi: '53226460365001',
                author_type: 'owner',
                author_id: '0ab0fbac-6044-45a6-ba3c-69f1001d019c',
                trigger_time: '2024-07-31',
                data: '{"member_uuid":"f474e442-8c73-4961-a683-874d66d70e5b","member_number":"123456","fund_name":"Aware Super","termination_date":"2024-07-31","owner_name":"Dat Test Org 1"}',
                delivery_status: 'initial',
                delivered_at: null,
                accepted: false,
                accepted_from: '',
                correlation_id:
                  'EH_f474e442-8c73-4961-a683-874d66d70e5b_7e83e548-501f-487e-ad55-9a431616330e_1721968379',
                created_at: '2024-07-31',
                updated_at: '2024-07-31',
              },
            ],
          },
        },
      },
    });
    (useGetFundNotifyPreferenceQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          lifecycle: {
            fundNotifyPreference: {
              enabled: false,
            },
          },
        },
      },
    });
    const { getByText } = render(<LifecycleTile />);
    expect(getByText('Super')).toBeTruthy();
    const tile = getByText('Super');
    fireEvent.press(tile);
    expect(mockedSwitchPillar).toHaveBeenCalledWith({
      to: {
        pillarId: PillarIds.WalletApp,
        tab: WalletTabKeys.SUPER,
      },
    });
  });
});
