import { Module } from "@nestjs/common";
//
import { SequelizeModule } from "@nestjs/sequelize"
// model
import { User } from "./users.model"
// controller
import { UsersController } from "./users.controller";
// service
import { UsersService } from "./users.service";
// module
import { JwtModule } from "@nestjs/jwt";




@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([ User ]),
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