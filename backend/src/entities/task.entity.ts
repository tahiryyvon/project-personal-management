import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 'TODO' })
  status: string;

  @Column()
  dueDate: Date;

  @ManyToOne(() => Employee, employee => employee.tasks)
  @JoinColumn({ name: 'employeeId' })
  employee: Employee;

  @Column()
  employeeId: number;
}