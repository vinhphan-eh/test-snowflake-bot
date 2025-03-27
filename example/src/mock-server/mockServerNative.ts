import { setupServer as setupServerNative } from 'msw/native';
import { handlers } from '../../../src/mock-server/handlers';
import { rest } from 'msw';
import Config from 'react-native-config';

const authHandlers = [
  rest.post(Config.EH_AUTH_API_URL, (_, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        data: {
          eh_account: {
            data: {
              attributes: {
                session_token:
                  '6421f1cab3962f0e6bc3802821d0fcbbe48a0bfc11ddecfc814b0380d5770ca0fd28887c86c0795ca0f044003825df17a01353b3756a35e8fb004be4e12ef4c0',
              },
            },
          },
        },
      }),
    );
  }),
];

/**
 * To run in react native env. Example: App in debug mode
 */
export const mockServerNative = setupServerNative(...handlers, ...authHandlers);
