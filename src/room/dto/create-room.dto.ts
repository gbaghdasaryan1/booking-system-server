import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsNumber, IsString } from "class-validator";

export class CreateRoomDto {

    @ApiProperty({ example: "De dust", description: 'Romm name' })
    @IsString()
    name: string;

    @ApiProperty({ example: 5, description: 'How many people can sit on this room' })
    @IsNumber()
    capacity: number;

    @ApiProperty({ example: "2nd floor 3rd door", description: 'Room location' })
    @IsString()
    location: string;
}
