import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ParseCuidPipe } from "../common/pipes/parse-cuid.pipe";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import type { User } from "./interfaces";
import { UsersService } from "./users.service";

@ApiTags("users")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll(): Promise<User[]> {
		return this.usersService.findAll();
	}

	@Get("username/:username")
	findByUsername(@Param("username") username: string): Promise<User> {
		return this.usersService.findByUsername(username);
	}

	@Get(":id")
	findById(@Param("id", ParseCuidPipe) id: string): Promise<User> {
		return this.usersService.findById(id);
	}

	@Post()
	create(@Body() dto: CreateUserDto): Promise<User> {
		return this.usersService.create(dto);
	}

	@Patch(":id")
	update(
		@Param("id", ParseCuidPipe) id: string,
		@Body() dto: UpdateUserDto,
	): Promise<User> {
		return this.usersService.update(id, dto);
	}

	@Delete(":id")
	@HttpCode(204)
	remove(@Param("id", ParseCuidPipe) id: string): Promise<void> {
		return this.usersService.remove(id);
	}
}