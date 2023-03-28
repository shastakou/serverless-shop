import { AwsIamPolicyStatements } from '@serverless/typescript';

const CreateProductTopicIAM: AwsIamPolicyStatements[0] = {
  Effect: 'Allow',
  Action: ['sns:Publish'],
  Resource: ['${self:custom.createProductTopic.name}'],
};

export { CreateProductTopicIAM };
