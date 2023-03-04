import * as createHttpError from 'http-errors';
import { GetCommand } from '@aws-sdk/lib-dynamodb';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { ddbDocumentClient } from '@libs/ddbDocumentClient';
import { Product } from '../../types/api-types';

export const getProductById: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  const { id } = event.pathParameters;
  const product = await getProductFromDb(id);

  if (!product) {
    throw createHttpError.NotFound(`Product with ID "${id}" is not found!`);
  }

  return formatJSONResponse(product);
};

async function getProductFromDb(id: string): Promise<Product> {
  const data = await ddbDocumentClient.send(
    new GetCommand({
      TableName: process.env.PRODUCTS_TABLE,
      Key: { id },
    })
  );
  return data.Item as Product;
}

export const main = middyfy(getProductById);
