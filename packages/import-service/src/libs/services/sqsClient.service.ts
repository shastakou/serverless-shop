import {
  SendMessageCommandOutput,
  SendMessageCommand,
  SendMessageCommandInput,
  SQSClient,
} from '@aws-sdk/client-sqs';
import { CATALOG_PRODUCTS_QUEUE_URL, REGION } from '../constants';
import { ParsedProduct } from '../../types';

const sqsClient = new SQSClient({ region: REGION });

export async function sendProductToQueue(
  product: ParsedProduct
): Promise<SendMessageCommandOutput> {
  const params: SendMessageCommandInput = {
    QueueUrl: CATALOG_PRODUCTS_QUEUE_URL,
    MessageBody: JSON.stringify(product),
  };
  return sqsClient.send(new SendMessageCommand(params));
}
