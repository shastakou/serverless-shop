import { extname } from 'node:path';
import { BadRequest } from 'http-errors';
import { formatJSONResponse } from '@libs/api-gateway';
import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';
import { createPresignedUrl } from '@libs/services/s3Client.service';

const importProductsFile: ValidatedEventAPIGatewayProxyEvent<void> = async (
  event
) => {
  const { name } = event.queryStringParameters;
  const region = process.env.REGION;
  const bucket = process.env.BUCKET;

  if (extname(name) !== '.csv') {
    throw new BadRequest('The file should be in [.csv] format');
  }

  const url = await createPresignedUrl({
    region,
    bucket,
    key: ['uploaded', name].join('/'),
  });

  return formatJSONResponse({ url });
};

export const main = middyfy(importProductsFile);
