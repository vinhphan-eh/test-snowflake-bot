import { create } from 'zustand';

type AuthState = 'logOut' | 'logIn' | 'switchAccount' | 'tokenChange' | undefined;

interface AppStoreData {
  currentAuthEffect: AuthState;
}

export const useAppStore = create<AppStoreData>()(() => ({
  currentAuthEffect: undefined,
}));

export const clearAuthState = () => {
  useAppStore.setState({
    currentAuthEffect: undefined,
  });
};
