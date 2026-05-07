import {
	IsInt,
	IsNotEmpty,
	IsString,
	Max,
	MaxLength,
	Min,
} from "class-validator";

export class CreateBriefDto {
	@IsString()
	@IsNotEmpty()
	@MaxLength(200)
	topic!: string;

	@IsInt()
	@Min(1)
	@Max(10)
	maxPapers!: number;
}
