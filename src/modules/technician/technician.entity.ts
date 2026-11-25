import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';

          @Entity('technicians')
          export class Technician {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'Specialization', type: 'varchar', length: 255 }) specialization: string;
@Column({ name: 'Availability', type: 'varchar', length: 255 }) availability: string;
@ManyToOne(() => User, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'UserID' }) user: User;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
