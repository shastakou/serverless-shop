import { Product, ProductsList } from '../types/api-types';

const products: ProductsList = [
  {
    description: 'Short Product Description',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80aa',
    price: 24,
    title: 'ProductOne',
  },
  {
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductTitle',
  },
  {
    description: 'Short Product Description2',
    id: '7567ec4b-b10c-48c5-9345-fc73c48a80a3',
    price: 23,
    title: 'Product',
  },
  {
    description: 'Short Product Description4',
    id: '7567ec4b-b10c-48c5-9345-fc73348a80a1',
    price: 15,
    title: 'ProductTest',
  },
  {
    description: 'Short Product Descriptio1',
    id: '7567ec4b-b10c-48c5-9445-fc73c48a80a2',
    price: 23,
    title: 'Product2',
  },
  {
    description: 'Short Product Description7',
    id: '7567ec4b-b10c-45c5-9345-fc73c48a80a1',
    price: 15,
    title: 'ProductName',
  },
];

export async function getProducts(): Promise<ProductsList> {
  return Promise.resolve(products);
}

export async function findProductById(id: string): Promise<Product> {
  const product = products.find((p) => p.id === id);
  return Promise.resolve(product);
}
