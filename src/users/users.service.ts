import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
//
import { InjectModel } from "@nestjs/sequelize";
//
import * as bcrypt from "bcryptjs"
//
import { JwtService } from "@nestjs/jwt"
// model
import { User } from "./users.model"
// dto
import { CreateUserDto } from "./dto/create-user.dto";
import { LoginUserDto } from "./dto/login-user.dto"



@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User,
                                    private jwtService: JwtService) {}


    async login(userDto: LoginUserDto) {
        const user = await this.validateUser(userDto)
        return this.generateToken(user)
    }


    async registration(userDto: CreateUserDto) {
        const candidate = await this.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userRepository.create({...userDto, password: hashPassword})

        return this.generateToken(user)
    }


    private async generateToken(user: User) {
        const payload = {
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            sex: user.sex,
            email: user.email, 
            id: user.id
        }
        return {
            token: this.jwtService.sign(payload)
        }
    }

    private async validateUser(userDto: LoginUserDto) {
        const user = await this.getUserByEmail(userDto.email)
        const passwordEquals = await bcrypt.compare(userDto.password, user.password)

        
        if (user && passwordEquals) return user

        throw new UnauthorizedException({message: 'Error email or password'})
    }

    async getUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email}})
    }

    async getAllUsers() {
        return this.userRepository.findAll()
    }
}