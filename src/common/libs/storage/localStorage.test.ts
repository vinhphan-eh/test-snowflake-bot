import { LocalStorage, LocalStorageKey } from './localStorage';

describe('LocalStorage', () => {
  it('functions correctly ', async () => {
    const mockData = {
      token: 'here',
    };

    await LocalStorage.setItem(LocalStorageKey.EbenExample, mockData);

    expect(await LocalStorage.getItem(LocalStorageKey.EbenExample)).toStrictEqual(mockData);

    await LocalStorage.deleteAll();

    expect(await LocalStorage.getItem(LocalStorageKey.EbenExample)).toBe(null);
  });
});
