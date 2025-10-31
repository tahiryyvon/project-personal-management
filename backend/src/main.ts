// File: backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.init();
  
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}