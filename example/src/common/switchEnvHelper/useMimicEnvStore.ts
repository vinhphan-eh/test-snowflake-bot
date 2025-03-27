import { create } from 'zustand';
import Config from 'react-native-config';

type EnvStore = {
  config: typeof Config | undefined;
};

/**
 * mimic store for env at fake login screen
 */
export const useMimicEnvStore = create<EnvStore>()(() => ({
  config: Config,
}));
