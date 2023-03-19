import { v4 as uuid } from 'uuid';
import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/utils/apiGateway';
import { formatJSONResponse } from '@libs/utils/apiGateway';
import { middyfy } from '@libs/utils/lambdaMiddleware';
import { transactPutProduct } from '@libs/services/dbDocumentClient.service';
import { createProductSchema } from './schema';
import { ProductDto, StockDto } from '../../types/api-types';

const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof createProductSchema
> = async (event) => {
  const { count = 0, ...product } = event.body;

  const productToSave: ProductDto = {
    ...product,
    id: uuid(),
  };
  const stockToSave: StockDto = {
    product_id: productToSave.id,
    count,
  };

  await transactPutProduct(productToSave, stockToSave);

  return formatJSONResponse({
    ...productToSave,
    count,
  });
};

const main = middyfy(createProduct).use(
  validator({
    eventSchema: transpileSchema(createProductSchema),
  })
);

export { createProduct, main };
