import React from 'react';
import { Share, Linking } from 'react-native';
import { EMPLOYMENT_HERO_HELP_CENTER_LINK } from '../../../../common/constants/links';
import * as useInAppBrowser from '../../../../common/shared-hooks/useInAppBrowser';
import { usePermissionStore } from '../../../../common/stores/usePermissionStore';
import { render, fireEvent } from '../../../../common/utils/testing';
import {
  useGetActiveSuperfundMembershipsQuery,
  useGetEventsPaginatedQuery,
  useGetFundNotifyPreferenceQuery,
  useGetSuperConsolidationQuery,
  useGetSuperConsolidationSupportRequestQuery,
  useGetSuperContributionsQuery,
  useGetSwagSuperfundAndSuperContributionQuery,
} from '../../../../new-graphql/generated';
import { MockGetSuperContributions } from '../../../../new-graphql/handlers/custom-mock/superContributions';
import {
  aFundNotifyPreference,
  aLifecycleEvent,
  aSuperConsolidation,
  aSuperConsolidationRequestSupport,
} from '../../../../new-graphql/mocks/generated-mocks';
import { SuperDashboardScreen } from '../SuperDashboardScreen';

jest.mock('../../../../new-graphql/generated', () => ({
  useGetSwagSuperfundAndSuperContributionQuery: jest.fn(),
  useGetSuperContributionsQuery: jest.fn(),
  useGetSuperConsolidationQuery: jest.fn(),
  useGetSuperConsolidationSupportRequestQuery: jest.fn(),
  useGetEventsPaginatedQuery: jest.fn(),
  useGetFundNotifyPreferenceQuery: jest.fn(),
  useGetActiveSuperfundMembershipsQuery: jest.fn(),
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

describe('Super Dashboard Screen', () => {
  beforeEach(() => {
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            id: '1234',
            fundName: 'Spirit Super',
            memberNumber: '32784928',
            abn: '6090511506',
            usi: '60905115063003',
            fundChoice: 'Regulated',
          },
        },
      },
    });
    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: [...MockGetSuperContributions],
        },
      },
    });
    (useGetSuperConsolidationQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superConsolidation: aSuperConsolidation(),
        },
      },
    });
    (useGetSuperConsolidationSupportRequestQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superConsolidationRequestSupport: aSuperConsolidationRequestSupport(),
        },
      },
    });
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
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
    });
  });

  it('should renders Request swag superfund tile when swagSuperfund is null', () => {
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: null,
        },
      },
    });
    const { getByText, queryByText } = render(<SuperDashboardScreen />);
    expect(getByText('Learn more')).toBeTruthy();
    expect(getByText('Put the Super in Superannuation')).toBeTruthy();
    expect(getByText('Connect your superannuation to Swag')).toBeTruthy();
    expect(queryByText('Fund name')).toBeNull();
    expect(queryByText('Fund type')).toBeNull();
  });

  it('should renders properly when swagSuperfund is found', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superSalarySacrifice: { view: false } },
    });

    const { getAllByText, getByLabelText, getByText } = render(<SuperDashboardScreen />);
    expect(getAllByText('Spirit Super')).toHaveLength(2);
    expect(getByLabelText('money super icon')).toBeTruthy();
    expect(getByText('Fund name')).toBeTruthy();
    expect(getByText('Member number')).toBeTruthy();
    expect(getAllByText('32784928')).toHaveLength(1);
    expect(getByText('ABN')).toBeTruthy();
    expect(getByText('6090511506')).toBeTruthy();
    expect(getByText('USI')).toBeTruthy();
    expect(getByText('60905115063003')).toBeTruthy();
    expect(getByText('Fund type')).toBeTruthy();
    expect(getByText('Regulated')).toBeTruthy();
  });

  it('should renders Salary sacrifice Boost now tile when conditions are meet', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superSalarySacrifice: { view: true } },
    });

    (useGetSuperContributionsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          superContributions: null,
        },
      },
    });

    const { getByText } = render(<SuperDashboardScreen />);
    expect(getByText('Boost your super with salary sacrifice')).toBeTruthy();
    expect(getByText('Boost now')).toBeTruthy();
  });

  it('should renders Fund details and Manage your contributions tile when conditions are meet', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superSalarySacrifice: { view: true } },
    });

    const { getByText } = render(<SuperDashboardScreen />);
    expect(getByText('Fund details')).toBeTruthy();
    expect(getByText('Salary sacrifice')).toBeTruthy();
    expect(getByText('Manage your contributions')).toBeTruthy();
  });

  it('should opens FAQs link when user click on Visit our FAQs', () => {
    const mockOpenUrl = jest.fn();
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockImplementation(() => {
      return {
        openUrl: mockOpenUrl,
      };
    });
    jest.spyOn(Linking, 'openURL');
    const { getByTestId, getByText } = render(<SuperDashboardScreen />);

    expect(getByText('Want to know more about Super in Swag?')).toBeTruthy();

    const termCondButton = getByTestId('visit-faqs-test-id');
    fireEvent.press(termCondButton);

    expect(mockOpenUrl).toBeCalledWith(EMPLOYMENT_HERO_HELP_CENTER_LINK);
    jest.spyOn(useInAppBrowser, 'useInAppBrowser').mockRestore();
    jest.spyOn(Linking, 'openURL').mockRestore();
  });

  it('should calls Share.share when user click on SuperDetailsTile', () => {
    const mockShare = jest.spyOn(Share, 'share').mockImplementation(jest.fn());
    const { getByTestId, getByText } = render(<SuperDashboardScreen />);
    expect(getByText('Regulated')).toBeTruthy();
    expect(mockShare).toBeCalledTimes(0);
    fireEvent.press(getByTestId('super-data-card'));
    expect(mockShare).toBeCalledTimes(1);
    expect(mockShare).toHaveBeenCalledWith({
      message: `Here are my Super details\nName: Spirit Super\nUSI: 60905115063003\nABN: 6090511506\nMember number: 32784928`,
    });
    jest.spyOn(Share, 'share').mockRestore();
  });

  it('should render spaceship logo when usi is matched', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            usi: '34300938877005',
          },
        },
      },
    });
    const { getByTestId } = render(<SuperDashboardScreen />);

    expect(getByTestId('custom-spaceship-logo-test-id')).toBeDefined();
  });

  it('should not render spaceship logo when usi is not matched', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState },
    });
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            usi: 'random-usi',
          },
        },
      },
    });
    const { getByLabelText, queryByTestId } = render(<SuperDashboardScreen />);
    expect(queryByTestId('custom-spaceship-logo-test-id')).toBeNull();
    expect(getByLabelText('money super icon')).toBeTruthy();
  });

  it('should render default logo when ff is off', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, customFundAssetSwag: { view: false } },
    });
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            usi: 'random-usi',
          },
        },
      },
    });
    const { getByLabelText, queryByTestId } = render(<SuperDashboardScreen />);
    expect(queryByTestId('custom-spaceship-logo-test-id')).toBeNull();
    expect(getByLabelText('money super icon')).toBeTruthy();
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
    const { getByText } = render(<SuperDashboardScreen />);
    expect(getByText('Review')).toBeTruthy();
    expect(getByText("Tell your fund you're moving employers")).toBeTruthy();
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
    const { queryByText } = render(<SuperDashboardScreen />);
    expect(queryByText('Review')).toBeNull();
    expect(queryByText("Tell your fund you're moving employers")).toBeNull();
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
                owner_id: 'onwer_id',
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
    const { queryByText } = render(<SuperDashboardScreen />);
    expect(queryByText('Review')).toBeNull();
    expect(queryByText("Tell your fund you're moving employers")).toBeNull();
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
                owner_id: 'onwer_id',
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
    const { queryByText } = render(<SuperDashboardScreen />);
    expect(queryByText('Review')).toBeNull();
    expect(queryByText("Tell your fund you're moving employers")).toBeNull();
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
    const { queryByText } = render(<SuperDashboardScreen />);
    expect(queryByText('Review')).toBeNull();
    expect(queryByText("Tell your fund you're moving employers")).toBeNull();
  });

  it('should not render ResyncYourSuperTile when swagSuperfund is null', () => {
    const { queryByText } = render(<SuperDashboardScreen />);
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: null,
        },
      },
    });
    expect(queryByText('Resync your Super details to Swag')).toBeNull();
  });

  it('should not render ResyncYourSuperTile when no active membership', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superSalarySacrifice: { view: true } },
    });
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            id: '1234',
            fundName: 'Spirit Super',
            memberNumber: '32784928',
            abn: '6090511506',
            usi: '60905115063003',
            fundChoice: 'Regulated',
          },
        },
      },
    });
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [],
        },
      },
    });
    const { queryByText } = render(<SuperDashboardScreen />);
    expect(queryByText('Resync your Super details to Swag')).toBeNull();
  });

  it('should not render ResyncYourSuper tile when superfunds are match', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superSalarySacrifice: { view: true } },
    });
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            id: '1234',
            fundName: 'Spirit Super',
            memberNumber: '32784928',
            abn: '6090511506',
            usi: '60905115063003',
            fundChoice: 'Regulated',
          },
        },
      },
    });
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [
            {
              id: 290508,
              uuid: '20e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
              name: 'Employment Hero',
              memberId: 123456,
              memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
              activeSuperfundMembership: {
                fundName: 'Spirit Super',
                memberNumber: '32784928',
                abn: '6090511506',
                usi: '60905115063003',
                fundChoice: 'Regulated',
                updatedAt: '2024-10-01T04:29:08.799Z',
              },
            },
          ],
        },
      },
    });
    const { queryByText } = render(<SuperDashboardScreen />);
    expect(queryByText('Resync your Super details to Swag')).toBeNull();
  });

  it('should render ResyncYourSuper tile when superfunds are not match', () => {
    usePermissionStore.setState({
      permissions: { ...initialPermissionsState, superSalarySacrifice: { view: true } },
    });
    (useGetSwagSuperfundAndSuperContributionQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          swagSuperfund: {
            id: '1234',
            fundName: 'Spirit Super',
            memberNumber: '32784928',
            abn: '6090511506',
            usi: '60905115063003',
            fundChoice: 'Regulated',
          },
        },
      },
    });
    (useGetActiveSuperfundMembershipsQuery as unknown as jest.Mock).mockReturnValue({
      data: {
        me: {
          orgs: [
            {
              id: 290508,
              uuid: '20e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
              name: 'Employment Hero',
              memberId: 123456,
              memberUuid: '11e4b652-18ed-42c4-8fe0-7f4c6120bdc8',
              activeSuperfundMembership: {
                fundName: 'Spirit Super',
                memberNumber: '32784920',
                abn: '6090511506',
                usi: '60905115063009',
                fundChoice: 'Regulated',
                updatedAt: '2024-10-01T04:29:08.799Z',
              },
            },
          ],
        },
      },
    });
    const { getByText } = render(<SuperDashboardScreen />);
    expect(getByText('Resync your Super details to Swag')).toBeTruthy();
  });
});
