import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.taskRepository.find({ relations: ['employee'] });
  }

  create(task: Partial<Task>): Promise<Task> {
    return this.taskRepository.save(task);
  }

  async updateStatus(id: number, status: string): Promise<Task> {
    await this.taskRepository.update(id, { status });
    return this.taskRepository.findOne({ where: { id } });
  }
}