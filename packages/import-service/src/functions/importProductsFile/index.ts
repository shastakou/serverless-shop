import { handlerPath } from '@libs/utils/handlerResolver';
import { AWSFunctionConfig } from '../../types/type-utils';

export const importProductsFile: AWSFunctionConfig = {
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