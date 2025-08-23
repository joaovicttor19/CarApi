import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BodyFormatingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if ((req.method === 'POST' || req.method === 'PATCH') && req.body) {
      Object.keys(req.body).forEach((key) => {
        const val = req.body[key]?.trim?.();

        req.body[key] =
          val === ''
            ? null
            : val?.toLowerCase() === 'true'
              ? true
              : val?.toLowerCase() === 'false'
                ? false
                : val;
      });

      next();
    }
  }
}
