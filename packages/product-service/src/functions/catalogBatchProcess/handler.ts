import { SQSEvent } from 'aws-lambda';

export const catalogBatchProcess = async (event: SQSEvent) => {
  const products = event.Records.map(({ body }) => body);

  for (const product of products) {
    console.log(product);
  }
};

export const main = catalogBatchProcess;
