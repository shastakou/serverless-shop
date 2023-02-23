import type { Handler } from 'aws-lambda';
import middy from '@middy/core';
import middyJsonBodyParser from '@middy/http-json-body-parser';
import httpHeaderNormalizer from '@middy/http-header-normalizer';
import cors from '@middy/http-cors';

export const middyfy = (handler: Handler<any>) => {
  return middy(handler)
    .use(httpHeaderNormalizer())
    .use(middyJsonBodyParser())
    .use(cors());
};
