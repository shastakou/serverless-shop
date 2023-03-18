module.exports = {
  services: {
    'product-service': {
      path: 'packages/product-service',
    },
    'import-service': {
      path: 'packages/import-service',
      dependsOn: 'product-service',
      params: {
        catalogProductsQueueUrl: '${product-service.CatalogProductsQueueUrl}',
      },
    },
  },
};
