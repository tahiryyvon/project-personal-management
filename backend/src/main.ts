// File: backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

// This is the Vercel serverless function handler
export default async function handler(req, res) {
  // We bootstrap the NestJS app on every request
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api'); // Important: This matches our Vercel route
  await app.init();

  // We need to use the underlying HTTP adapter to handle the request
  const expressApp = app.getHttpAdapter().getInstance();
  return expressApp(req, res);
}

// This part is for local development, so `npm run start:dev` still works
async function bootstrapLocal() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  await app.listen(3001); // Or any port you prefer for local dev
}

// Run local development only if this file is executed directly
if (require.main === module) {
  bootstrapLocal();
}