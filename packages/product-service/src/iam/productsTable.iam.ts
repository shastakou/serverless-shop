import { AwsIamPolicyStatements } from '@serverless/typescript';

const ProductsTableIAM: AwsIamPolicyStatements[0] = {
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

export { ProductsTableIAM };
