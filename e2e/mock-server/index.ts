import type { Express, NextFunction, Request, Response } from 'express';
import express from 'express';
import type { Server } from 'http';
import { createProxyMiddleware, fixRequestBody } from 'http-proxy-middleware';
import { handlers, resetHandlers, setHandlers } from './handlers';

const port = process.env.E2E_MOCK_SERVER_PORT;
const MOCKED_DEPRECATED_BFF_ENDPOINT = '/mock-graphql';
const MOCKED_BFF_ENDPOINT = '/mock-new-graphql';

const app: Express = express();

// due to Node ignore case-sensitive headers
const correctHeadersMiddleware = (req: Request, _: Response, next: NextFunction) => {
  const ehSessionToken = req.headers['x-eh-session-token'];
  // restore case-sensitive header
  if (ehSessionToken) {
    req.headers['X-EH-Session-Token'] = ehSessionToken;
  }
  if (req.rawHeaders.includes('Authorization') && req.headers.authorization) {
    req.headers.Authorization = req.headers.authorization;
  }
  next();
};

const proxyMiddleware = createProxyMiddleware({
  changeOrigin: true,
  router: req =>
    req.url === MOCKED_BFF_ENDPOINT ? process.env.SWAG_PERSONAL_NEW_API_URL : process.env.SWAG_PERSONAL_API_URL,
  pathRewrite: {
    [`^/mock-graphql`]: '',
    [`^/mock-new-graphql`]: '',
  },
  on: {
    proxyReq: fixRequestBody,
  },
});

const mockDataMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { query } = req.body;
  let shouldIntercept = false;
  let data: unknown = {};

  Object.entries({
    ...handlers.default,
    ...handlers.dynamic,
  }).forEach(([key, mockedResponse]) => {
    if (query.includes(key)) {
      shouldIntercept = true;
      data = mockedResponse;
    }
  });

  if (shouldIntercept) {
    res.status(200).json(data);
  } else {
    next();
  }
};

app.use(correctHeadersMiddleware);

app.use(express.json());

app.use(mockDataMiddleware);

app.use(MOCKED_DEPRECATED_BFF_ENDPOINT, proxyMiddleware);
app.use(MOCKED_BFF_ENDPOINT, proxyMiddleware);

let server: Server | undefined;

const startServer = (defaultHandlers = {}) => {
  setHandlers(defaultHandlers, 'default');

  server = app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Mock server listening on port ${port}`); //
  });
};

const stopServer = () => {
  resetHandlers('default');
  resetHandlers('dynamic');

  if (server) {
    server.close(() => {
      // eslint-disable-next-line no-console
      console.log('Mock server stopped.');
    });
  }
};

export { startServer, stopServer, setHandlers, resetHandlers };
