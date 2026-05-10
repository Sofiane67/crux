import {
    ConflictException,
    Injectable,
    Logger,
    NotFoundException,
} from "@nestjs/common";
import { Prisma } from "../../generated/prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import type { CreateUserDto } from "./dto/create-user.dto";
import type { UpdateUserDto } from "./dto/update-user.dto";
import type { User } from "./interfaces";

const PASSWORD_PLACEHOLDER_PREFIX = "__bcrypt_pending__";

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(private readonly prisma: PrismaService) {}

    async findAll(): Promise<User[]> {
        const users = await this.prisma.user.findMany();
        return users.map(this.toDto);
    }

    async findById(id: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) throw new NotFoundException("User not found");
        return this.toDto(user);
    }

    async findByUsername(username: string): Promise<User> {
        const user = await this.prisma.user.findUnique({ where: { username } });
        if (!user) throw new NotFoundException("User not found");
        return this.toDto(user);
    }

    async create(dto: CreateUserDto): Promise<User> {
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    username: dto.username,
                    displayName: dto.displayName,
                    password: `${PASSWORD_PLACEHOLDER_PREFIX}${dto.password}`,
                },
            });
            return this.toDto(user);
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === "P2002"
            ) {
                throw new ConflictException("Email or username already taken");
            }
            throw e;
        }
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        try {
            const user = await this.prisma.user.update({ where: { id }, data: dto });
            return this.toDto(user);
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === "P2025") throw new NotFoundException("User not found");
                if (e.code === "P2002")
                    throw new ConflictException("Email or username already taken");
            }
            throw e;
        }
    }

    async remove(id: string): Promise<void> {
        try {
            await this.prisma.user.delete({ where: { id } });
        } catch (e) {
            if (
                e instanceof Prisma.PrismaClientKnownRequestError &&
                e.code === "P2025"
            ) {
                throw new NotFoundException("User not found");
            }
            throw e;
        }
    }

    private toDto(user: PrismaUserWithPassword): User {
        const { password, ...rest } = user;
        return rest;
    }
}

type PrismaUserWithPassword = Awaited<
    ReturnType<PrismaService["user"]["findUniqueOrThrow"]>
>;