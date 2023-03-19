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
  const { count = 0, title, description, price } = event.body;

  const productToSave: ProductDto = {
    id: uuid(),
    title,
    description,
    price: +price,
  };
  const stockToSave: StockDto = {
    product_id: productToSave.id,
    count: +count,
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
