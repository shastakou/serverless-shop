import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handlerResolver';

export const getProductsList: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,
      },
    },
  ],
  logRetentionInDays: 14,
};
