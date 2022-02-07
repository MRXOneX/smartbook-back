import { Module } from "@nestjs/common";
//
import { SequelizeModule } from "@nestjs/sequelize"
// model
import { User } from "./users.model"
// controller
import { UsersController } from "./users.controller";
// service
import { UsersService } from "./users.service";


@Module({
    controllers: [UsersController],
    providers: [UsersService],
    imports: [
        SequelizeModule.forFeature([ User ])
    ]
})

export class UsersModule {}