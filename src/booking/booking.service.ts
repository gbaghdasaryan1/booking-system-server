import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Booking } from './entities/booking.entity';
import { LessThan, MoreThan, Repository } from 'typeorm';
import { Room } from 'src/room/entities/room.entity';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking) private bookingRepo: Repository<Booking>,
    @InjectRepository(Room) private roomRepo: Repository<Room>,
  ){}

  async create(dto: CreateBookingDto, userId: string) {
    const conflict = await this.bookingRepo.findOne({
      where: {
        room: {id: dto.roomId},
        start: LessThan(dto.end),
        end: MoreThan(dto.start),
      }
    });

    if(conflict) throw new ConflictException("Time slot already booked");
    const booking = this.bookingRepo.create({
      start: dto.start,
      end: dto.end,
      room: {id: dto.roomId},
      user: {id: userId}
    });
    return this.bookingRepo.save(booking);
  }

  findAll() {
    return this.bookingRepo.find();
  }

  findByUser(userId: string){
    console.log(userId);
    
    return this.bookingRepo.find({where: {user: {id: userId}}})
  }

  async findByRoom(roomId: string): Promise<Booking[]> {
    return this.bookingRepo.find({
      where: { room: { id: roomId } },
      relations: ['room', 'user'],
      order: { start: 'ASC' },
    });
  }


  async remove(id: string) {
     const booking = await this.bookingRepo.findOneBy({ id });
            if (!booking) throw new NotFoundException('Booking not found');
    
            return this.bookingRepo.remove(booking)
  }
}
