// import * as createHttpError from 'http-errors';
// import { formatJSONResponse } from '@libs/apiGateway';
// // import { getProducts } from '@mocks/products';
// import { getProductById } from './handler';

describe('getProductById', () => {
  test('specific product returned', async () => {
    // const productsList = await getProducts();
    // const product = productsList[0];
    // const event: any = {
    //   pathParameters: { id: product.id },
    // };
    // const response = await getProductById(event, null, null);
    // expect(response).toMatchObject(formatJSONResponse(product));
  });

  // test('product is not found', async () => {
  //   const event: any = {
  //     pathParameters: { id: 'incorrect id' },
  //   };

  //   try {
  //     await getProductById(event, null, null);
  //   } catch (error) {
  //     expect(error.status).toBe(createHttpError.NotFound().status);
  //   }
  // });
});
