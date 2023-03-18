import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/handlerResolver';

export const catalogBatchProcess: AWS['functions'][''] = {
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
