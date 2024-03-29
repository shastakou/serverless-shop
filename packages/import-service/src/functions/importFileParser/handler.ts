import { pipeline } from 'node:stream/promises';
import { S3Event } from 'aws-lambda';
import { InternalServerError } from 'http-errors';
import csvParser from 'csv-parser';
import {
  copyObject,
  deleteObject,
  getObject,
} from '@libs/services/s3Client.service';
import { BUCKET, BUCKET_PARSED_PREFIX } from '@libs/constants';
import { sendProductToQueue } from '@libs/services/sqsClient.service';

const importFileParser = async (event: S3Event) => {
  const s3Records = event.Records ?? [];

  for (const s3Record of s3Records) {
    const objectMetadata = s3Record?.s3?.object;
    const objectKey = objectMetadata.key;

    try {
      const objectStream = await getObject(objectKey);

      await pipeline(objectStream, csvParser(), async function* (parsedLines) {
        for await (const parsedProduct of parsedLines) {
          sendProductToQueue(parsedProduct);
          yield parsedProduct;
        }
      });

      await copyObject(
        BUCKET + '/' + objectKey,
        BUCKET_PARSED_PREFIX + objectKey.split('/').pop()
      );

      await deleteObject(objectKey);
    } catch (error) {
      console.error(error);
      throw new InternalServerError(error);
    }
  }
};

const main = importFileParser;

export { importFileParser, main };
