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
      host: process.env.POSTGRES_HOST || "localhost",
      port: 5432,
      username: process.env.POSTGRES_USERNAME || "postgres",
      password: process.env.POSTGRES_PASSWORD || "admin",
      database: process.env.POSTGRES_DATABASE || "smartbook-test",
      models: [],
      autoLoadModels: true,
      // dialectOptions: {
      //   ssl: {
      //     require: true,
      //     rejectUnauthorized: false
      //   }
      // }
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
