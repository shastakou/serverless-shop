module.exports = {
  services: {
    'authorization-service': {
      path: 'packages/authorization-service',
    },
    'product-service': {
      path: 'packages/product-service',
    },
    'import-service': {
      path: 'packages/import-service',
      dependsOn: ['authorization-service', 'product-service'],
      params: {
        catalogProductsQueueUrl: '${product-service.CatalogProductsQueueUrl}',
        catalogProductsQueueArn: '${product-service.CatalogProductsQueueArn}',
        authorizer: '${authorization-service.Authorizer}',
      },
    },
  },
};
