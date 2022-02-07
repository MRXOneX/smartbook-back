import { Controller, Body, Post } from "@nestjs/common"
// service
import { UsersService } from "./users.service"
// dto
import { CreateUserDto } from "./dto/create-user.dto"



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('create')
    create(@Body() userDto: CreateUserDto) {
        return this.usersService.createUser(userDto)
    }

}