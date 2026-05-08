import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import { BriefsService } from "./briefs.service";
import { CreateBriefDto } from "./dto/create-brief.dto";
import type { Brief } from "./interfaces";
import {ParseCuidPipe} from "../common/pipes/parse-cuid.pipe";

@Controller("briefs")
export class BriefsController {
	constructor(private readonly briefsService: BriefsService) {}

	@Get()
	findAll(): Brief[] {
		return this.briefsService.findAll();
	}

	@Post()
	create(@Body() dto: CreateBriefDto): Brief {
		return this.briefsService.create(dto);
	}

	@Get(":id")
	findOne(@Param("id", ParseCuidPipe) id: string): { id: string} {
		return { id };
	}
}
