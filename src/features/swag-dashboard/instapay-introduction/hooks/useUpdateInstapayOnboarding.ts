import { queryClient } from '../../../../common/libs/queryClient';
import { useToast } from '../../../../common/shared-hooks/useToast';
import { useSessionStore } from '../../../../common/stores/useSessionStore';
import type { InstaPayOption, ShowInstapayIntroductionQuery } from '../../../../new-graphql/generated';
import {
  useAddPreferInstapayOptionMutation,
  useShowInstapayIntroductionQuery,
} from '../../../../new-graphql/generated';
import { useIntl } from '../../../../providers/LocalisationProvider/hooks/useIntl';

export const useUpdateInstapayOnboarding = () => {
  const { mutateAsync: saveInstapayOption } = useAddPreferInstapayOptionMutation();
  const Toast = useToast();
  const Intl = useIntl();

  const currentOrgUuid = useSessionStore(state => state.currentOrgUuid);

  const updateInstapayOption = async ({
    option,
    successCallback,
  }: {
    option: InstaPayOption;
    successCallback?: () => void;
  }) => {
    if (currentOrgUuid) {
      try {
        await saveInstapayOption({
          input: {
            orgId: currentOrgUuid,
            instaPayOption: option,
          },
        });
        successCallback?.();

        queryClient.setQueryData(
          useShowInstapayIntroductionQuery.getKey({ id: currentOrgUuid }),
          (old: ShowInstapayIntroductionQuery | undefined): ShowInstapayIntroductionQuery => ({
            ...old,
            me: {
              org: {
                instapay: {
                  showInstapayIntroductionV2: false,
                },
              },
            },
          })
        );
      } catch {
        Toast.show({
          content: Intl.formatMessage({ id: 'common.something.wrong.went.wrong.try.again' }),
        });
      }
    }
  };

  return {
    updateInstapayOption,
  };
};
