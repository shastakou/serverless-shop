import { Unauthorized } from 'http-errors';
import { APIGatewayAuthorizerEvent } from 'aws-lambda';

const basicAuthorizer = async (event: APIGatewayAuthorizerEvent) => {
  if (event.type !== 'TOKEN' || !event.authorizationToken) {
    throw Unauthorized();
  }

  try {
    const encodedToken = event.authorizationToken.split(' ')?.[1];
    const [userName, password] = Buffer.from(encodedToken, 'base64')
      .toString('utf-8')
      .split(':');

    const secretUserPassword = process.env[userName.toUpperCase()];
    const policyEffect =
      !secretUserPassword || secretUserPassword !== password ? 'Deny' : 'Allow';

    return generatePolicy(encodedToken, event.methodArn, policyEffect);
  } catch (error) {
    throw Unauthorized();
  }
};

function generatePolicy(
  principalId: string,
  methodArn: string,
  effect: 'Allow' | 'Deny'
) {
  const apiGatewayWildcard = methodArn.split('/', 2).join('/') + '/*';

  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: apiGatewayWildcard,
        },
      ],
    },
  };
}

const main = basicAuthorizer;

export { basicAuthorizer, main };
