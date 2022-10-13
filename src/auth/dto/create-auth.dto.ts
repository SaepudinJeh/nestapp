import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @ApiProperty({ type: String, default: 'Wkwkwkwk' })
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail()
  @ApiProperty({ type: String, default: 'mail@mail.com' })
  email: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @ApiProperty({ type: String, default: 'password123' })
  password: string;
}
