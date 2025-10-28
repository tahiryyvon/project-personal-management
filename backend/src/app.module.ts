import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Employee } from './entities/employee.entity';
import { Task } from './entities/task.entity';
import { EmployeeService } from './services/employee.service';
import { TaskService } from './services/task.service';
import { EmployeeController } from './controllers/employee.controller';
import { TaskController } from './controllers/task.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Employee, Task],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false
        }
      }
    }),
    TypeOrmModule.forFeature([Employee, Task])
  ],
  controllers: [EmployeeController, TaskController],
  providers: [EmployeeService, TaskService],
})
export class AppModule {}