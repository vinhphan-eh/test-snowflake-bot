import { Alert } from 'react-native';

export const Share = {
  share: (data: { message: string }) => {
    Alert.alert('Share', data.message);
    return data;
  },
};
