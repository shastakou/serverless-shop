import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  TransactWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { ProductDto, StockDto } from '../../types/api-types';

const PRODUCTS_TABLE = process.env.PRODUCTS_TABLE;
const STOCKS_TABLE = process.env.STOCKS_TABLE;

const ddbClient = new DynamoDBClient({ region: process.env.REGION });
const ddbDocumentClient = DynamoDBDocumentClient.from(ddbClient);

export async function getProductsWithStockCount(): Promise<ProductDto[]> {
  const productsData = await ddbDocumentClient.send(
    new ScanCommand({
      TableName: PRODUCTS_TABLE,
    })
  );
  const stocksData = await ddbDocumentClient.send(
    new ScanCommand({
      TableName: STOCKS_TABLE,
    })
  );
  const products = (productsData.Items ?? []) as ProductDto[];
  const stocks = (stocksData.Items ?? []) as StockDto[];

  for (const product of products) {
    product.count =
      stocks.find((stock) => stock.product_id === product.id)?.count ?? 0;
  }

  return products;
}

export async function getProduct(id: string): Promise<ProductDto> {
  const data = await ddbDocumentClient.send(
    new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: { id },
    })
  );
  return data.Item as ProductDto;
}

export async function putProduct(product: ProductDto): Promise<ProductDto> {
  await ddbDocumentClient.send(
    new PutCommand({
      TableName: PRODUCTS_TABLE,
      Item: product,
    })
  );
  return product;
}

export async function transactPutProduct(
  product: ProductDto,
  stock: StockDto
): Promise<void> {
  await ddbDocumentClient.send(
    new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: PRODUCTS_TABLE,
            Item: product,
          },
        },
        {
          Put: {
            TableName: STOCKS_TABLE,
            Item: stock,
          },
        },
      ],
    })
  );
}

export async function getStock(productId: string): Promise<StockDto> {
  const data = await ddbDocumentClient.send(
    new GetCommand({
      TableName: STOCKS_TABLE,
      Key: { product_id: productId },
    })
  );
  return data.Item as StockDto;
}

export async function putStock(stock: StockDto): Promise<StockDto> {
  await ddbDocumentClient.send(
    new PutCommand({
      TableName: STOCKS_TABLE,
      Item: stock,
    })
  );
  return stock;
}
