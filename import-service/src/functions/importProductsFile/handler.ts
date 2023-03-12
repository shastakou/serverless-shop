import { extname } from 'node:path';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { BadRequest } from 'http-errors';
import { formatJSONResponse } from '@libs/utils/apiGateway';
import { middyfy } from '@libs/utils/lambdaMiddleware';
import { createPresignedUrl } from '@libs/services/s3Client.service';
import { BUCKET_UPLOADED_PREFIX } from '@libs/constants';

const importProductsFile = async (event: APIGatewayProxyEvent) => {
  const { name } = event.queryStringParameters;

  if (extname(name) !== '.csv') {
    throw new BadRequest('The file should be in [.csv] format');
  }

  const url = await createPresignedUrl(BUCKET_UPLOADED_PREFIX + name);

  return formatJSONResponse({ url });
};

export const main = middyfy(importProductsFile);
