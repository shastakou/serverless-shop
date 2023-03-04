import type { AWS } from '@serverless/typescript';

// functions
import { getProductById } from '@functions/getProductById';
import { getProductsList } from '@functions/getProductsList';

// resources
import { ProductsTable } from '@resources/productsTable';
import { StocksTable } from '@resources/stocksTable';

// iam policies
import { ProductsTableIAM } from '@iam/productsTableIAM';
import { StocksTableIAM } from '@iam/stocksTableIAM';

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
    },
    httpApi: {
      cors: true,
    },
    iam: {
      role: {
        statements: [ProductsTableIAM, StocksTableIAM],
      },
    },
  },
  functions: { getProductsList, getProductById },
  package: { individually: true },
  resources: {
    Resources: {
      ProductsTable,
      StocksTable,
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
      name: { Ref: ['ProductsTable'] },
      arn: { 'Fn::GetAtt': ['ProductsTable', 'Arn'] },
    },
    stocksTable: {
      name: { Ref: ['StocksTable'] },
      arn: { 'Fn::GetAtt': ['StocksTable', 'Arn'] },
    },
  },
};

module.exports = serverlessConfiguration;
