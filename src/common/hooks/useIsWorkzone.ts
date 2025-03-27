import { UserType, useUserType } from './useUserType';

export const useIsWorkzone = () => {
  const userType = useUserType();
  return userType === UserType.Workzone;
};
