// work around https://github.com/microsoft/TypeScript/issues/16069
export const isTruthy = <T>(v: T): v is NonNullable<T> => {
  return !!v;
};
