import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class CorrelationIdMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		const correlationId = req.header("X-Correlation-Id") ?? crypto.randomUUID();
		req.correlationId = correlationId;

		res.setHeader("X-Correlation-Id", correlationId);

		next();
	}
}
