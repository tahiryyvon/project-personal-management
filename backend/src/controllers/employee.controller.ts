import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../entities/employee.entity';

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

  @Put(':id')
  update(@Param('id') id: number, @Body() employee: Employee): Promise<Employee> {
    return this.employeeService.update(id, employee);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.employeeService.remove(id);
  }
}