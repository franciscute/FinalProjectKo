import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/user.entity';
import { Ticket } from '../ticket/ticket.entity';

          @Entity('ticket_updates')
          export class TicketUpdate {
            @PrimaryGeneratedColumn() id: number;
            @Column({ name: 'Remarks', type: 'text' }) remarks: string;
@Column({ name: 'LoggedAt', type: 'datetime', nullable: true }) loggedat: Date;
@ManyToOne(() => Ticket, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'TicketID' }) ticket: Ticket;
@ManyToOne(() => User, { onDelete: 'RESTRICT' }) @JoinColumn({ name: 'UserID' }) user: User;
            @CreateDateColumn() createdAt: Date;
            @UpdateDateColumn() updatedAt: Date;
          }
