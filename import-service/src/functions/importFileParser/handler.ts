import { pipeline } from 'node:stream/promises';
import { S3Event } from 'aws-lambda';
import { InternalServerError } from 'http-errors';
import csvParser from 'csv-parser';
import {
  copyObject,
  deleteObject,
  getObject,
} from '@libs/services/s3Client.service';
import { BUCKET_PARSED_PREFIX } from '@libs/constants';

export const importFileParser = async (event: S3Event) => {
  const objectMetadata = event.Records?.[0]?.s3?.object;
  const objectKey = objectMetadata.key;

  try {
    const chunks = [];
    const objectStream = await getObject(objectKey);

    await pipeline(objectStream, csvParser(), async function* (source) {
      for await (const chunk of source) {
        console.log(chunk);
        yield chunks.push(chunk);
      }
    });

    const copiedObjectKey = BUCKET_PARSED_PREFIX + objectKey.split('/').pop();
    await copyObject(objectKey, copiedObjectKey);

    await deleteObject(objectKey);
  } catch (error) {
    console.error(error);
    throw new InternalServerError(error);
  }
};

export const main = importFileParser;
