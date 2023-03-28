import { AwsIamPolicyStatements } from '@serverless/typescript';

const CatalogProductsQueueIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: ['sqs:SendMessage'],
  Resource: ['${param:catalogProductsQueueArn}'],
};

export { CatalogProductsQueueIAM };
