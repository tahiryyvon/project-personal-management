import { Controller, Get, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { Task } from '../entities/task.entity';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.taskService.findAll();
  }

  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.taskService.create(task);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: number, @Body('status') status: string): Promise<Task> {
    return this.taskService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.taskService.remove(id);
  }
}