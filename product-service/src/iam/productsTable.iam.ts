import { AwsIamPolicyStatements } from '@serverless/typescript';

export const ProductsTableIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: [
    'dynamodb:Scan',
    'dynamodb:Query',
    'dynamodb:GetItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
  ],
  Resource: ['${self:custom.productsTable.arn}'],
};
