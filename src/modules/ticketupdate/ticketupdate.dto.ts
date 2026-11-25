import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateTicketUpdateDto {
            @IsString() @IsNotEmpty() remarks: string;
@IsDateString() @IsOptional() loggedat: Date;
@IsInt() @Min(1) ticketid: number;
@IsInt() @Min(1) userid: number;
          }
          export class UpdateTicketUpdateDto extends PartialType(CreateTicketUpdateDto) {}
