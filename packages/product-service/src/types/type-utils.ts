import { AWS } from '@serverless/typescript';

export type AWSFunctionConfig = AWS['functions'][''] & {
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
