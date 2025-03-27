import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import dotenv from 'dotenv';

dotenv.config({
  path: './e2e/.env'
});

jest.retryTimes(1);

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Australia/Sydney');

beforeAll(async () => {
  // launch app
  await device.launchApp({
    permissions: {
      notifications: 'NO',
      userTracking: 'NO',
      location: 'always',
    },
    launchArgs: {
      DTXEnableVerboseSyncSystem: 'YES',
      DTXEnableVerboseSyncResources: 'YES',
    },
  });
  await device.setURLBlacklist(['.*api.mixpanel.com.*']);
  await device.setURLBlacklist(['.*swag-personal-bff.staging-ehfintech.*']);
  await device.setURLBlacklist(['.*ebf-bff-mobile.staging-ehfintech.*']);
  await device.setBiometricEnrollment(true);
});
