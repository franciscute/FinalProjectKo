import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';


          @Entity('outage_logs')
          export class OutageLog {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'Area', type: 'varchar', length: 255 }) area: string;
@Column({ name: 'StartTime', type: 'datetime' }) starttime: Date;
@Column({ name: 'EndTime', type: 'datetime', nullable: true }) endtime: Date;
@Column({ name: 'Status', type: 'varchar', length: 255 }) status: string;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
