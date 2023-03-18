import { AwsIamPolicyStatements } from '@serverless/typescript';

export const CatalogProductsQueueIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: ['sqs:SendMessage'],
  Resource: ['${param:catalogProductsQueueArn}'],
};
