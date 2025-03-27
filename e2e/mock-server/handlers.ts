interface HandlerSet {
  [key: string]: unknown;
}

interface HandlerMap {
  default: HandlerSet;
  dynamic: HandlerSet;
}

const handlers: HandlerMap = {
  // default handlers for mock server
  default: {},
  // handlers to be set on the fly (during test case)
  dynamic: {},
};

const setHandlers = (handlerSet: HandlerSet, setName: keyof HandlerMap = 'dynamic') => {
  handlers[setName] = handlerSet;
};

const resetHandlers = (setName: keyof HandlerMap = 'dynamic') => {
  handlers[setName] = {};
};

export { handlers, setHandlers, resetHandlers };
