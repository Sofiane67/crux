import {
	Injectable,
	Logger,
	type OnModuleDestroy,
	type OnModuleInit,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import type { Env } from "../config/env.schema";

@Injectable()
export class AppLifecycleService implements OnModuleInit, OnModuleDestroy {
	private readonly logger = new Logger(AppLifecycleService.name);

	constructor(private readonly config: ConfigService<Env, true>) {}

	onModuleInit(): void {
		const env = this.config.get("NODE_ENV", { infer: true });
		const port = this.config.get("PORT", { infer: true });
		this.logger.log(`App started in ${env} mode on port ${port}`);
	}

	onModuleDestroy(): void {
		this.logger.log("App shutting down gracefully");
	}
}
