import { API_PREFIX } from './constants';

export function parseOriginalUrl(originalUrl: string): {
  serviceUrl: string;
  serviceName: string;
} {
  const relativeUrl = originalUrl.replace(
    new RegExp(`^/${API_PREFIX}/`, 'g'),
    '',
  );
  const serviceName = relativeUrl.split('/').shift().split('?').shift();
  const serviceUrl = relativeUrl.replace(serviceName, '');

  return {
    serviceUrl,
    serviceName,
  };
}
