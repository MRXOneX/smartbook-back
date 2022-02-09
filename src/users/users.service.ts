import { ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
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
    constructor(@InjectModel(User) 
                                private userRepository: typeof User,                                
                                private jwtService: JwtService) {}




    async login(userDto: LoginUserDto) {
        const user = await this.getUserByEmail(userDto.email)
        if(!user) throw new ForbiddenException('Access Denied')

        const passwordEquals = await bcrypt.compare(userDto.password, user.password)
        if(!passwordEquals) throw new ForbiddenException('Access Denied')

        const tokens = await this.generateTokens(user)
        await this.updateRtHash(user.id, tokens.refresh_token)


        return tokens
    }


    async registration(userDto: CreateUserDto) {
        const candidate = await this.getUserByEmail(userDto.email)

        if (candidate) {
            throw new HttpException('A user with this email exists', HttpStatus.BAD_REQUEST)
        }
        const hashPassword = await bcrypt.hash(userDto.password, 5)
        const user = await this.userRepository.create({...userDto, password: hashPassword})


        const tokens = this.generateTokens(user)
        await this.updateRtHash(user.id, (await tokens).refresh_token)


        return tokens
    }


    private async generateTokens(user: User) {
      
        const jwtPayload = {
            firstname: user.firstname,
            lastname: user.lastname,
            middlename: user.middlename,
            sex: user.sex,
            email: user.email, 
            id: user.id
        }
  
  
                                        
        const [at, rt] = await Promise.all([
          this.jwtService.signAsync(jwtPayload, {
            secret: 'AT_SECRET',
            expiresIn: '15m',
          }),
          this.jwtService.signAsync(jwtPayload, {
            secret: 'RT_SECRET',
            expiresIn: '7d',
          }),
        ]);


        return {
            access_token: at,
            refresh_token: rt,
        };
    }

    async updateRtHash(userId: number, rt: string) {
        await this.userRepository.update({hashRt: rt}, {where: {id: userId}})
    }

    async refreshTokens(userId: string, rt: string) {
        const user = await this.userRepository.findByPk(userId)

        if(!user || !user.hashRt) throw new ForbiddenException('Acees Denied')

        const rtMatches = user.hashRt === rt
        if(!rtMatches) throw new ForbiddenException('Access Denied')

        const tokens = await this.generateTokens(user)
        await this.updateRtHash(user.id, tokens.refresh_token)

        return tokens
    }
    // private async validateUser(userDto: LoginUserDto) {
    //     const user = await this.getUserByEmail(userDto.email)
    //     const passwordEquals = await bcrypt.compare(userDto.password, user.password)

        
    //     if (user && passwordEquals) return user

    //     throw new UnauthorizedException({message: 'Error email or password'})
    // }

    async getUserByEmail(email: string) {
        return this.userRepository.findOne({where: {email}})
    }

    async getAllUsers() {
        return this.userRepository.findAll()
    }
}