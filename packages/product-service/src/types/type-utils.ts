import { AWS } from '@serverless/typescript';

export type FunctionWithSwagger = AWS['functions'][''] & {
  events: {
    httpApi: {
      bodyType?: 'CreateProductDto';
      responseData: Record<
        number,
        {
          bodyType?: any;
          description?: string;
        }
      >;
    };
  }[];
};
