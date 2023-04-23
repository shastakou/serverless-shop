import { Controller, Get, HttpCode, HttpStatus, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  @HttpCode(HttpStatus.OK)
  health() {
    return {
      message: "It's alive",
    };
  }

  @Get('*')
  redirectRequest(@Req() request: Request) {
    const recipientUrl = request.originalUrl.replace(/^\/bff/, '');
    const method = request.method;

    return {
      recipientUrl,
      method,
    };
  }
}
