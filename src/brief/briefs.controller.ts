import { Controller, Get } from "@nestjs/common";
import { BriefsService } from "./briefs.service";
import type { Brief } from "./interfaces";

@Controller("briefs")
export class BriefsController {
	constructor(private readonly briefsService: BriefsService) {}

	@Get()
	findAll(): Brief[] {
		return this.briefsService.findAll();
	}
}
