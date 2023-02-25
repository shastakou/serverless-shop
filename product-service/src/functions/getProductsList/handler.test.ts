import { formatJSONResponse } from '@libs/apiGateway';
import { getProducts } from '@mocks/products';
import { getProductsList } from './handler';

describe('getProductsList', () => {
  test('list of products are returned', async () => {
    const productsList = await getProducts();
    const response = await getProductsList(null, null, null);
    expect(response).toMatchObject(formatJSONResponse(productsList));
  });
});
