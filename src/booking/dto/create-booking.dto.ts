import { ApiProperty } from "@nestjs/swagger";
import {  IsDateString, IsString } from "class-validator";

export class CreateBookingDto {

    @ApiProperty({ example: '2026-11-11 11:11:00+04', description: 'Booking start date' })
    @IsDateString()
    start: Date;

    @ApiProperty({ example: '2026-11-11 11:11:00+04', description: 'Booking end date' })
    @IsDateString()
    end: Date;

    @ApiProperty({ example: '20a5e167-7509-4d54-b16c-8b4100b83c55', description: 'Room id' })
    @IsString()
    roomId: string;
}
