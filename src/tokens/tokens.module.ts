import { Module } from "@nestjs/common"
//
import { SequelizeModule } from "@nestjs/sequelize";
// model
import { User } from '../users/users.model'
import { Token } from './tokens.model'


@Module({
    providers: [],
    controllers: [],
    imports: [
        SequelizeModule.forFeature([User, Token])
    ]
})
export class TokensModule {}