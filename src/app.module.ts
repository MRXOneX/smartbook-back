import { Module } from '@nestjs/common';
//
import { SequelizeModule } from '@nestjs/sequelize';
// controller
import { AppController } from './app.controller';
// service
import { AppService } from './app.service';
// module
import { UsersModule } from "./users/users.module"




@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: "postgres",
      host: process.env.HOST || "localhost",
      port: 5432,
      username: process.env.USERNAME || "postgres",
      password: process.env.PASSWORD || "admin",
      database: process.env.DATABASE || "localdb",
      models: [],
      autoLoadModels: true,
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false
        }
      }
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
