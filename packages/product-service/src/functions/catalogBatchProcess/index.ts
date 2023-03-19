import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/utils/handlerResolver';

const catalogBatchProcess: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      sqs: {
        arn: '${self:custom.catalogProductsQueue.arn}',
        batchSize: 5,
        maximumConcurrency: 250,
      },
    },
  ],
};

export { catalogBatchProcess };
