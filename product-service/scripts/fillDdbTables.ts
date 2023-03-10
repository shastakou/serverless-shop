import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 as uuid } from 'uuid';

const ddbClient = new DynamoDBClient({ region: 'eu-west-1' });
const ddbDocumentClient = DynamoDBDocumentClient.from(ddbClient);

const createProduct = async (product) => {
  const params = {
    TableName: 'products-table',
    Item: product,
  };
  try {
    await ddbDocumentClient.send(new PutCommand(params));
    console.log('Success - product created', product);
  } catch (err) {
    console.log('Error', err.stack);
  }
};

const createStockOfProducts = async (stock) => {
  const params = {
    TableName: 'stocks-table',
    Item: stock,
  };
  try {
    await ddbDocumentClient.send(new PutCommand(params));
    console.log('Success - stock created', stock);
  } catch (err) {
    console.log('Error', err.stack);
  }
};

(function main() {
  const mockProducts = [
    {
      description: 'Short Product Description',
      id: uuid(),
      price: 24,
      title: 'ProductOne',
    },
    {
      description: 'Short Product Description7',
      id: uuid(),
      price: 15,
      title: 'ProductTitle',
    },
    {
      description: 'Short Product Description2',
      id: uuid(),
      price: 23,
      title: 'Product',
    },
    {
      description: 'Short Product Description4',
      id: uuid(),
      price: 15,
      title: 'ProductTest',
    },
    {
      description: 'Short Product Descriptio1',
      id: uuid(),
      price: 23,
      title: 'Product2',
    },
    {
      description: 'Short Product Description7',
      id: uuid(),
      price: 15,
      title: 'ProductName',
    },
  ];

  for (const product of mockProducts) {
    createProduct(product);
    createStockOfProducts({
      product_id: product.id,
      count: Math.round(Math.random() * 10),
    });
  }
})();
