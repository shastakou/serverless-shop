import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { ROUTES_MAP } from './constants';
import { parseOriginalUrl } from './utils';

@Injectable()
export class RouteGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();
    const { serviceName } = parseOriginalUrl(request.originalUrl);

    if (!ROUTES_MAP[serviceName] || !process.env[ROUTES_MAP[serviceName]]) {
      throw new HttpException('Cannot process request', HttpStatus.BAD_GATEWAY);
    }

    return true;
  }
}
