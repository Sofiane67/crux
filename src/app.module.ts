import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BriefsModule } from "./brief/briefs.module";
import { CorrelationIdMiddleware } from "./common/middleware/correlation-id.middleware";
import { RequestLoggerMiddleware } from "./common/middleware/request-logger.middleware";
import { validateEnv } from "./config/validate-env";
import { HealthModule } from "./health/health.module";
import { AppLifecycleModule } from "./lifecycle/app-lifecycle.module";
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from "./users/users.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: validateEnv,
			envFilePath: [".env"],
		}),
		PrismaModule,
		HealthModule,
		BriefsModule,
		AppLifecycleModule,
		UsersModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(CorrelationIdMiddleware, RequestLoggerMiddleware)
			.forRoutes("*");
	}
}
