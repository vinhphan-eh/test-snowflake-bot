type Message = {
  message: string;
};

/**
 * Check if object has a message field
 * @param obj
 */
export const hasMessageField = (obj: unknown): obj is Message => {
  return !!obj && typeof obj === 'object' && 'message' in obj;
};
