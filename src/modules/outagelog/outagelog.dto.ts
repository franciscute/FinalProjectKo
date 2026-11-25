import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateOutageLogDto {
            @IsString() @IsNotEmpty() area: string;
@IsDateString() starttime: Date;
@IsDateString() @IsOptional() endtime: Date;
@IsString() @IsNotEmpty() status: string;
          }
          export class UpdateOutageLogDto extends PartialType(CreateOutageLogDto) {}
