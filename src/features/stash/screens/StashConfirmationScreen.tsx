import React, { useEffect } from 'react';
import { Button } from '@hero-design/rn';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Page } from '../../../common/components/layout/page';
import { CustomStatusBar } from '../../../common/components/status-bar/CustomStatusBar';
import { queryClient } from '../../../common/libs/queryClient';
import { getMoneyV2FromFloatAmount } from '../../../common/utils/currency';
import { useCreateStashMutation, useGetStashesQuery } from '../../../new-graphql/generated';
import { StashCard } from '../components/StashCard';
import type { StashNavigationProp } from '../navigation/navigationTypes';
import { useCreateStashStore } from '../stores/useCreateStashStore';

export const StashConfirmationScreen = () => {
  const navigation = useNavigation<StashNavigationProp<'StashConfirmation'>>();
  const { image, name, targetAmount } = useCreateStashStore();
  const parsedTargetAmount = getMoneyV2FromFloatAmount(targetAmount);
  const { bottom: bottomInset } = useSafeAreaInsets();
  const {
    isError: isCreatingStashError,
    isLoading: isCreatingStash,
    mutateAsync: createStash,
  } = useCreateStashMutation();

  const handleConfirm = async () => {
    const stashInput = {
      name,
      ...(image ? { imageUrl: image } : null),
      ...(targetAmount ? { targetAmount: parsedTargetAmount } : null),
    };

    const createStashResult = await createStash({ stashInput });

    if (createStashResult?.createStash) {
      queryClient.invalidateQueries(useGetStashesQuery.getKey());
      navigation.reset({
        index: 0,
        routes: [{ name: 'StashSuccess' }],
      });
    } else {
      navigation.reset({
        index: 0,
        routes: [{ name: 'StashError' }],
      });
    }
  };

  useEffect(() => {
    if (isCreatingStashError) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'StashError' }],
      });
    }
  }, [navigation, isCreatingStashError]);

  return (
    <>
      <CustomStatusBar />
      <Page.TopBar onBack={navigation.goBack} title="Create a Stash" hideRight />
      <Page keyboardShouldPersistTaps="handled" style={{ paddingBottom: bottomInset }}>
        <Page.Title>Confirm your Stash details</Page.Title>
        <Page.Body>
          <StashCard
            stash={{
              name,
              targetAmount: parsedTargetAmount,
              balance: null,
              imageUrl: image,
            }}
            showBalance={false}
          />
        </Page.Body>
        <Page.Footer>
          <Button text="Confirm" accessibilityLabel="Confirm" onPress={handleConfirm} loading={isCreatingStash} />
        </Page.Footer>
      </Page>
    </>
  );
};
