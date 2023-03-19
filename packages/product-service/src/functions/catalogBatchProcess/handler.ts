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

  for (const { count, title, description, price } of products) {
    const productToSave: ProductDto = {
      id: uuid(),
      title,
      description,
      price: +price,
    };
    const stockToSave: StockDto = {
      product_id: productToSave.id,
      count: +count,
    };
    try {
      await transactPutProduct(productToSave, stockToSave);
      await sendTopicMessage(JSON.stringify(productToSave));
    } catch (error) {
      console.error(error);
    }
  }
};

const main = catalogBatchProcess;

export { catalogBatchProcess, main };
