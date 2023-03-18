import { AWS } from '@serverless/typescript';

export const CatalogProductsQueue: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SQS::Queue',
  Properties: {
    QueueName: 'catalog-products-queue',
  },
};
