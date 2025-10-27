import { Controller, Get, Post, Body } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service'; // ← Chemin corrigé
import { Employee } from '../entities/employee.entity'; // ← Chemin corrigé

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Post()
  create(@Body() employee: Employee): Promise<Employee> {
    return this.employeeService.create(employee);
  }
}