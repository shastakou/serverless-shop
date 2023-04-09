import { handlerPath } from '@libs/utils/handlerResolver';

const basicAuthorizer = {
  handler: `${handlerPath(__dirname)}/handler.main`,
};

export { basicAuthorizer };
