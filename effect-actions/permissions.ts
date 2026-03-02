import * as Location from 'expo-location';

export const getForegroundPermissionStatus = async () => {
  let { status } = await Location.getForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};

export const requestForegroundPermission = async () => {
  let { status } = await Location.requestForegroundPermissionsAsync();
  return status === Location.PermissionStatus.GRANTED;
};
