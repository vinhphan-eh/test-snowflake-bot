import { rest } from 'msw';
import { getEnvConfig } from '../../common/utils/env';
import { aToken } from '../mocks/token';

export const authApiHandlers = (baseUrl: string) => {
  return [
    rest.post(`${baseUrl}/auth/exchange`, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(aToken));
    }),

    rest.post(`${baseUrl}/auth/refresh`, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json(aToken));
    }),
    rest.get(`${getEnvConfig().MAIN_APP_ENDPOINT}/api/v3/users/swag_user_type/`, (_, res, ctx) => {
      return res(ctx.status(200), ctx.json({ user_type: 'current_employee' }));
    }),
  ];
};
