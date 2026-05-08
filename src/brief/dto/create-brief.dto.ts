import {
	ArrayMaxSize,
	ArrayMinSize,
	IsArray,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

const ARXIV_ID_REGEX = /^\d{4}\.\d{4,5}(v\d+)?$/;

export class CreateBriefDto {
	@ApiProperty({ example: "RAG re-ranking", maxLength: 200})
	@IsString()
	@IsNotEmpty({ message: "topic should not be empty" })
	@MaxLength(200, { message: "topic must be 200 characters or fewer" })
	topic!: string;

	@ApiProperty({ example: ["2410.12345", "2411.00001"], minItems: 1, maxItems: 10 })
	@IsArray()
	@ArrayMinSize(1, { message: "paperIds must contain at least 1 item" })
	@ArrayMaxSize(10, { message: "paperIds must contain at most 10 items" })
	@IsString({ each: true, message: "each paperId must be a string" })
	@Matches(ARXIV_ID_REGEX, {
		each: true,
		message:
			"each paperId must match arxiv format YYMM.NNNN or YYMM.NNNNN (optional vN suffix)",
	})
	paperIds!: string[];
}
