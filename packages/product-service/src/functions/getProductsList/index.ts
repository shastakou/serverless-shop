import { handlerPath } from '@libs/utils/handlerResolver';
import { FunctionWithSwagger } from '../../types/type-utils';

const getProductsList: FunctionWithSwagger = {
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
            bodyType: 'ProductsDto',
          },
        },
      },
    },
  ],
  logRetentionInDays: 14,
};

export { getProductsList };
