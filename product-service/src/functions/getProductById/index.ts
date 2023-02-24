import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handlerResolver';

export const getProductById: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products/{id}',
        cors: true,
      },
    },
  ],
};
