import { type EhProfile, mockProfileQuery } from '../generated';
import uuid from 'react-native-uuid';

export const profileHandlers = [
  mockProfileQuery((_, res, ctx) => {
    const result: EhProfile = {
      avatarUrl: 'http://localhost/me.jpg',
      email: 'a@a.com',
      firstName: 'a',
      lastName: 'b',
      userId: '12345',
      userUuid: uuid.v4().toString(),
      countryCode: 'AUS',
    };
    return res(ctx.delay(100), ctx.data({ profile: result }));
  }),
];
