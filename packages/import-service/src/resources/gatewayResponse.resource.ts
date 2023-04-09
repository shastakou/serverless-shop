import { AWS } from '@serverless/typescript';

const UnauthorizedGatewayResponse: AWS['resources']['Resources'][''] = {
  Type: 'AWS::ApiGateway::GatewayResponse',
  Properties: {
    ResponseParameters: {
      'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
      'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
    },
    ResponseType: 'DEFAULT_4XX',
    RestApiId: {
      Ref: 'ApiGatewayRestApi',
    },
  },
};

export { UnauthorizedGatewayResponse };
