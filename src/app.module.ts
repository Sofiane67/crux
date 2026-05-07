import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { BriefsModule } from "./brief/briefs.module";
import { validateEnv } from "./config/validate-env";
import { HealthModule } from "./health/health.module";
import { AppLifecycleModule } from "./lifecycle/app-lifecycle.module";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			validate: validateEnv,
			envFilePath: [".env"],
		}),
		HealthModule,
		BriefsModule,
		AppLifecycleModule,
	],
})
export class AppModule {}
