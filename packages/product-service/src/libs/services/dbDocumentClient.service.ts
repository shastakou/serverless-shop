import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  TransactWriteCommand,
  TransactWriteCommandInput,
  TransactWriteCommandOutput,
} from '@aws-sdk/lib-dynamodb';
import { PRODUCTS_TABLE, REGION, STOCKS_TABLE } from '@libs/constants';
import { ProductDto, StockDto } from '../../types/api-types';

const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocumentClient = DynamoDBDocumentClient.from(ddbClient);

async function getProductsWithStockCount(): Promise<ProductDto[]> {
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

async function getProduct(id: string): Promise<ProductDto> {
  const data = await ddbDocumentClient.send(
    new GetCommand({
      TableName: PRODUCTS_TABLE,
      Key: { id },
    })
  );
  return data.Item as ProductDto;
}

async function putProduct(product: ProductDto): Promise<ProductDto> {
  await ddbDocumentClient.send(
    new PutCommand({
      TableName: PRODUCTS_TABLE,
      Item: product,
    })
  );
  return product;
}

function transactPutProduct(
  product: ProductDto,
  stock: StockDto
): Promise<TransactWriteCommandOutput> {
  const params: TransactWriteCommandInput = {
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
  };
  return ddbDocumentClient.send(new TransactWriteCommand(params));
}

async function getStock(productId: string): Promise<StockDto> {
  const data = await ddbDocumentClient.send(
    new GetCommand({
      TableName: STOCKS_TABLE,
      Key: { product_id: productId },
    })
  );
  return data.Item as StockDto;
}

async function putStock(stock: StockDto): Promise<StockDto> {
  await ddbDocumentClient.send(
    new PutCommand({
      TableName: STOCKS_TABLE,
      Item: stock,
    })
  );
  return stock;
}

export {
  getProductsWithStockCount,
  getProduct,
  putProduct,
  transactPutProduct,
  getStock,
  putStock,
};
