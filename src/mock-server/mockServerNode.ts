import { setupServer as setupServerNode } from 'msw/node';
import { handlers } from './handlers';

/**
 * To run in node env. Example Jest
 */
export const mockServerNode = setupServerNode(...handlers);
