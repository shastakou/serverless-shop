import { AWS } from '@serverless/typescript';

const ProductsBucket: AWS['resources']['Resources'][''] = {
  Type: 'AWS::S3::Bucket',
  Properties: {
    BucketName: 'import-service-products-bucket',
    CorsConfiguration: {
      CorsRules: [
        {
          AllowedHeaders: ['Content-Type'],
          AllowedMethods: ['GET', 'PUT'],
          AllowedOrigins: ['*'],
          MaxAge: 3600,
        },
      ],
    },
  },
};

export { ProductsBucket };
