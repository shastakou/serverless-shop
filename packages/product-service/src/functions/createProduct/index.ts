import { handlerPath } from '@libs/utils/handlerResolver';
import { FunctionWithSwagger } from '../../types/type-utils';

const createProduct: FunctionWithSwagger = {
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
          },
        },
      },
    },
  ],
};

export { createProduct };
