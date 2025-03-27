import { Share as RNShare } from 'react-native';

export const Share = {
  share: (...params: Parameters<typeof RNShare.share>) => {
    return RNShare.share(...params);
  },
};
