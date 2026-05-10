import {
	IsEmail,
	IsNotEmpty,
	IsString,
	Matches,
	MaxLength,
	MinLength,
} from "class-validator";

export class CreateUserDto {
	@IsEmail()
	@IsNotEmpty()
	email!: string;

	@IsString()
	@IsNotEmpty()
	@Matches(/^[a-z0-9_]{3,20}$/)
	username!: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(2)
	@MaxLength(50)
	displayName!: string;

	@IsString()
	@IsNotEmpty()
	@MinLength(8)
	password!: string;
}