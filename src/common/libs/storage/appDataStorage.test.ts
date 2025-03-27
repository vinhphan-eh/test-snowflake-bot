import { AppDataStorage, AppDataStorageKey } from './appDataStorage';

describe('AppDataStorage', () => {
  it('should isolate data of each user', async () => {
    const storeUserData = (userId: string, key: AppDataStorageKey, data: unknown) => {
      AppDataStorage.userId = userId;
      return AppDataStorage.setItem(key, data);
    };
    const getUserData = (userId: string, key: AppDataStorageKey) => {
      AppDataStorage.userId = userId;
      return AppDataStorage.getItem(key);
    };

    // Store user data
    const mockDataUserA = {
      data: 'user A',
    };
    await storeUserData('userA', AppDataStorageKey.Example, mockDataUserA);

    const mockDataUserB = {
      data: 'user B',
    };
    await storeUserData('userB', AppDataStorageKey.Example, mockDataUserB);

    const savedDataUserA = await getUserData('userA', AppDataStorageKey.Example);
    const savedDataUserB = await getUserData('userB', AppDataStorageKey.Example);

    expect(savedDataUserA).toStrictEqual(mockDataUserA);
    expect(savedDataUserB).not.toStrictEqual(mockDataUserA);
    expect(savedDataUserB).toStrictEqual(mockDataUserB);
  });

  it('should get saved data', async () => {
    const mockData = {
      data: 'here',
    };

    await AppDataStorage.setItem(AppDataStorageKey.Example, mockData);

    expect(await AppDataStorage.getItem(AppDataStorageKey.Example)).toStrictEqual(mockData);
  });

  it('should not clear data with deleteAll', async () => {
    const mockData = {
      data: 'here',
    };

    await AppDataStorage.setItem(AppDataStorageKey.Example, mockData);

    await AppDataStorage.deleteAll();

    expect(await AppDataStorage.getItem(AppDataStorageKey.Example)).toStrictEqual(mockData);
  });
});
