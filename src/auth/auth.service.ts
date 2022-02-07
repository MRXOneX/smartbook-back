import { Injectable } from "@nestjs/common"
//
import * as bcrypt from "bcryptjs"
// service
import { JwtService } from "@nestjs/jwt"
import { UsersService } from "../users/users.service"
// dto
import { LoginUserDto } from "src/users/dto/login-user.dto"



@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {}
    

    async login(userDto: LoginUserDto) {
    }


    private async validateUser(userDto: LoginUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email)
    }

}