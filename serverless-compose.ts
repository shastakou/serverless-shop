module.exports = {
  services: {
    'product-service': {
      path: './product-service',
    },
    'import-service': {
      path: './import-service',
      dependsOn: 'product-service',
    },
  },
};
