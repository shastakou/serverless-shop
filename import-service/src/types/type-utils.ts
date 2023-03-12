import { AWS } from '@serverless/typescript';

export type AWSFunctionConfig = AWS['functions'][''] & {
  events: {
    http: {
      queryStringParameters: Record<
        string,
        {
          required: boolean;
          type: any;
          description?: string;
        }
      >;

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
