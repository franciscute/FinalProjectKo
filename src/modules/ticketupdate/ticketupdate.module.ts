import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketUpdate } from './ticketupdate.entity';
import { TicketUpdateService } from './ticketupdate.service';
import { TicketUpdateController } from './ticketupdate.controller';
@Module({ imports: [TypeOrmModule.forFeature([TicketUpdate])], controllers: [TicketUpdateController], providers: [TicketUpdateService] })
export class TicketUpdateModule {}
