import { useEffect, useState } from 'react';
import { AppDataStorage, AppDataStorageKey } from '../../../common/libs/storage/appDataStorage';
import { ContributionTab } from '../salary-sacrifice/constants';
import { useSubmitSuperContributionStore } from '../store/useSubmitSuperContributionStore';

const markToggleSeenPendingTab = (isSeen: boolean) => {
  return AppDataStorage.setItem<boolean>(AppDataStorageKey.ContributionPendingTabSeen, isSeen);
};

const hasUserSeenPendingTab = async () => {
  return AppDataStorage.getItem<boolean>(AppDataStorageKey.ContributionPendingTabSeen);
};

export const useContributionTabs = () => {
  const [selectedTabKey, setSelectedTabKey] = useState(ContributionTab.active);
  const [seenPendingTab, setSeenPendingTab] = useState(true);

  const { isCreatedOrUpdatedContribution, setCreatedOrUpdatedContribution } = useSubmitSuperContributionStore();

  // Effect check if Pending tab (in Manage Contributions screen) has been seen or not
  useEffect(() => {
    const checkSeenPendingTab = async () => {
      const userSeenPendingTab = await hasUserSeenPendingTab();
      setSeenPendingTab(!!userSeenPendingTab);
    };

    checkSeenPendingTab();
  }, [selectedTabKey, isCreatedOrUpdatedContribution]);

  const onPressTab = (newTabKey: string) => {
    // When user tap on pending tab, mark it "seen"
    if (newTabKey === ContributionTab.pending) {
      markToggleSeenPendingTab(true);
      setCreatedOrUpdatedContribution(false);
    }
    setSelectedTabKey(newTabKey);
  };

  // Show pending tab badge status when either:
  // - New contribution created or status changed (ex: stop contribution)
  // - User has seen pending tab
  const isShowPendingBadge = isCreatedOrUpdatedContribution || !seenPendingTab;

  return { selectedTabKey, onPressTab, isShowPendingBadge, markToggleSeenPendingTab };
};
