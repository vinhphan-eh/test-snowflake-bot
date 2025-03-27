import { mockGetGooglePlaceApiKeyQuery } from '../generated';

export const apiKeyHandlers = [
  mockGetGooglePlaceApiKeyQuery((_, res, ctx) => {
    return res(
      ctx.delay(100),
      ctx.data({
        getGooglePlaceApiKey: {
          name: 'GOOGLE_MAPS_API_KEY',
          // temp key
          value: 'AIzaSyAkQ4AC8F9FLnzS2uBDwONVaejwk1wDwNA',
        },
      })
    );
  }),
];
