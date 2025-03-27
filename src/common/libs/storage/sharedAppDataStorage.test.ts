import { SharedAppDataStorage, SharedAppDataStorageKey } from './sharedAppDataStorage';

describe('SharedAppDataStorage', () => {
  it('should set and get item correctly', async () => {
    const mockData = {
      token: 'here',
    };

    await SharedAppDataStorage.setItem(SharedAppDataStorageKey.Example, mockData);

    expect(await SharedAppDataStorage.getItem(SharedAppDataStorageKey.Example)).toStrictEqual(mockData);
  });

  it('delete all should not clear it', async () => {
    const mockData = {
      token: 'here',
    };

    await SharedAppDataStorage.setItem(SharedAppDataStorageKey.Example, mockData);

    expect(await SharedAppDataStorage.getItem(SharedAppDataStorageKey.Example)).toStrictEqual(mockData);

    await SharedAppDataStorage.deleteAll();

    expect(await SharedAppDataStorage.getItem(SharedAppDataStorageKey.Example)).toStrictEqual(mockData);
  });
});
