import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { findProductById } from '@mocks/products';

const getProductById: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  const { id } = event.pathParameters;
  const product = await findProductById(id);

  return formatJSONResponse(product);
};

export const main = middyfy(getProductById);
