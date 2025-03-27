import type { ImageSourcePropType } from 'react-native/types';
import { useEbfCountry } from '../../../../common/hooks/useEbfCountry';
import { useIsWorkzone } from '../../../../common/hooks/useIsWorkzone';
import type { GroupDetail } from '../../../../new-graphql/generated';
import { useGetGroupsQuery } from '../../../../new-graphql/generated';
import { GROUP_MEMBER_AVATARS } from '../utils/getGroupMemberAvatars';

export type TCustomGroupDetail = GroupDetail & {
  memberAvatars: ImageSourcePropType[];
};

const avatarsPerGroup = 4;
const numAvatars = GROUP_MEMBER_AVATARS.length;
const maxStartIndex = numAvatars - avatarsPerGroup - 1;

export const getMemberAvatarsByGroup = (index: number, numGroups: number) => {
  const gap = Math.ceil((maxStartIndex + 1) / numGroups);

  let startIndex;
  // Make member avatars of two first groups totally different
  if (index === 1) {
    startIndex = maxStartIndex;
  } else if (index === numGroups - 1) {
    startIndex = gap;
  } else {
    startIndex = index * gap;
  }

  return GROUP_MEMBER_AVATARS.slice(startIndex, startIndex + avatarsPerGroup);
};

export const useGroupsData = () => {
  const isWorkzone = useIsWorkzone();
  const { ehCountryCode, workzoneCountryCode } = useEbfCountry();
  const finalCountry = isWorkzone ? workzoneCountryCode : ehCountryCode;

  const { data, isLoading, isLoadingError } = useGetGroupsQuery({ country: finalCountry ?? '' });
  const groups = (data?.group?.groups ?? []) as GroupDetail[];

  const groupsWithAvatars = groups.map((group, index) => ({
    ...group,
    memberAvatars: getMemberAvatarsByGroup(index, groups.length) || [],
  })) as TCustomGroupDetail[];

  return {
    isLoading,
    isLoadingError,
    groups: groupsWithAvatars,
  };
};
