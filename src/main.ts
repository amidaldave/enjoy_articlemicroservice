import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


// Create new logger instance
const logger = new Logger('Main');

// Create micro service options
const microserviceOptions = {
  name: 'ARTICLE_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    AppModule,
    microserviceOptions,
  );

  /* const options = new DocumentBuilder()
    .setTitle('Enjoy Article')
    .setDescription('The EnjoyArticle API')
    .setVersion('1.0')
    .addTag('article')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document); */
  
 app.listen(() => {
    logger.log('Article microservice is listening ... ');
  });
}
bootstrap();
