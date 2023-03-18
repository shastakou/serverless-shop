export * from './api-types';
export * from './type-utils';

export interface ParsedProduct {
  title: string;
  description?: string;
  price: number;
  count?: number;
}
