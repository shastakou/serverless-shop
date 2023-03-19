import { handlerPath } from '@libs/utils/handlerResolver';
import { FunctionWithSwagger } from '../../types/type-utils';

const getProductById: FunctionWithSwagger = {
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
            bodyType: 'ProductDto',
          },
          404: {
            description: 'Not found',
          },
        },
      },
    },
  ],
};

export { getProductById };
