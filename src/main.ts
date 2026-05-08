import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import type { Env } from "./config/env.schema";
import {AllExceptionsFilter} from "./common/filters/all-exceptions.filter";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const config = app.get(ConfigService<Env, true>);
	const port = config.get("PORT", { infer: true });

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			transform: true,
			transformOptions: { enableImplicitConversion: true },
		}),
	);
	app.enableShutdownHooks();
	app.useGlobalFilters(new AllExceptionsFilter());
	await app.listen(port);
}
bootstrap();
