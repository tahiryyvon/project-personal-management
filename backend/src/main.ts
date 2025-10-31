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
    await app.init();
  }
  return expressApp;
}

// For Vercel serverless
export default async function handler(req, res) {
  const server = await bootstrap();
  return server(req, res);
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  bootstrap().then((server) => {
    const port = process.env.PORT || 3000;
    server.listen(port, () => {
      console.log(`Application is running on: http://localhost:${port}`);
    });
  });
}