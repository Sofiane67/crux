import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import { BriefsService } from "./briefs.service";
import { CreateBriefDto } from "./dto/create-brief.dto";
import type { Brief } from "./interfaces";
import {ParseCuidPipe} from "../common/pipes/parse-cuid.pipe";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags("briefs")
@Controller("briefs")
export class BriefsController {
	constructor(private readonly briefsService: BriefsService) {}

	@Get()
	@ApiOperation({ summary: "Get all briefs" })
	findAll(): Brief[] {
		return this.briefsService.findAll();
	}

	@Post()
	@ApiOperation({ summary: "Create a brief" })
	@ApiResponse({ status: 201, description: "Created" })
	@ApiResponse({ status: 400, description: "Validation failed" })
	create(@Body() dto: CreateBriefDto): Brief {
		return this.briefsService.create(dto);
	}

	@Get(":id")
	@ApiOperation({ summary: "Get a brief by id" })
	findOne(@Param("id", ParseCuidPipe) id: string): { id: string} {
		return { id };
	}
}
