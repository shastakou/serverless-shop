import * as createHttpError from 'http-errors';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/utils/apiGateway';
import { formatJSONResponse } from '@libs/utils/apiGateway';
import { middyfy } from '@libs/utils/lambdaMiddleware';
import { getProduct, getStock } from '@libs/services/dbDocumentClient.service';

const getProductById: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  const { id } = event.pathParameters;
  const product = await getProduct(id);

  if (!product) {
    throw createHttpError.NotFound(`Product with ID "${id}" is not found!`);
  }

  const stock = await getStock(product.id);
  product.count = stock?.count ?? 0;

  return formatJSONResponse(product);
};

const main = middyfy(getProductById);

export { getProductById, main };
