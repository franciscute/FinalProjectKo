import { IsString, IsNumber, IsInt, IsEmail, IsDateString, IsOptional, IsNotEmpty, IsIn, Min, Max } from 'class-validator';
          import { PartialType } from '@nestjs/mapped-types';
          export class CreateTechnicianDto {
            @IsString() @IsNotEmpty() specialization: string;
@IsString() @IsNotEmpty() availability: string;
@IsInt() @Min(1) userid: number;
          }
          export class UpdateTechnicianDto extends PartialType(CreateTechnicianDto) {}
