import type { Enum } from '../../types/enum';

export abstract class Storage<KeyEnum extends Enum> {
  abstract getItem<T>(key: KeyEnum): Promise<T | null>;

  abstract setItem<T>(key: KeyEnum, data: T): Promise<void>;

  abstract deleteItem(key: KeyEnum): Promise<void>;

  abstract deleteAll(): Promise<void>;
}

export interface EbenToken {
  accessToken: string;
  refreshToken: string;
}
