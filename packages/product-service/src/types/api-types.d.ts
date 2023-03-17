export interface ProductDto extends CreateProductDto {
  id: string;
  description?: string;
  price: number;
  count?: number;
}

export interface CreateProductDto {
  title: string;
  description?: string;
  price: number;
  count?: number;
}

export interface StockDto {
  product_id: string;
  count: number;
}

export type ProductsDto = ProductDto[];
