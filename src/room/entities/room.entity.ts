import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entities/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Room {

    @ApiProperty({ example: "20a5e167-7509-4d54-b16c-8b4100b83c55", description: 'Unique id' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ example: "De dust", description: 'Romm name' })
    @Column() name: string;

    @ApiProperty({ example: 5, description: 'How many people can sit on this room' })
    @Column() capacity: number;

    @ApiProperty({ example: "2nd floor 3rd door", description: 'Room location' })
    @Column() location: string;

    @OneToMany(() => Booking, (booking) => booking.room)
    bookings: Booking[]
}