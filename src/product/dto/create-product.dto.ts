import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsOptional()
  user: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, default: 'Product name' })
  name: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: String, default: 'Description name' })
  desc: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: Number, default: 1000 })
  price: number;
}
