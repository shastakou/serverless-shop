import { AWS } from '@serverless/typescript';

const CreateProductTopic: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SNS::Topic',
  Properties: {
    TopicName: 'create-product-topic',
  },
};

const CreateProductSubscription: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SNS::Subscription',
  Properties: {
    Endpoint: 'ivan_shastakou2@epam.com',
    Protocol: 'email',
    TopicArn: {
      Ref: 'CreateProductTopic',
    },
  },
};

export { CreateProductTopic, CreateProductSubscription };
