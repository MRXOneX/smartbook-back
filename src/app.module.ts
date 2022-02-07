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
      host: "127.0.0.1",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "smartbook-test",
      models: [],
      autoLoadModels: true
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
