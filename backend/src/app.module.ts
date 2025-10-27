import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Task } from './entities/task.entity';
import { EmployeeService } from './services/employee.service';
import { TaskService } from './services/task.service';
import { EmployeeController } from './controllers/employee.controller';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      // URL de connexion Neon (à mettre dans ton .env)
      url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_Cx0IQWNki4wM@ep-dawn-tree-ah0qhs7p-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require',
      // Ou configuration séparée :
      // host: process.env.DB_HOST || 'ep-cool-cloud-123456.us-east-2.aws.neon.tech',
      // port: parseInt(process.env.DB_PORT) || 5432,
      // username: process.env.DB_USERNAME || 'fl0user',
      // password: process.env.DB_PASSWORD || 'ton_password',
      // database: process.env.DB_NAME || 'gestion_personnel',
      entities: [Employee, Task],
      synchronize: true,
      ssl: true, // Important pour Neon
      extra: {
        ssl: {
          rejectUnauthorized: false // Nécessaire pour Neon
        }
      }
    }),
    TypeOrmModule.forFeature([Employee, Task])
  ],
  controllers: [EmployeeController, TaskController],
  providers: [EmployeeService, TaskService],
})
export class AppModule {}