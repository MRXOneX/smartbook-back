import { Controller, Body, Post, Get } from "@nestjs/common"
// service
import { UsersService } from "./users.service"
// dto
import { CreateUserDto } from "./dto/create-user.dto"
import { LoginUserDto } from "./dto/login-user.dto"



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {}

    @Post('/registration')
    registration(@Body() userDto: CreateUserDto) {
        return this.usersService.registration(userDto)
    }


    @Post('/login')
    login(@Body() userDto: LoginUserDto) {
        return this.usersService.login(userDto)
    }

    @Get('/getUsers')
    getUsers() {
        return this.usersService.getAllUsers()
    }

}