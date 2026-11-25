import { Injectable, NotFoundException } from '@nestjs/common';
          import { InjectRepository } from '@nestjs/typeorm';
          import { Repository } from 'typeorm';
          import { Ticket } from './ticket.entity';
          import { CreateTicketDto, UpdateTicketDto } from './ticket.dto';

          @Injectable()
          export class TicketService {
            constructor(@InjectRepository(Ticket) private readonly repo: Repository<Ticket>) {}

            findAll() {
              return this.repo.find({ relations: ['user', 'technician', 'outagelog'], order: { id: 'DESC' } });
            }

            async findOne(id: number) {
              const item = await this.repo.findOne({ where: { id }, relations: ['user', 'technician', 'outagelog'] });
              if (!item) throw new NotFoundException('Ticket not found');
              return item;
            }

            async create(dto: CreateTicketDto) {
              const data: any = { ...dto };
              data.user = { id: dto.userid };
    data.technician = { id: dto.technicianid };
    data.outagelog = { id: dto.outageid };
              delete data.userid;
    delete data.technicianid;
    delete data.outageid;
              return this.repo.save(this.repo.create(data));
            }

            async update(id: number, dto: UpdateTicketDto) {
              const item = await this.findOne(id);
              const data: any = { ...dto };
              if (dto.userid !== undefined) data.user = { id: dto.userid };
    if (dto.technicianid !== undefined) data.technician = { id: dto.technicianid };
    if (dto.outageid !== undefined) data.outagelog = { id: dto.outageid };
              delete data.userid;
    delete data.technicianid;
    delete data.outageid;
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
