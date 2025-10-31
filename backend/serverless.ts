import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();
let app;

async function bootstrap() {
  if (!app) {
    app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp),
    );
    app.setGlobalPrefix('api'); // Important: matches your /api/* routes
    await app.init();
  }
  return expressApp;
}

// Export handler for Vercel
export default async function handler(req, res) {
  const server = await bootstrap();
  return server(req, res);
}