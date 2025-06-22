import { ApiProperty } from "@nestjs/swagger";
import { Booking } from "src/booking/entities/booking.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

@Entity()
export class User {

    @ApiProperty({ example: "20a5e167-7509-4d54-b16c-8b4100b83c55", description: 'Unique id' })
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ApiProperty({ example: "some@gmail.com", description: 'User email' })
    @Column({unique: true})
    email: string;

    @ApiProperty({ example: "somepassword", description: 'User password' })
    @Column()
    password: string;

    @ApiProperty({ example: "USER or ADMIN", description: 'By default USER' })
    @Column({type: "enum", enum: UserRole, default: UserRole.USER})
    role: UserRole;

    @OneToMany(() => Booking, (booking) => booking.user)
    bookings: Booking[];
}
