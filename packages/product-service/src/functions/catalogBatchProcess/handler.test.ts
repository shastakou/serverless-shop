import { SQSRecord } from 'aws-lambda';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import {
  DynamoDBDocumentClient,
  TransactWriteCommand,
} from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import * as snsClientService from '@libs/services/snsClient.service';
import * as dbDocumentClientService from '@libs/services/dbDocumentClient.service';
import { catalogBatchProcess } from './handler';
import { CreateProductDto } from '../../types/api-types';

const ddbClient = mockClient(DynamoDBDocumentClient);
const snsClient = mockClient(SNSClient);

const mockedUploadedProducts: CreateProductDto[] = [
  {
    description: 'Short Product Description',
    price: 24,
    title: 'ProductOne',
    count: 1,
  },
  {
    description: 'Short Product Description7',
    price: 15,
    title: 'ProductTitle',
    count: 1,
  },
];
const mockedSQSRecords = mockedUploadedProducts.map((p) => ({
  body: JSON.stringify(p),
})) as SQSRecord[];

describe('catalogBatchProcess', () => {
  beforeEach(() => {
    ddbClient.reset();
    snsClient.reset();

    ddbClient.on(TransactWriteCommand).resolves({});
    snsClient.on(PublishCommand).resolves({});
  });

  it('should create products and stocks in corresponding dynamodb tables', async () => {
    const transactPutProductSpy = jest.spyOn(
      dbDocumentClientService,
      'transactPutProduct'
    );

    await catalogBatchProcess({ Records: mockedSQSRecords });

    expect(transactPutProductSpy).toBeCalledTimes(2);
  });

  it('should send an email when product created', async () => {
    const sendTopicMessageSpy = jest.spyOn(
      snsClientService,
      'sendTopicMessage'
    );

    await catalogBatchProcess({ Records: mockedSQSRecords });

    expect(sendTopicMessageSpy).toBeCalledTimes(2);
  });
});
