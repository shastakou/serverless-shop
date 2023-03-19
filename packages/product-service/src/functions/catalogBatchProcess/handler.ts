import { SQSEvent } from 'aws-lambda';
import { v4 as uuid } from 'uuid';
import { transactPutProduct } from '@libs/services/dbDocumentClient.service';
import { ProductDto, StockDto, CreateProductDto } from '../../types/api-types';
import { sendTopicMessage } from '@libs/services/snsClient.service';

export const catalogBatchProcess = async (event: SQSEvent) => {
  let products: CreateProductDto[] = [];

  try {
    products = event.Records.map(({ body }) => JSON.parse(body));
  } catch (error) {
    console.error(error);
    return;
  }

  for (const { count, ...product } of products) {
    const productToSave: ProductDto = {
      id: uuid(),
      ...product,
    };
    const stockToSave: StockDto = {
      product_id: productToSave.id,
      count,
    };
    try {
      await transactPutProduct(productToSave, stockToSave);
      await sendTopicMessage(`Product [${product.title}] created!`);
    } catch (error) {
      console.error(error);
    }
  }
};

export const main = catalogBatchProcess;
