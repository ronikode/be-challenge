import { Logger, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
class LogsMiddleware implements NestMiddleware {
  private readonly logger = new Logger(this.constructor.name);

  metadata = {
    context: 'LogsMiddleware',
  };

  use(request: Request, response: Response, next: NextFunction) {
    response.on('finish', () => {
      const { method, originalUrl } = request;
      const { statusCode, statusMessage } = response;

      const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
      if (!originalUrl.includes(`/health`)) {
        return this.logger.log(message, this.metadata);
      }
      return this.logger.debug(message, this.metadata);
    });

    next();
  }
}

export default LogsMiddleware;
