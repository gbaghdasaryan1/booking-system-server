import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from './entities/room.entity';
import { Repository } from 'typeorm';
import { CreateRoomDto } from './dto/create-room.dto';

@Injectable()
export class RoomService {

    constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) { }


    findAll() {
        return this.roomRepo.find();
    }

    create(dto: CreateRoomDto) {
        const newRoom = this.roomRepo.create(dto);
        return this.roomRepo.save(newRoom);
    }

    async update(id: string, dto: Partial<CreateRoomDto>) {
        const room = await this.roomRepo.findOneBy({ id });
        if (!room) throw new NotFoundException('Room not found');

        Object.assign(room, dto);

        return this.roomRepo.save(room);
    }

    async remove(id: string) {
        const room = await this.roomRepo.findOneBy({ id });
        if (!room) throw new NotFoundException('Room not found');

        return this.roomRepo.remove(room)
    }

}
