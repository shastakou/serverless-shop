import { AwsIamPolicyStatements } from '@serverless/typescript';

export const ProductsBucketIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: ['s3:GetObject', 's3:PutObject', 's3:DeleteObject'],
  Resource: {
    'Fn::Join': ['', ['${self:custom.productsBucket.arn}', '/*']],
  },
};
