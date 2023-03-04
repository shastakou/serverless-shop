import { AwsIamPolicyStatements } from '@serverless/typescript';

export const StocksTableIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: [
    'dynamodb:Scan',
    'dynamodb:Query',
    'dynamodb:GetItem',
    'dynamodb:PutItem',
    'dynamodb:UpdateItem',
  ],
  Resource: ['${self:custom.stocksTable.arn}'],
};
