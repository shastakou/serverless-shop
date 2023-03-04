import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { ScanCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { formatJSONResponse } from '@libs/apiGateway';
import { ddbDocumentClient } from '@libs/ddbDocumentClient';
import { middyfy } from '@libs/lambda';
import { Product, Stock, ProductsList } from '../../types/api-types';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  void
> = async () => {
  const products = await getProductsFromDb();
  const productsList = await getProductsWithStockCount(products);

  return formatJSONResponse(productsList);
};

async function getProductsFromDb(): Promise<Product[]> {
  const data = await ddbDocumentClient.send(
    new ScanCommand({
      TableName: process.env.PRODUCTS_TABLE,
    })
  );
  return (data.Items ?? []) as Product[];
}

async function getStockFromDb(productId: string): Promise<Stock> {
  const data = await ddbDocumentClient.send(
    new GetCommand({
      TableName: process.env.STOCKS_TABLE,
      Key: { product_id: productId },
    })
  );
  return data.Item as Stock;
}

async function getProductsWithStockCount(
  products: Product[]
): Promise<ProductsList> {
  const productsInStock = [];
  for (const product of products) {
    try {
      const stock = await getStockFromDb(product.id);
      productsInStock.push({ ...product, count: stock?.count });
    } catch (error) {
      console.error(error);
      productsInStock.push(product);
    }
  }
  return productsInStock;
}

export const main = middyfy(getProductsList);
