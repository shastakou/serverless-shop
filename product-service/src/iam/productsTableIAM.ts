import { AwsIamPolicyStatements } from '@serverless/typescript';

export const ProductsTableIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: [
    'dynamodb:Query',
    'dynamodb:Scan',
    'dynamodb:GetItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
  ],
  Resource: ['${self:custom.productsTable.arn}'],
};
