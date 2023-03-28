import {
  PublishCommand,
  PublishCommandInput,
  SNSClient,
} from '@aws-sdk/client-sns';
import { REGION, CREATE_PRODUCT_TOPIC } from '@libs/constants';

const snsClient = new SNSClient({ region: REGION });

async function sendTopicMessage(message: string): Promise<void> {
  const params: PublishCommandInput = {
    TopicArn: CREATE_PRODUCT_TOPIC,
    Message: message,
  };
  await snsClient.send(new PublishCommand(params));
}

export { sendTopicMessage };
