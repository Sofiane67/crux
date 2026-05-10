import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";
import { UserDto } from "./user.dto";

export class UpdateUserDto extends UserDto {
	@IsOptional()
	@IsString()
	@MaxLength(500)
	bio?: string;

	@IsOptional()
	@IsString()
	@IsUrl()
	avatar?: string;
}