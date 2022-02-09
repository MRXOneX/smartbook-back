import { NestFactory } from '@nestjs/core';
//
import * as cookieParser from 'cookie-parser';
//
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
// module
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(cookieParser());

  const config = new DocumentBuilder()
      .setTitle('Docs SmartBook')
      .setDescription('REST API')
      .setVersion('1.0.0')
      .addTag('founder Misha Poleshchenkov - https://www.facebook.com/profile.php?id=100076457065844')
      .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)


  const PORT = process.env.PORT || '80'

  await app.listen(PORT);
}
bootstrap();
