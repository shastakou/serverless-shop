import { HttpService } from '@nestjs/axios';
import {
  All,
  Controller,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Req,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { AxiosError } from 'axios';
import { Request } from 'express';
import { catchError, firstValueFrom } from 'rxjs';
import { ROUTES_MAP } from './shared/constants';
import { HttpExceptionFilter } from './shared/http-exception.filter';
import { RouteGuard } from './shared/route.guard';
import { parseOriginalUrl } from './shared/utils';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {
    return {
      message: 'OK',
    };
  }

  @UseGuards(RouteGuard)
  @All('*')
  @UseFilters(new HttpExceptionFilter())
  async main(@Req() request: Request) {
    const method = request.method;
    const headers = {
      'content-type': request.headers['content-type'],
      authorization: request.headers['authorization'],
    };
    const body =
      Object.keys(request.body ?? {}).length > 0 ? request.body : undefined;
    const { serviceName, serviceUrl } = parseOriginalUrl(request.originalUrl);
    const hostUrl = process.env[ROUTES_MAP[serviceName]];
    const requestUrl = hostUrl + serviceUrl;

    const { data } = await firstValueFrom(
      this.httpService
        .request({
          url: requestUrl,
          method,
          data: body,
          headers,
        })
        .pipe(
          catchError((error: AxiosError) => {
            throw new HttpException(error.response, error.response?.status);
          }),
        ),
    );

    return data;
  }
}
