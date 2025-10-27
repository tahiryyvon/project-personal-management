import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['tasks'] });
  }

  findOne(id: number): Promise<Employee> {
    return this.employeeRepository.findOne({ 
      where: { id }, 
      relations: ['tasks'] 
    });
  }

  create(employee: Partial<Employee>): Promise<Employee> {
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employee: Partial<Employee>): Promise<Employee> {
    await this.employeeRepository.update(id, employee);
    return this.employeeRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}