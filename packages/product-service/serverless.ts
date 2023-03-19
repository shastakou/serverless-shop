import type { AWS } from '@serverless/typescript';

// functions
import { getProductById } from '@functions/getProductById';
import { getProductsList } from '@functions/getProductsList';
import { createProduct } from '@functions/createProduct';
import { catalogBatchProcess } from '@functions/catalogBatchProcess';

// resources
import { ProductsTable } from '@resources/productsTable.resource';
import { StocksTable } from '@resources/stocksTable.resource';
import { CatalogProductsQueue } from '@resources/catalogProductsQueue.resource';
import {
  CreateProductTopic,
  CreateProductSubscription,
} from '@resources/createProductTopic.resource';

// iam policies
import { ProductsTableIAM } from '@iam/productsTable.iam';
import { StocksTableIAM } from '@iam/stocksTable.iam';
import { CreateProductTopicIAM } from '@iam/createProductTopic.iam';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-1',
    deploymentMethod: 'direct',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    tracing: {
      apiGateway: true,
      lambda: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      REGION: '${self:custom.region}',
      PRODUCTS_TABLE: '${self:custom.productsTable.name}',
      STOCKS_TABLE: '${self:custom.stocksTable.name}',
      CREATE_PRODUCT_TOPIC: '${self:custom.createProductTopic.name}',
    },
    httpApi: {
      cors: true,
    },
    iam: {
      role: {
        statements: [ProductsTableIAM, StocksTableIAM, CreateProductTopicIAM],
      },
    },
  },
  functions: {
    getProductsList,
    getProductById,
    createProduct,
    catalogBatchProcess,
  },
  package: { individually: true },
  resources: {
    Resources: {
      ProductsTable,
      StocksTable,
      CatalogProductsQueue,
      CreateProductTopic,
      CreateProductSubscription,
    },
    Outputs: {
      CatalogProductsQueueUrl: {
        Value: '${self:custom.catalogProductsQueue.name}',
      },
      CatalogProductsQueueArn: {
        Value: '${self:custom.catalogProductsQueue.arn}',
      },
    },
  },
  custom: {
    region: '${opt:region, self:provider.region}',
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node18',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      title: 'products service',
      apiType: 'httpApi',
    },
    productsTable: {
      name: { Ref: 'ProductsTable' },
      arn: { 'Fn::GetAtt': ['ProductsTable', 'Arn'] },
    },
    stocksTable: {
      name: { Ref: 'StocksTable' },
      arn: { 'Fn::GetAtt': ['StocksTable', 'Arn'] },
    },
    catalogProductsQueue: {
      name: { Ref: 'CatalogProductsQueue' },
      arn: { 'Fn::GetAtt': ['CatalogProductsQueue', 'Arn'] },
    },
    createProductTopic: {
      name: { Ref: 'CreateProductTopic' },
    },
  },
};

module.exports = serverlessConfiguration;
