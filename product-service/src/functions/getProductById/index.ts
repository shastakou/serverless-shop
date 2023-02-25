import { handlerPath } from '@libs/handlerResolver';
import { AWSFunctionConfig } from '../../types/type-utils';

export const getProductById: AWSFunctionConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'get',
        path: '/products/{id}',

        // swagger definitions
        responseData: {
          200: {
            description: 'Product',
            bodyType: 'Product',
          },
          404: {
            description: 'Not found',
            bodyType: 'string',
          },
        },
      },
    },
  ],
};
