const REGION = process.env.REGION;
const BUCKET = process.env.BUCKET;
const CATALOG_PRODUCTS_QUEUE_URL = process.env.CATALOG_PRODUCTS_QUEUE_URL;
const BUCKET_EVENT = 's3:ObjectCreated:*';
const BUCKET_UPLOADED_PREFIX = 'uploaded/';
const BUCKET_PARSED_PREFIX = 'parsed/';

export {
  REGION,
  BUCKET,
  CATALOG_PRODUCTS_QUEUE_URL,
  BUCKET_EVENT,
  BUCKET_UPLOADED_PREFIX,
  BUCKET_PARSED_PREFIX,
};
