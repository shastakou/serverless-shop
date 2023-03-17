import * as s3ClientService from '@libs/services/s3Client.service';
import {
  APIGatewayProxyEvent,
  APIGatewayProxyEventQueryStringParameters,
} from 'aws-lambda';
import { BUCKET_UPLOADED_PREFIX } from '@libs/constants';
import { importProductsFile } from './handler';

jest.mock('@libs/constants', () => ({
  BUCKET: 'import-service-products-bucket',
  BUCKET_UPLOADED_PREFIX: 'uploaded/',
}));

const mockedBucketKey = 'products.csv';
const mockedPresignedUrl = 'products.csv';

describe('importProductsFile', () => {
  it('should return a presigned url', async () => {
    const createPresignedUrlSpy = jest
      .spyOn(s3ClientService, 'createPresignedUrl')
      .mockImplementation(() => Promise.resolve(mockedPresignedUrl));

    const response = await importProductsFile({
      queryStringParameters: {
        name: mockedBucketKey,
      } as APIGatewayProxyEventQueryStringParameters,
    } as APIGatewayProxyEvent);

    expect(createPresignedUrlSpy).toBeCalledWith(
      BUCKET_UPLOADED_PREFIX + mockedBucketKey
    );
    expect(createPresignedUrlSpy).toBeCalledTimes(1);
    expect(response.body).toEqual(JSON.stringify({ url: mockedPresignedUrl }));
  });
});
