import { pipeline } from 'node:stream/promises';
import { S3Event } from 'aws-lambda';
import { InternalServerError } from 'http-errors';
import csvParser from 'csv-parser';
import { getObject } from '@libs/services/s3Client.service';

export const importFileParser = async (event: S3Event) => {
  const objectMetadata = event.Records?.[0]?.s3?.object;

  try {
    const chunks = [];
    const objectStream = await getObject(objectMetadata.key);

    await pipeline(objectStream, csvParser(), async function* (source) {
      for await (const chunk of source) {
        console.log(chunk);
        yield chunks.push(chunk);
      }
    });
  } catch (error) {
    console.error(error);
    throw new InternalServerError(error);
  }
};

export const main = importFileParser;
