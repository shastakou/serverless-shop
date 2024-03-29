import type { AWS } from '@serverless/typescript';

// functions
import { basicAuthorizer } from '@functions/basicAuthorizer';

const serverlessConfiguration: AWS = {
  service: 'authorization-service',
  frameworkVersion: '3',
  useDotenv: true,
  plugins: ['serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs18.x',
    region: 'eu-west-1',
    stage: 'dev',
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
      SHASTAKOU: '${env:shastakou}',
    },
  },
  functions: { basicAuthorizer },
  package: { individually: true },
  resources: {
    Outputs: {
      Authorizer: {
        Value: '${self:custom.authorizer}',
      },
    },
  },
  custom: {
    region: '${opt:region, self:provider.region}',
    authorizer:
      'function:${self:service}-${self:provider.stage}-basicAuthorizer',
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
  },
};

module.exports = serverlessConfiguration;
