import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

type CreatePresignedUrlParams = {
  region: string;
  bucket: string;
  key: string;
};

export const createPresignedUrl = async ({
  region,
  bucket,
  key,
}: CreatePresignedUrlParams): Promise<string> => {
  const client = new S3Client({ region });
  const command = new PutObjectCommand({ Bucket: bucket, Key: key });
  return getSignedUrl(client, command, { expiresIn: 3600 });
};
