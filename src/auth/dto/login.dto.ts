import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto {
    
    @ApiProperty({ example: 'some@gmail.com', description: 'User email' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'somepassword', description: 'User password' })
    @IsNotEmpty()
    password: string;
}