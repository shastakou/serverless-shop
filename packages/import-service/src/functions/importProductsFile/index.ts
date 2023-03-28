import { handlerPath } from '@libs/utils/handlerResolver';
import { FunctionWithSwagger } from '../../types/type-utils';

const importProductsFile: FunctionWithSwagger = {
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
        authorizer: {
          arn: '${self:custom.authorizer}',
          type: 'TOKEN',
        },

        // swagger definitions
        queryStringParameters: {
          name: {
            required: true,
            type: 'string',
          },
        },
        responseData: {
          200: {
            description: 'Signed url created',
            bodyType: 'ImportProductsDto',
          },
          400: {
            description: 'Bad request',
          },
        },
      },
    },
  ],
};

export { importProductsFile };
