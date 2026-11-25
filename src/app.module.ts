import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TechnicianModule } from './modules/technician/technician.module';
import { OutageLogModule } from './modules/outagelog/outagelog.module';
import { TicketModule } from './modules/ticket/ticket.module';
import { TicketUpdateModule } from './modules/ticketupdate/ticketupdate.module';

@Module({
  imports: [
    // Loads .env into process.env and exposes ConfigService everywhere.
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get<string>('DB_HOST') || 'localhost',
        port: Number(config.get('DB_PORT') || 3306),
        username: config.get<string>('DB_USER') || 'root',
        password: config.get<string>('DB_PASSWORD') || '',
        database: config.get<string>('DB_NAME') || '02_ccnoms_db',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
    UsersModule,
    AuthModule,
    TechnicianModule, OutageLogModule, TicketModule, TicketUpdateModule,
  ],
})
export class AppModule {}
