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
      host: "ec2-63-35-79-208.eu-west-1.compute.amazonaws.com",
      port: 5432,
      username: "odlqsfvvdljecd",
      password: "bb11e9a555563d6979371b1d54226e1cb8742fb49087a6f59fac600965d450e5",
      database: "d90vr97fm6p9lt",
      models: [],
      autoLoadModels: true
    }),
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
