import { useEffect, useState } from 'react';
import type { AppDataStorageKey } from '../libs/storage/appDataStorage';
import { AppDataStorage } from '../libs/storage/appDataStorage';

export const useAppStorageToggle = (key: AppDataStorageKey) => {
  const [isToggle, setToggle] = useState(false);
  const markToggle = () => {
    AppDataStorage.setItem<boolean>(key, true);
    setToggle(true);
  };
  const cleanToggle = () => {
    AppDataStorage.deleteItem(key);
    setToggle(false);
  };

  useEffect(() => {
    (async () => {
      setToggle(!!(await AppDataStorage.getItem<boolean>(key)));
    })();
  }, []);

  return { markToggle, cleanToggle, isToggle, setToggle };
};
