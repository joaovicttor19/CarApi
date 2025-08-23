import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      `${req.method} ${req.url}] ${new Date().toISOString()} - ${req.originalUrl}`,
    );

    next();
  }
}
