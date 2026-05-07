import { Injectable, Logger } from "@nestjs/common";
import type { Brief } from "./interfaces";

@Injectable()
export class BriefsService {
	private readonly logger = new Logger(BriefsService.name);

	findAll(): Brief[] {
		this.logger.log("findAll called");

		return [
			{
				id: "b1",
				topic: "RAG re-ranking techniques",
				status: "DONE",
				createdAt: "2026-05-07",
			},
			{
				id: "b2",
				topic: "LLM evaluation benchmarks",
				status: "PENDING",
				createdAt: "2026-05-07",
			},
		];
	}
}
