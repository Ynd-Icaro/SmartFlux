import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });

  // Security
  app.use(helmet());

  // CORS
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Global validation
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    })
  );

  // API prefix
  app.setGlobalPrefix('api');

  // Swagger Documentation - Optional (install @nestjs/swagger if needed)
  // const config = new DocumentBuilder()
  //   .setTitle('SmartFlux ERP API')
  //   .setDescription('Complete ERP system for smartphone retailers')
  //   .setVersion('1.0.0')
  //   .addBearerAuth(
  //     {
  //       type: 'http',
  //       scheme: 'bearer',
  //       bearerFormat: 'JWT',
  //     },
  //     'JWT'
  //   )
  //   .addServer(process.env.API_URL || 'http://localhost:3001')
  //   .build();

  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api/docs', app, document);

  const port = parseInt(process.env.API_PORT || '3001', 10);
  await app.listen(port, '0.0.0.0');

  console.log(`✅ SmartFlux Backend running at http://localhost:${port}`);
  console.log(`📚 API available at http://localhost:${port}/api`);
}

bootstrap();
