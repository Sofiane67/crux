import {Injectable, Logger, NestMiddleware} from "@nestjs/common";
import {Request, Response, NextFunction} from "express";

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
    private readonly logger = new Logger("HTTP");

    use(req: Request, res: Response, next: NextFunction) {
        const start = Date.now();

        res.on("finish", () => {
            const durationMs = Date.now() - start;
            this.logger.log(
                JSON.stringify({
                    method: req.method,
                    path: req.originalUrl,
                    statusCode: res.statusCode,
                    durationMs,
                    correlationId: req.correlationId
                })
            )
        });

        next();
    }
}