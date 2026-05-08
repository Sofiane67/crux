import { Injectable, Logger } from "@nestjs/common";
import { CreateBriefDto } from "./dto/create-brief.dto";
import type { Brief } from "./interfaces";
import {createId} from "@paralleldrive/cuid2";

@Injectable()
export class BriefsService {
	private readonly logger = new Logger(BriefsService.name);

	findAll(): Brief[] {
		this.logger.log("findAll called");

		return [
			{
				id: createId(),
				topic: "RAG re-ranking techniques",
				status: "DONE",
				paperIds: ["2410.12345", "2411.00001"],
			},
			{
				id: createId(),
				topic: "LLM evaluation benchmarks",
				status: "PENDING",
				paperIds: ["2410.9876", "2411.3456"],
			},
		];
	}

	create(dto: CreateBriefDto): Brief {
		return {
			id: createId(),
			topic: dto.topic,
			status: "PENDING",
			paperIds: dto.paperIds,
		};
	}
}
