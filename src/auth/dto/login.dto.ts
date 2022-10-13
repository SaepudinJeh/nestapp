import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ type: String })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  password: string;
}
