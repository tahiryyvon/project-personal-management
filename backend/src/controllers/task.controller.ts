import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { TaskService } from '../services/task.service'; // ← Chemin corrigé
import { Task } from '../entities/task.entity'; // ← Chemin corrigé

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
}