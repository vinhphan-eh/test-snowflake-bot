import { act } from '@testing-library/react-native';
import type * as zustand from 'zustand';

const { create: actualCreate } = jest.requireActual<typeof zustand>('zustand');

// a variable to hold reset functions for all stores declared in the app
const storeResetFns = new Set();

const createUncurried = <T>(stateCreator: zustand.StateCreator<T>) => {
  const store = actualCreate(stateCreator);
  const initialState = store.getState();
  storeResetFns.add(() => {
    store.setState(initialState, true);
  });
  return store;
};

// when creating a store, we get its initial state, create a reset function and add it in the set
const create = (<T>(stateCreator: zustand.StateCreator<T>) => {
  // to support curried version of create
  return typeof stateCreator === 'function' ? createUncurried(stateCreator) : createUncurried;
}) as typeof zustand.create;

// Reset all stores after each test run
afterEach(() => {
  // @ts-ignore
  act(() => storeResetFns.forEach(resetFn => resetFn()));
});

export { create };
