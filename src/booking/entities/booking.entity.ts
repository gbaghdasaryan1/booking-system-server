import { ApiProperty } from "@nestjs/swagger";
import { Room } from "src/room/entities/room.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Booking {

    @ApiProperty({ example: "20a5e167-7509-4d54-b16c-8b4100b83c55", description: 'Unique id' })
    @PrimaryGeneratedColumn("uuid") id: string;

    @ApiProperty({ example: '2026-11-11 11:11:00+04', description: 'Start date' })
    @Column("timestamptz") start: Date;

    @ApiProperty({ example: '2026-11-11 11:11:00+04', description: 'End date' })
    @Column("timestamptz") end: Date;

    @ManyToOne(() => User, (user) => user.bookings, {eager: true, onDelete: "CASCADE"})
    user: User;

    @ManyToOne(() => Room, (room) => room.bookings, {eager: true, onDelete: "CASCADE"})
    room: Room;
}
