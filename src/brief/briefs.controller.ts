import { Body, Controller, Get, Post } from "@nestjs/common";
import { BriefsService } from "./briefs.service";
import { CreateBriefDto } from "./dto/create-brief.dto";
import type { Brief } from "./interfaces";

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
}
