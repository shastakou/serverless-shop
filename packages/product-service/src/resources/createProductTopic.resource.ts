import { AWS } from '@serverless/typescript';

const CreateProductTopic: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SNS::Topic',
  Properties: {
    TopicName: 'create-product',
  },
};

const CreateProductSubscriptionByPrice: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SNS::Subscription',
  Properties: {
    Endpoint: 'ivan_shastakou2@epam.com',
    Protocol: 'email',
    TopicArn: {
      Ref: 'CreateProductTopic',
    },
    FilterPolicyScope: 'MessageBody',
    FilterPolicy: {
      price: [{ numeric: ['>', 0, '<=', 500] }],
    },
  },
};

const CreateProductSubscriptionByTitle: AWS['resources']['Resources'][''] = {
  Type: 'AWS::SNS::Subscription',
  Properties: {
    Endpoint: 'ivan.shostik@gmail.com',
    Protocol: 'email',
    TopicArn: {
      Ref: 'CreateProductTopic',
    },
    FilterPolicyScope: 'MessageBody',
    FilterPolicy: {
      title: [{ prefix: 'Samsung' }],
    },
  },
};

export {
  CreateProductTopic,
  CreateProductSubscriptionByPrice,
  CreateProductSubscriptionByTitle,
};
