import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors({
    origin: [
      'http://localhost:3001',
      'https://ton-app.vercel.app' // Remplace par ton domaine Vercel
    ],
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type, Authorization',
  });
  
  // Écouter sur le port fourni par Vercel
  const port = process.env.PORT || 3000;
  await app.listen(port);
  
  console.log(`Backend running on port ${port}`);
}

// Export pour Vercel
export default bootstrap();