// api/index.js
const { NestFactory } = require('@nestjs/core');
const { AppModule } = require('../backend/dist/app.module');
const express = require('express');

let app;

async function bootstrap() {
  if (!app) {
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
  const server = await bootstrap();
  return server(req, res);
};