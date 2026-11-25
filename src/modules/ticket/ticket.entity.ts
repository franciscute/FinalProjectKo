import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { OutageLog } from '../outagelog/outagelog.entity';
import { Technician } from '../technician/technician.entity';

          @Entity('tickets')
          export class Ticket {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'IssueType', type: 'varchar', length: 255 }) issuetype: string;
@Column({ name: 'Description', type: 'text' }) description: string;
@Column({ name: 'Status', type: 'varchar', length: 255 }) status: string;
@Column({ name: 'ReportedAt', type: 'datetime', nullable: true }) reportedat: Date;
@ManyToOne(() => User, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'UserID' }) user: User;
@ManyToOne(() => Technician, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'TechnicianID' }) technician: Technician;
@ManyToOne(() => OutageLog, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'OutageID' }) outagelog: OutageLog;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
