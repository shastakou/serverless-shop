import type { Handler } from 'aws-lambda';
import middy from '@middy/core';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpErrorHandler from 'middy-middleware-json-error-handler';
import cors from '@middy/http-cors';

const middyfy = (handler: Handler<any>) => {
  return middy(handler)
    .use(httpHeaderNormalizer())
    .use(httpEventNormalizer())
    .use(cors())
    .use(httpErrorHandler());
};

export { middyfy };
