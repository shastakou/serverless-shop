import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { getProductsWithStockCount } from '@libs/services/dbDocumentClient.service';

export const getProductsList: ValidatedEventAPIGatewayProxyEvent<
  void
> = async () => {
  const productsList = await getProductsWithStockCount();
  return formatJSONResponse(productsList);
};

export const main = middyfy(getProductsList);
