// api/index.js

// This file needs to be JavaScript, not TypeScript.
const express = require('express');
const { NestFactory } = require('@nestjs/core');
// IMPORTANT: Point this to your compiled AppModule. 
// The path is relative from this file in the Vercel output, not from your source code.
const { AppModule } = require('../backend/dist/app.module');

// Cache the NestJS app instance for better performance
let app;

async function bootstrap() {
  if (!app) {
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, expressApp);
    
    // Optional: Add global prefix to match your routes, e.g., /api/users
    nestApp.setGlobalPrefix('api');
    nestApp.enableCors(); // Enable CORS if your frontend needs it

    await nestApp.init();
    app = expressApp;
  }
  return app;
}

// Export the Vercel serverless function handler
module.exports = async (req, res) => {
  const server = await bootstrap();
  server(req, res);
};