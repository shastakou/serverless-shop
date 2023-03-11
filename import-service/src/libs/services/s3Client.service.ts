import {
  PutObjectCommand,
  S3Client,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BUCKET, REGION } from '../constants';

const s3Client = new S3Client({ region: REGION });

export const createPresignedUrl = async (key: string): Promise<string> => {
  const command = new PutObjectCommand({ Bucket: BUCKET, Key: key });
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
};

export async function getObject(key: string): Promise<NodeJS.ReadableStream> {
  const command = new GetObjectCommand({ Bucket: BUCKET, Key: key });
  const result = await s3Client.send(command);
  return result.Body as NodeJS.ReadableStream;
}
