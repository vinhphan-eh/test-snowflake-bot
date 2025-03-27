import { version } from '../../../package.json';

export const appVersion = {
  /**
   * Return personal app version from package.json
   */
  get CURRENT_PERSONAL_VERSION() {
    return version;
  },
};
