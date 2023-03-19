import { AWS } from '@serverless/typescript';

const CatalogProductsQueue: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SQS::Queue',
  Properties: {
    QueueName: 'catalog-products-queue',
  },
};

export { CatalogProductsQueue };
