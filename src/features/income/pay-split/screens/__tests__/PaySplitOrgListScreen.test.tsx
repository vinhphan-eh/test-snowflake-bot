import React from 'react';
import type { ParamListBase, RouteProp } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { renderHook } from '@testing-library/react-hooks';
import { createAllocation, initFlowStore, testEWallet, testOrg1, testOrg2, testOrg3 } from './store-utils.test';
import { mockedNavigate } from '../../../../../../__mocks__/react-navigation';
import * as usePermissionStore from '../../../../../common/stores/usePermissionStore';
import type { RenderAPI } from '../../../../../common/utils/testing';
import { fireEvent, render, waitFor } from '../../../../../common/utils/testing';
import { mockServerNode as mockServer } from '../../../../../mock-server/mockServerNode';
import { mockNavigateToTopTabs } from '../../../../../navigation/__mocks__/rootNavigation';
import {
  PaySplitType,
  mockGetCurrentCardDetailsQuery,
  mockSavePayAccountMutation,
  useSavePayAccountMutation,
} from '../../../../../new-graphql/generated';
import { aCardDetails } from '../../../../../new-graphql/mocks/generated-mocks';
import { usePaySplitFlowStore } from '../../hooks/usePaySplitFlowStore';
import type { PaySplitNetworkData } from '../../hooks/usePaySplitNetworkData';
import { PaySplitOrgListScreen } from '../PaySplitOrgListScreen';

const mockedUseRoute = useRoute as jest.MockedFunction<typeof useRoute>;

const dataCardTestId = (orgId: string) => `dataCardOrgId=${orgId}`;

describe('OrgListScreen', () => {
  let screen: RenderAPI;

  const renderComp = async (data: PaySplitNetworkData, customise?: () => void) => {
    initFlowStore(data, customise);

    screen = render(<PaySplitOrgListScreen />);

    // we know how many orgs are in the data, so we can wait for those orgs boxen to be rendered and end up with a rendered screen
    await waitFor(() => {
      data.allocations.forEach(a => {
        screen.getByTestId(dataCardTestId(a.membership.orgId));
      });
    });
  };

  // initialise a flow store with some changed data
  const initChangedFlowStore = async () => {
    const useSomeChange = () => {
      const a = usePaySplitFlowStore().getAllocations();
      usePaySplitFlowStore().startEditing(a[0]);
      usePaySplitFlowStore().edit({ amount: 10 });
      usePaySplitFlowStore().finishEditing();
    };
    const data = {
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage, 50, 50)],
      eWallet: testEWallet,
      cardSetupDone: true,
    };
    await renderComp(data, useSomeChange);
    await waitFor(() => {
      expect(screen.getByLabelText('Confirm')).toBeEnabled();
    });
  };

  it('should render single org', async () => {
    await renderComp({
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage, 50, 50)],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(screen.getByText('Get paid into your Swag Spend account with Pay Split')).toBeTruthy();
    expect(screen.getByTestId(dataCardTestId(testOrg1.orgId))).toBeTruthy();
    expect(screen.queryByTestId(dataCardTestId(testOrg2.orgId))).toBeNull();

    const confirmBtn = screen.getByLabelText('Confirm');
    expect(confirmBtn).toBeTruthy();
    expect(confirmBtn).toBeDisabled();
  });

  it('should render multiple orgs', async () => {
    await renderComp({
      allocations: [
        createAllocation(false, testOrg1, PaySplitType.Percentage, 50, 50),
        createAllocation(false, testOrg2, PaySplitType.Percentage, 50, 50),
      ],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(screen.getByTestId(dataCardTestId(testOrg1.orgId))).toBeTruthy();
    expect(screen.queryByTestId(dataCardTestId(testOrg1.orgId))).toBeTruthy();
  });

  it('should render a warning when an ewallet allocation is set to 100%', async () => {
    await renderComp({
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage, 100)],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(
      screen.getByText(
        new RegExp(`You’ve allocated all \\(100%\\) of your pay to your Swag Spend account for ${testOrg1.orgName}.`)
      )
    );
  });

  it('should not render a warning when no ewallet allocation is set to 100%', async () => {
    await renderComp({
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage, 50, 50)],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    // This code expects the screen to be fully rendered. Not sure how we can really confirm that.
    expect(
      screen.queryByText(
        new RegExp(`You’ve allocated all \\(100%\\) of your pay to your Swag Spend account for ${testOrg1.orgName}.`)
      )
    ).toBeNull();
  });

  it('should render a warning when two org ewallet allocation are set to 100%', async () => {
    await renderComp({
      allocations: [
        createAllocation(true, testOrg1, PaySplitType.Percentage, 100),
        createAllocation(true, testOrg2, PaySplitType.Percentage, 100),
      ],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(
      screen.getByText(
        new RegExp(
          `You’ve allocated all \\(100%\\) of your pay to your Swag Spend account for ${testOrg1.orgName}, ${testOrg2.orgName}.`
        )
      )
    );
  });

  it('should render a warning when three org ewallet Swag Spend account are set to 100%', async () => {
    await renderComp({
      allocations: [
        createAllocation(true, testOrg1, PaySplitType.Percentage, 100),
        createAllocation(true, testOrg2, PaySplitType.Percentage, 100),
        createAllocation(true, testOrg3, PaySplitType.Percentage, 100),
      ],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(
      screen.getByText(
        new RegExp(
          `You’ve allocated all \\(100%\\) of your pay to your Swag Spend account for ${testOrg1.orgName}, ${testOrg2.orgName}, ${testOrg3.orgName}.`
        )
      )
    );
  });

  it('should disable editing when ewallet allocation is set to 100%', async () => {
    await renderComp({
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage, 100)],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(screen.getByTestId(dataCardTestId(testOrg1.orgId))).toBeDisabled();
  });

  it('should enable editing when no allocations exist', async () => {
    await renderComp({
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage)],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    expect(screen.getByTestId(dataCardTestId(testOrg1.orgId))).toBeEnabled();
  });

  it('should disable confirm before any changes are made', async () => {
    await renderComp({
      allocations: [createAllocation(true, testOrg1, PaySplitType.Percentage, 50, 50)],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    const confirmBtn = screen.getByLabelText('Confirm');
    expect(confirmBtn).toBeDisabled();
  });

  it('should enable confirm after changes are made', async () => {
    await initChangedFlowStore();

    const confirmBtn = screen.getByLabelText('Confirm');
    expect(confirmBtn).toBeEnabled();
  });

  it('should navigate back', async () => {
    await renderComp({
      allocations: [
        createAllocation(false, testOrg1, PaySplitType.Percentage, 50, 50),
        createAllocation(false, testOrg2, PaySplitType.Percentage, 50, 50),
      ],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    const btn = screen.getByTestId('topbar-back-icon');
    fireEvent.press(btn);

    await waitFor(() => {
      expect(mockNavigateToTopTabs).toHaveBeenCalledWith('spend-tab');
    });
  });

  it('should navigate to allocation page', async () => {
    await renderComp({
      allocations: [
        createAllocation(false, testOrg1, PaySplitType.Percentage, 50, 50),
        createAllocation(false, testOrg2, PaySplitType.Percentage, 50, 50),
      ],
      eWallet: testEWallet,
      cardSetupDone: true,
    });

    const btn = screen.getByTestId(dataCardTestId(testOrg1.orgId));
    fireEvent.press(btn);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('PaySplitSelectAllocation');
    });
  });

  it('should navigate to outcome when confirm success', async () => {
    mockServer.use(
      mockSavePayAccountMutation((_, res, ctx) => {
        return res(ctx.data({ savePaySplit: { success: true } }));
      })
    );
    await initChangedFlowStore();

    const confirmBtn = screen.getByLabelText('Confirm');
    expect(confirmBtn).toBeEnabled();
    fireEvent.press(confirmBtn);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('PaySplitOutcome');
    });
  });

  it('should navigate to error when confirm failed', async () => {
    mockServer.use(
      mockSavePayAccountMutation((_, res, context) => {
        return res(context.status(1, 'switch account failed'));
      })
    );
    await initChangedFlowStore();

    const confirmBtn = screen.getByLabelText('Confirm');
    expect(confirmBtn).toBeEnabled();
    fireEvent.press(confirmBtn);

    const { result: payAcctMutation } = renderHook(() => useSavePayAccountMutation());

    await waitFor(() => {
      expect(payAcctMutation).toBeTruthy();
      expect(mockedNavigate).toHaveBeenCalledWith('PaySplitError');
    });
  });

  it("should show I'll this later button when in onboarding flow", () => {
    mockedUseRoute.mockReturnValue({
      params: { isOnboarding: true },
    } as RouteProp<ParamListBase, 'string'>);
    mockServer.use(
      mockGetCurrentCardDetailsQuery((_, res, context) =>
        res(context.data({ me: { wallet: { card: { details: aCardDetails({ id: '1' }) } } } }))
      )
    );
    screen = render(<PaySplitOrgListScreen />);
    expect(screen.getByLabelText("I'll do this later")).toBeTruthy();
  });

  it("should not show I'll this later button when not in onboarding flow", () => {
    mockedUseRoute.mockReturnValue({} as RouteProp<ParamListBase, 'string'>);
    screen = render(<PaySplitOrgListScreen />);
    expect(screen.queryByLabelText("I'll do this later")).toBeFalsy();
  });

  it("should continue onboarding flow when clicked on I'll do this later", () => {
    mockedUseRoute.mockReturnValue({
      params: { isOnboarding: true },
    } as RouteProp<ParamListBase, 'string'>);
    mockServer.use(
      mockGetCurrentCardDetailsQuery((_, res, context) =>
        res(context.data({ me: { wallet: { card: { details: aCardDetails({ id: '1' }) } } } }))
      )
    );
    screen = render(<PaySplitOrgListScreen />);
    fireEvent.press(screen.getByLabelText("I'll do this later"));
    expect(mockedNavigate).toHaveBeenCalledWith('CardSetupStack', {
      screen: 'PinSetupStack',
      params: {
        screen: 'ChoosePin',
        params: {
          header: 'Card set-up',
          title: 'Choose a secure 4 digit PIN for your card.',
          repeatedPinScreen: {
            header: 'Card set-up',
            title: 'Repeat your PIN.',
            onPinVerifiedSuccess: expect.anything(),
          },
        },
      },
    });
  });

  describe('OrgListScreen - Testing group C', () => {
    beforeEach(() => {
      const mockUsePermissionStore = jest.spyOn(usePermissionStore, 'usePermissionStore');
      const mockPermission: Partial<usePermissionStore.PermissionData> = {
        ebenPaySplitExpGroupC: { view: true },
      };
      mockUsePermissionStore.mockImplementation(selector =>
        selector({ permissions: mockPermission as usePermissionStore.PermissionData })
      );
    });

    it('should open percentage carousel screen when edit', async () => {
      await initChangedFlowStore();

      const org1 = await screen.findByTestId(dataCardTestId(testOrg1.orgId));
      fireEvent.press(org1);

      expect(mockedNavigate).toHaveBeenCalledWith('PaySplitPercentageAllocation');
    });
  });
});
