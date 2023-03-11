import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handler-resolver';

export const importProductsFile: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: { required: true },
            },
          },
        },
      },
    },
  ],
};
