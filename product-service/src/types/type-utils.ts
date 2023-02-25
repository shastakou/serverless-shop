import { AWS } from '@serverless/typescript';

export type AWSFunctionConfig = AWS['functions'][''] & {
  events: {
    httpApi: {
      responseData: Record<
        number,
        {
          bodyType?: 'Product' | 'ProductsList' | 'string' | 'number';
          description?: string;
        }
      >;
    };
  }[];
};
