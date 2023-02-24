import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getProducts } from '@mocks/products';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const products = await getProducts();

  return formatJSONResponse(products);
};

export const main = middyfy(getProductsList);
