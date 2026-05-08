import {ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus, Logger} from "@nestjs/common";
import {Request, Response} from "express"

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    private extractMessage(exception: HttpException): string | string[] {
        const response = exception.getResponse();
        if (typeof response === "string") return response;
        if (typeof response === "object" && "message" in response) {
            return response.message as string | string[];
        }
        return exception.message;
    }

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const req = ctx.getRequest<Request>();
        const res = ctx.getResponse<Response>();

        let status: number;
        let message: string | string[];

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            message = this.extractMessage(exception);
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            message = "Internal server error";
        }

        if (status >= 500) {
            this.logger.error(JSON.stringify({
                correlationId: req.correlationId,
                path: req.url,
                method: req.method
            }), exception instanceof Error ? exception.stack : undefined);
        }

        const body = {
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: req.url,
            correlationId: req.correlationId,
        };

        res.status(status).json(body);
    }
}