import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {UsersService} from "./users.service";
import {User} from "./schemas/user.schema";
import {CreateUserDto} from "./dto/create-user.dto";
import {UpdateUserDto} from "./dto/update-user.dto";
import {ILoginedUser} from "./types/ILoginedUser";
import {LoginUserDto} from "./dto/login-user.dto";

@Controller('users')
export class UsersController {

    constructor(private readonly usersService: UsersService) {
    }

    @Get()
    getUsers():Promise<User[]>{
        return this.usersService.getAll()
    }

    @Get(':id')
    getOne(@Param('id') id: string): Promise<User> {
        return this.usersService.getById(id)
    }

    @Post()
    createUser(@Body() CreateUserDto:CreateUserDto){
        return this.usersService.create(CreateUserDto)
    }
    @Delete(':id')
    remove(@Param('id') id: string): Promise<void> {
        return this.usersService.remove(id)
    }

    @Patch(':id')
    update(@Body() updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<User> {
        return this.usersService.update(id, updateUserDto)
    }
}
