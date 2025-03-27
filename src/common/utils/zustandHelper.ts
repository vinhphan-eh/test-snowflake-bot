import type { StateCreator } from 'zustand';
import type { PersistOptions } from 'zustand/middleware';

export type PersistFnType<T extends object> = (config: StateCreator<T>, options: PersistOptions<T>) => StateCreator<T>;
