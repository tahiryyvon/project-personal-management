// File: /api/index.js

const express = require('express');
const { NestFactory } = require('@nestjs/core');
// This path points to the compiled AppModule from your NestJS build
const { AppModule } = require('../backend/dist/app.module');

// Cache the app instance for better performance in a serverless environment
let app;

async function bootstrap() {
  if (!app) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, expressApp);
    
    // Set a global prefix to match the Vercel route
    nestApp.setGlobalPrefix('api');
    nestApp.enableCors(); // Recommended for API routes

    await nestApp.init();
    app = expressApp;
  }
  return app;
}

// Export the Vercel handler
module.exports = async (req, res) => {
  const server = await bootstrap();
  server(req, res);
};