import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional} from "class-validator";
import { UserRole } from "src/user/entities/user.entity";


export class RegisterDto {

    @ApiProperty({ example: 'some@gmail.com', description: 'User email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'somepassword', description: 'User password' })
    @IsNotEmpty()
    password: string;

    @ApiProperty({ example: 'ADMIN or USER', description: 'User role (by default USER)' })
    @IsOptional()
    @IsEnum(UserRole)
    role?: UserRole;

}