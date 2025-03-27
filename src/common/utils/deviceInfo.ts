import DeviceInfo from 'react-native-device-info';

export const getSystemVersion = () => {
  return DeviceInfo.getSystemVersion();
};

export const getBrand = () => {
  return DeviceInfo.getBrand();
};

export const getModel = () => {
  return DeviceInfo.getModel();
};

export const getUniqueId = () => {
  return DeviceInfo.getUniqueId();
};
