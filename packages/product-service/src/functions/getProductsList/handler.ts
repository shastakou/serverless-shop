import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/utils/apiGateway';
import { formatJSONResponse } from '@libs/utils/apiGateway';
import { middyfy } from '@libs/utils/lambdaMiddleware';
import { getProductsWithStockCount } from '@libs/services/dbDocumentClient.service';

const getProductsList: ValidatedEventAPIGatewayProxyEvent<void> = async () => {
  const productsList = await getProductsWithStockCount();
  return formatJSONResponse(productsList);
};

const main = middyfy(getProductsList);

export { getProductsList, main };
