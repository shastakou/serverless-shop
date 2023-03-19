import { AwsIamPolicyStatements } from '@serverless/typescript';

export const CreateProductTopicIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: ['sns:Publish'],
  Resource: ['${self:custom.createProductTopic.name}'],
};
