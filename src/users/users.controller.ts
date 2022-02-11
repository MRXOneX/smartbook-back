import { Controller, Body, Response, Request, Post, Get } from "@nestjs/common"
// service
import { JwtService } from "@nestjs/jwt"
//
import { UsersService } from "./users.service"
// dto
import { CreateUserDto } from "./dto/create-user.dto"
import { LoginUserDto } from "./dto/login-user.dto"



@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService, private jwtService: JwtService) {}

    @Post('/registration')
    async registration(@Body() userDto: CreateUserDto, @Response() res: any) {
        const user = await this.usersService.registration(userDto)

        res.cookie('refreshToken', user.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.send({access_token: user.access_token, user: user.userData});
    }


    @Post('/login')
    async login(@Body() userDto: LoginUserDto, @Response() res: any) {

        const user = await this.usersService.login(userDto)

        res.cookie('refreshToken', user.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.send({access_token: user.access_token, user: user.userData});
    }

    @Get('/logout')
    async logout(@Response() res: any, @Request() req: any) {
        const { refreshToken } = req.cookies

        const user = this.jwtService.verify(refreshToken, { secret: 'RT_SECRET' })
        await this.usersService.logout(user.id)

        return res.json({HttpStatus: 200})
    }


    @Get('/refresh')
    async refresh(@Request() req: any, @Response() res: any) {
        const { refreshToken } = req.cookies
        

        const user = await this.usersService.refreshTokens(refreshToken)

        res.cookie('refreshToken', user.refresh_token, {maxAge: 7 * 24 * 60 * 60 * 1000, httpOnly: true})
        return res.send({access_token: user.access_token, user: user.userData})
    }


    @Get('/getUsers')
    getUsers() {
        return this.usersService.getAllUsers()
    }

}