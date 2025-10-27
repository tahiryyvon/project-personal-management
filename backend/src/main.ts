import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS pour Vercel
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://*.vercel.app',
      process.env.VERCEL_URL // URL dynamique de Vercel
    ].filter(Boolean),
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  // Préfixe API pour Vercel
  app.setGlobalPrefix('api');
  
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`🚀 Backend running on port ${port}`);
  console.log(`📊 API disponible sur: /api`);
}

// Export pour Vercel
export default bootstrap();