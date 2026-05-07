import { Module } from "@nestjs/common";
import { BriefsModule } from "./brief/briefs.module";
import { HealthModule } from "./health/health.module";

@Module({
	imports: [HealthModule, BriefsModule],
})
export class AppModule {}
