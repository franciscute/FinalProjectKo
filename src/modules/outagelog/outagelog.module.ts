import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OutageLog } from './outagelog.entity';
import { OutageLogService } from './outagelog.service';
import { OutageLogController } from './outagelog.controller';
@Module({ imports: [TypeOrmModule.forFeature([OutageLog])], controllers: [OutageLogController], providers: [OutageLogService] })
export class OutageLogModule {}
