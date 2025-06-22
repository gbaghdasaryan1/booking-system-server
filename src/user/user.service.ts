import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  
  constructor(@InjectRepository(User) private userRepo: Repository<User>){};

  findOne(email: string) {
    const user = this.userRepo.findOneBy({email});
    return user;
  }

}
