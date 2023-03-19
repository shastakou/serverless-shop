import { AWS } from '@serverless/typescript';
import { handlerPath } from '@libs/utils/handlerResolver';
import { BUCKET_EVENT, BUCKET_UPLOADED_PREFIX } from '@libs/constants';

const importFileParser: AWS['functions'][''] = {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      s3: {
        bucket: '${self:custom.productsBucket.name}',
        event: BUCKET_EVENT,
        rules: [
          {
            prefix: BUCKET_UPLOADED_PREFIX,
          },
        ],
        existing: true,
      },
    },
  ],
};

export { importFileParser };
