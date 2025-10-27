import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: 'http://localhost:3001',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  await app.listen(3000);
  console.log('Backend running on http://localhost:3000');
  console.log('Database:', process.env.DB_HOST || 'Neon PostgreSQL');
}
bootstrap();