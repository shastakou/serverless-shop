import { handlerPath } from '@libs/handlerResolver';
import { AWSFunctionConfig } from '../../types/type-utils';

export const getProductsList: AWSFunctionConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products',

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
