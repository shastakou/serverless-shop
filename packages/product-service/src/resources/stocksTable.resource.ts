import { AWS } from '@serverless/typescript';

const StocksTable: AWS['resources']['Resources'][''] = {
  Type: 'AWS::DynamoDB::Table',
  DeletionPolicy: 'Delete',
  Properties: {
    TableName: 'stocks-table',
    AttributeDefinitions: [
      {
        AttributeName: 'product_id',
        AttributeType: 'S',
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: '1',
      WriteCapacityUnits: '1',
    },
    KeySchema: [{ AttributeName: 'product_id', KeyType: 'HASH' }],
  },
};

export { StocksTable };
