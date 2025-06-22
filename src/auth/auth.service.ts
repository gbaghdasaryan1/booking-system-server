import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from "bcrypt";
import { LoginDto } from './dto/login.dto';
import { User, UserRole } from 'src/user/entities/user.entity';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepo: Repository<User>, private jwtService: JwtService) { }

    async register(dto: RegisterDto) {
        const hashed = await bcrypt.hash(dto.password, 10);
        const user = this.userRepo.create({ email: dto.email, password: hashed, role: dto.role ?? UserRole.USER });
        await this.userRepo.save(user);
        return user;
    }

    async login(dto: LoginDto) {
        const user = await this.userRepo.findOne({ where: { email: dto.email } });
        const isPasswordValid = user && await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) {
            throw new UnauthorizedException('Wrong email or password');
        }
        return this.jwtService.sign({ sub: user.id, role: user.role })
    }

    async validateUser(email: string, password: string) {
        const user = (await this.userRepo.findOne({ where: { email: email } })) as User;
        const passwordEquals = await bcrypt.compare(password, user?.password);

        if (user && passwordEquals) return user;
        throw new UnauthorizedException('Wrong email or password');
    }

}
