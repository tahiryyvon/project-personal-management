import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: string; // 'TODO', 'IN_PROGRESS', 'DONE'

  @Column()
  dueDate: Date;

  @ManyToOne(() => Employee, employee => employee.tasks)
  employee: Employee;
}