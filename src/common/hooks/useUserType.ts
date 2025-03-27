import { useSessionStore } from '../stores/useSessionStore';

export const enum UserType {
  Candidate = 'Candidate',
  Employee = 'Employee',
  Workzone = 'Workzone',
}

export const useUserType = (): UserType => {
  const currentUser = useSessionStore(state => state.currentUser);

  if (currentUser?.loginProvider === 'kp') {
    return UserType.Workzone;
  }

  return UserType.Employee;
};
