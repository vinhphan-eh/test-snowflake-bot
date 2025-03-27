import React from 'react';
import { View } from 'react-native';
import { render } from '@testing-library/react-native';
import { useSSOStore, type SSOStoreData } from '../common/auth/store/useSSOStore';
import type { SuperAppTokenUtilsType } from '../common/auth/store/useSuperAppTokenStore';
import { useSuperAppTokenStore } from '../common/auth/store/useSuperAppTokenStore';
import { useBrazeStore } from '../common/braze/stores/useBrazeStore';
import { usePasscodeStore } from '../common/screens/passcode';
import { useAppSwitcherStore } from '../common/stores/useAppSwitcherStore';
import { useMiniAppSwitcherStore } from '../common/stores/useMiniAppSwitcherStore';
import type { CurrentSessionUser } from '../common/stores/useSessionStore';
import { useSessionStore } from '../common/stores/useSessionStore';
import { RootProvider } from '../RootProvider';

const defaultProps = {
  mixpanelTracking: {
    eventTracking: jest.fn(),
    screenTracking: jest.fn(),
  },
};

describe('RootProvider', () => {
  it('should render without any error', () => {
    render(
      <RootProvider {...defaultProps}>
        <View />
      </RootProvider>
    );
  });

  it('save appSwitcherVisibility when this prop change', () => {
    jest.spyOn(useAppSwitcherStore, 'setState');
    render(
      <RootProvider {...defaultProps} appSwitcherVisibility>
        <View />
      </RootProvider>
    );

    expect(useAppSwitcherStore.setState).toBeCalledWith({ isVisible: true });

    render(
      <RootProvider {...defaultProps} appSwitcherVisibility={false}>
        <View />
      </RootProvider>
    );

    expect(useAppSwitcherStore.setState).toBeCalledWith({ isVisible: false });
  });

  it('save setAppSwitcherVisibility when this prop change', () => {
    jest.spyOn(useAppSwitcherStore, 'setState');
    const mockFunction = () => {};
    render(
      <RootProvider {...defaultProps} setAppSwitcherVisibility={mockFunction}>
        <View />
      </RootProvider>
    );

    expect(useAppSwitcherStore.setState).toBeCalledWith({ toggleVisibility: mockFunction });
  });

  it('save superAppLogout when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockFunction = () => {};
    render(
      <RootProvider {...defaultProps} superAppLogout={mockFunction}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({ superAppLogout: mockFunction });
  });

  it('save currentUser when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockUser: CurrentSessionUser = {
      userID: '123',
      loginProvider: 'eh',
    };
    render(
      <RootProvider {...defaultProps} currentUser={mockUser}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({ currentUser: mockUser });
  });

  it('save passcodeValidate when this prop change', () => {
    jest.spyOn(usePasscodeStore, 'setState');
    const mockFunction = () => {};
    render(
      <RootProvider {...defaultProps} passcodeValidate={mockFunction}>
        <View />
      </RootProvider>
    );

    expect(usePasscodeStore.setState).toBeCalledWith({ passcodeValidate: mockFunction });
  });

  it('save mixpanelTracking when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockMixpanelTracking = {
      eventTracking: () => {},
      screenTracking: () => {},
    };

    const { rerender } = render(
      <RootProvider {...defaultProps}>
        <View />
      </RootProvider>
    );

    rerender(
      <RootProvider mixpanelTracking={mockMixpanelTracking}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({ mixpanelTracking: mockMixpanelTracking });
  });

  it('save swagUserType when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    render(
      <RootProvider {...defaultProps} swagUserType="current_employee">
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({ swagUserType: 'current_employee' });
  });

  it('save setPillar when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const setPillarFunc = () => {};
    render(
      <RootProvider {...defaultProps} setPillar={setPillarFunc}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({
      setPillar: setPillarFunc,
    });
  });

  it('save handleFeedbackPrompt when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockFn = () => {};
    render(
      <RootProvider {...defaultProps} handleFeedbackPrompt={mockFn}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({
      handleFeedbackPrompt: mockFn,
    });
  });

  it('save handleInternalRatingPrompt when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockFn = () => {};
    render(
      <RootProvider {...defaultProps} handleInternalRatingPrompt={mockFn}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({
      handleInternalRatingPrompt: mockFn,
    });
  });

  it('save kpMetadatalite when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockData = [
      {
        employeeId: null,
        businessId: 327541,
        brandId: 2065,
        partnerId: null,
      },
    ];
    render(
      <RootProvider {...defaultProps} kpMetadatalite={mockData}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({
      kpMetadatalite: mockData,
    });
  });

  it('save superAppTokenUtils when this prop change', () => {
    jest.spyOn(useSuperAppTokenStore, 'setState');
    const mockData: SuperAppTokenUtilsType = {
      isSuperAppTokenExpired: () => false,
      freshSuperAppToken: '3212321',
      fetchValidSuperAppToken: () => Promise.resolve({ token: 'dasds', loginProvider: 'eh' }),
    };
    render(
      <RootProvider {...defaultProps} superAppTokenUtils={mockData}>
        <View />
      </RootProvider>
    );

    expect(useSuperAppTokenStore.setState).toBeCalledWith(mockData);
  });

  it('save isLoadingKpMetadataLite when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockData = true;
    render(
      <RootProvider {...defaultProps} isLoadingKpMetadataLite={mockData}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toBeCalledWith({
      isLoadingKpMetadataLite: true,
    });
  });

  it('save currentOrgUuid correctly when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockData = 'orgUuid';
    render(
      <RootProvider {...defaultProps} currentOrgUuid={mockData}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toHaveBeenCalledWith({
      currentOrgUuid: 'orgUuid',
    });
  });

  it('save currentPillar correctly when this prop change', () => {
    jest.spyOn(useMiniAppSwitcherStore, 'setState');
    const mockData = 'BenefitsApp';
    render(
      <RootProvider {...defaultProps} currentPillar={mockData}>
        <View />
      </RootProvider>
    );

    expect(useMiniAppSwitcherStore.setState).toHaveBeenCalledWith({
      currentPillar: mockData,
    });
  });

  it('save sessionStatus when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockData = 'ready';
    render(
      <RootProvider {...defaultProps} sessionStatus={mockData}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toHaveBeenCalledWith({ sessionStatus: mockData });
  });

  it('save memberId when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockId = '123';
    render(
      <RootProvider {...defaultProps} memberId={mockId}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toHaveBeenCalledWith({ memberId: '123' });
  });

  it('save ssoUtils when this prop change', () => {
    jest.spyOn(useSSOStore, 'setState');
    const mockUtils: SSOStoreData = {
      status: 'completed',
      handleSSOFlow: () => {},
      checkStatus: () => Promise.resolve('completed'),
    };
    render(
      <RootProvider {...defaultProps} ssoUtils={mockUtils}>
        <View />
      </RootProvider>
    );

    expect(useSSOStore.setState).toHaveBeenCalledWith(mockUtils);
  });

  it('save brazeManager when this prop change', () => {
    jest.spyOn(useBrazeStore, 'setState');
    const mockBrazeManager = {
      contentCards: [],
      requestContentCardsRefresh: () => Promise.resolve([]),
    };
    render(
      <RootProvider {...defaultProps} brazeManager={mockBrazeManager}>
        <View />
      </RootProvider>
    );

    expect(useBrazeStore.setState).toHaveBeenCalledWith({
      cards: mockBrazeManager.contentCards,
      requestContentCardsRefresh: mockBrazeManager.requestContentCardsRefresh,
    });
  });

  it('save swagRebrandEnabled when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockSwagRebrandEnabled = true;
    render(
      <RootProvider {...defaultProps} swagRebrandEnabled={mockSwagRebrandEnabled}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toHaveBeenCalledWith({
      swagRebrandEnabled: mockSwagRebrandEnabled,
    });
  });

  it('save getEnvironmentConfig when this prop change', () => {
    jest.spyOn(useSessionStore, 'setState');
    const mockFn = () => {};
    render(
      <RootProvider {...defaultProps} getEnvironmentConfig={mockFn as never}>
        <View />
      </RootProvider>
    );

    expect(useSessionStore.setState).toHaveBeenCalledWith({
      getEnvConfig: mockFn,
    });
  });
});
