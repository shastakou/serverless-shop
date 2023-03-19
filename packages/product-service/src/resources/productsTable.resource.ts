import { AWS } from '@serverless/typescript';

const ProductsTable: AWS['resources']['Resources'][''] = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: 'products-table',
    AttributeDefinitions: [
      {
        AttributeName: 'id',
        AttributeType: 'S',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: '1',
      WriteCapacityUnits: '1',
    },
    KeySchema: [{ AttributeName: 'id', KeyType: 'HASH' }],
  },
};

export { ProductsTable };
