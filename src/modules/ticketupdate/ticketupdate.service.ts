import { Injectable, NotFoundException } from '@nestjs/common';
          import { InjectRepository } from '@nestjs/typeorm';
          import { Repository } from 'typeorm';
          import { TicketUpdate } from './ticketupdate.entity';
          import { CreateTicketUpdateDto, UpdateTicketUpdateDto } from './ticketupdate.dto';

          @Injectable()
          export class TicketUpdateService {
            constructor(@InjectRepository(TicketUpdate) private readonly repo: Repository<TicketUpdate>) {}

            findAll() {
              return this.repo.find({ relations: ['ticket', 'user'], order: { id: 'DESC' } });
            }

            async findOne(id: number) {
              const item = await this.repo.findOne({ where: { id }, relations: ['ticket', 'user'] });
              if (!item) throw new NotFoundException('TicketUpdate not found');
              return item;
            }

            async create(dto: CreateTicketUpdateDto) {
              const data: any = { ...dto };
              data.ticket = { id: dto.ticketid };
    data.user = { id: dto.userid };
              delete data.ticketid;
    delete data.userid;
              return this.repo.save(this.repo.create(data));
            }

            async update(id: number, dto: UpdateTicketUpdateDto) {
              const item = await this.findOne(id);
              const data: any = { ...dto };
              if (dto.ticketid !== undefined) data.ticket = { id: dto.ticketid };
    if (dto.userid !== undefined) data.user = { id: dto.userid };
              delete data.ticketid;
    delete data.userid;
              Object.assign(item, data);
              return this.repo.save(item);
            }

            async remove(id: number) {
              const item = await this.findOne(id);
              await this.repo.remove(item);
              return { deleted: true, id };
            }

            async count() {
              return { total: await this.repo.count() };
            }
          }
