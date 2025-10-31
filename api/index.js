// api/index.js
const express = require('express');

let app;

async function createApp() {
  if (!app) {
    // Dynamically import NestJS after build
    const { NestFactory } = require('@nestjs/core');
    const { AppModule } = require('../backend/dist/app.module');
    
    const expressApp = express();
    const nestApp = await NestFactory.create(AppModule, expressApp);
    
    nestApp.setGlobalPrefix('api');
    nestApp.enableCors();
    await nestApp.init();
    
    app = expressApp;
  }
  return app;
}

module.exports = async (req, res) => {
  const server = await createApp();
  return server(req, res);
};