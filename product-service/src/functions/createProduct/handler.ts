import validator from '@middy/validator';
import { transpileSchema } from '@middy/validator/transpile';
import { v4 as uuid } from 'uuid';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/apiGateway';
import { formatJSONResponse } from '@libs/apiGateway';
import { middyfy } from '@libs/lambda';
import { putProduct, putStock } from '@libs/services/dbDocumentClient.service';
import { createProductSchema } from '@libs/schemas/createProduct.schema';

export const createProduct: ValidatedEventAPIGatewayProxyEvent<
  typeof createProductSchema
> = async (event) => {
  const { body } = event;
  const { count = 0, ...product } = body;

  const createdProduct = await putProduct({
    id: uuid(),
    ...product,
  });
  const stock = await putStock({
    product_id: createdProduct.id,
    count,
  });

  return formatJSONResponse({
    ...createdProduct,
    count: stock.count,
  });
};

export const main = middyfy(createProduct).use(
  validator({
    eventSchema: transpileSchema(createProductSchema),
  })
);
