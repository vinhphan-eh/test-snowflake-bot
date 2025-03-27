export const startEnrollment = jest.fn();
export const updateFCMToken = jest.fn();
export const setUserToken = jest.fn();
export const initializeUXComponents = jest.fn();
export const initializePSA = jest.fn();
export const checkDeviceIsEnrolled = jest.fn(() => Promise.resolve(true));
export const checkIsReadyForEnrollment = jest.fn(() => Promise.resolve(true));
