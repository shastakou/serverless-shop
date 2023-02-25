import { AWS } from '@serverless/typescript';

export type AWSFunctionConfig = AWS['functions'][''] & {
  events: {
    http: {
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
