// File: backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// This is the only thing Vercel needs.
// It's a standard handler that bootstraps the NestJS app.
export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.init();
  
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}