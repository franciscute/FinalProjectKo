import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateTicketDto {
            @IsString() @IsNotEmpty() issuetype: string;
@IsString() @IsNotEmpty() description: string;
@IsString() @IsNotEmpty() status: string;
@IsDateString() @IsOptional() reportedat: Date;
@IsInt() @Min(1) userid: number;
@IsInt() @Min(1) technicianid: number;
@IsInt() @Min(1) outageid: number;
          }
          export class UpdateTicketDto extends PartialType(CreateTicketDto) {}
