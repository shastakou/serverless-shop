import 'aws-sdk-client-mock-jest';
import { mockClient } from 'aws-sdk-client-mock';
import { createReadStream } from 'fs';
import { join } from 'path';
import { S3EventRecord } from 'aws-lambda';
import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { sdkStreamMixin } from '@aws-sdk/util-stream-node';
import { importFileParser } from './handler';
import * as s3ClientService from '@libs/services/s3Client.service';
import { BUCKET, BUCKET_UPLOADED_PREFIX } from '@libs/constants';
import { BUCKET_PARSED_PREFIX } from '../../libs/constants/index';

jest.mock('@libs/constants', () => ({
  BUCKET: 'import-service-products-bucket',
  BUCKET_UPLOADED_PREFIX: 'uploaded/',
  BUCKET_PARSED_PREFIX: 'parsed/',
}));

const s3Client = mockClient(S3Client);
const mockedRecord = {
  s3: {
    object: {
      key: BUCKET_UPLOADED_PREFIX + 'products.csv',
    },
    bucket: {
      name: BUCKET,
    },
  },
} as S3EventRecord;

describe('importFileParser', () => {
  beforeEach(() => {
    s3Client.reset();
    s3Client.on(GetObjectCommand).resolves({
      Body: sdkStreamMixin(
        createReadStream(join(__dirname, 'products.mock.csv'))
      ),
    });
  });

  it('should parse incoming csv', async () => {
    const parsedLines = [];
    jest.spyOn(console, 'log').mockImplementation((data) => {
      parsedLines.push(data);
    });
    const getObjectSpy = jest.spyOn(s3ClientService, 'getObject');
    const copyObjectSpy = jest.spyOn(s3ClientService, 'copyObject');
    const deleteObjectSpy = jest.spyOn(s3ClientService, 'deleteObject');

    await importFileParser({ Records: [mockedRecord] });

    expect(getObjectSpy).toBeCalledTimes(1);
    expect(copyObjectSpy).toBeCalledTimes(1);
    expect(deleteObjectSpy).toBeCalledTimes(1);
    expect(parsedLines).toHaveLength(5);
    expect(parsedLines).toContainEqual({
      title: 'Iphone 14',
      description: 'Spy device',
      count: '10',
      price: '500',
    });
  });

  it('should move file to parsed', async () => {
    await importFileParser({ Records: [mockedRecord] });
    expect(s3Client).toHaveReceivedCommandWith(CopyObjectCommand, {
      Bucket: BUCKET,
      CopySource: BUCKET + '/' + mockedRecord.s3.object.key,
      Key: BUCKET_PARSED_PREFIX + 'products.csv',
    });
    expect(s3Client).toHaveReceivedCommandWith(DeleteObjectCommand, {
      Bucket: BUCKET,
      Key: mockedRecord.s3.object.key,
    });
  });
});
