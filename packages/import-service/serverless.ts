import type { AWS } from '@serverless/typescript';

// functions
import { importProductsFile } from '@functions/importProductsFile';
import { importFileParser } from '@functions/importFileParser';

// resources
import { ProductsBucket } from '@resources/productsBucket.resource';

// iam policies
import { ProductsBucketIAM } from '@iam/productsBucket.iam';

const serverlessConfiguration: AWS = {
  service: 'import-service',
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
      BUCKET: '${self:custom.productsBucket.name}',
    },
    iam: {
      role: {
        statements: [ProductsBucketIAM],
      },
    },
  },
  functions: { importProductsFile, importFileParser },
  package: { individually: true },
  resources: {
    Resources: {
      ProductsBucket,
    },
  },
  custom: {
    region: '${opt:region, self:provider.region}',
    productsBucket: {
      name: { Ref: 'ProductsBucket' },
      arn: { 'Fn::GetAtt': ['ProductsBucket', 'Arn'] },
    },
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
      title: 'import service',
      apiType: 'http',
    },
  },
};

module.exports = serverlessConfiguration;
