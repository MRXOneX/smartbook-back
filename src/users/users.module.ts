import { Module } from "@nestjs/common";
//
import { JwtModule } from "@nestjs/jwt";
//
import { SequelizeModule } from "@nestjs/sequelize"
// model
import { User } from "./users.model"
import { Token } from '../tokens/tokens.model'
// controller
import { UsersController } from "./users.controller";
// service
import { UsersService } from "./users.service";



@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([ User, Token ]),
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOptions: {
              expiresIn: '24h'
            }
        })
    ],
    exports: [
        JwtModule
    ]
})

export class UsersModule {}