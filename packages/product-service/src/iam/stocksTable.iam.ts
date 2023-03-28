import { AwsIamPolicyStatements } from '@serverless/typescript';

const StocksTableIAM: AwsIamPolicyStatements[0] = {
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

export { StocksTableIAM };
