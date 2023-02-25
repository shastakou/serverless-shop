import { handlerPath } from '@libs/handlerResolver';
import { AWSFunctionConfig } from '../../types/type-utils';

export const getProductsList: AWSFunctionConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        cors: true,

        // swagger definitions
        responseData: {
          200: {
            description: 'List of products',
            bodyType: 'ProductsList',
          },
        },
      },
    },
  ],
  logRetentionInDays: 14,
};
