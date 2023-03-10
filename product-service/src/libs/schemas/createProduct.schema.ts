export const createProductSchema = {
  type: 'object',
  properties: {
    body: {
      type: 'object',
      properties: {
        title: {
          type: 'string',
        },
        price: {
          type: 'number',
        },
        description: {
          type: 'string',
        },
        count: {
          type: 'number',
        },
      },
      required: ['title', 'price'],
    },
  },
  required: ['body'],
} as const;
