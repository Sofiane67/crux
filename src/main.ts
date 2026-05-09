import { ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { AllExceptionsFilter } from "./common/filters/all-exceptions.filter";
import type { Env } from "./config/env.schema";

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
	app.useGlobalFilters(new AllExceptionsFilter());

	const swaggerConfig = new DocumentBuilder()
		.setTitle(config.get("APP_NAME", { infer: true }))
		.setVersion(config.get("APP_VERSION", { infer: true }))
		.build();

	const document = SwaggerModule.createDocument(app, swaggerConfig);
	SwaggerModule.setup("api", app, document);

	app.enableShutdownHooks();

	await app.listen(port);
}
bootstrap();
