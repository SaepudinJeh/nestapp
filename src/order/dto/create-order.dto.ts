import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOrderDto {
  @IsOptional()
  userId?: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: String })
  productId: string;

  @IsNotEmpty()
  @ApiProperty({ required: true, type: Number, default: 1 })
  qty: number;
}
