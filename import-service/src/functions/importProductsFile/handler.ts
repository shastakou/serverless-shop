import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  const { fileName } = event.pathParameters;
  return formatJSONResponse({
    fileName,
  });
};

export const main = middyfy(importProductsFile);
