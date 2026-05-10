import {
	IsNotEmpty,
	IsOptional,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class UserDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-z0-9_]{3,20}$/)
	username?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(50)
	displayName?: string;
}