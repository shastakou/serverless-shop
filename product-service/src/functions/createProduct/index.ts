import { handlerPath } from '@libs/handlerResolver';
import { AWSFunctionConfig } from '../../types/type-utils';

export const createProduct: AWSFunctionConfig = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      httpApi: {
        method: 'post',
        path: '/products',

        // swagger definitions
        bodyType: 'CreateProductDto',
        responseData: {
          201: {
            description: 'Product created',
            bodyType: 'ProductDto',
          },
          400: {
            description: 'Bad request',
            bodyType: 'string',
          },
        },
      },
    },
  ],
};
