import { SQSEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { transactPutProduct } from '@libs/services/dbDocumentClient.service';
import { ProductDto, StockDto, CreateProductDto } from '../../types/api-types';
import { sendTopicMessage } from '@libs/services/snsClient.service';

const catalogBatchProcess = async (event: SQSEvent) => {
  let products: CreateProductDto[] = [];

  try {
    products = event.Records.map(({ body }) => JSON.parse(body));
  } catch (error) {
    console.error(error);
    return;
  }

  for (const { count, ...product } of products) {
    const productToSave: ProductDto = {
      ...product,
      id: uuid(),
    };
    const stockToSave: StockDto = {
      product_id: productToSave.id,
      count,
    };
    try {
      await transactPutProduct(productToSave, stockToSave);
    } catch (error) {
      console.error(error);
    }
  }

  await sendTopicMessage(
    'Products created!\n' + products.map((p) => `- [${p.title}]\n`).join('')
  );
};

const main = catalogBatchProcess;

export { catalogBatchProcess, main };
