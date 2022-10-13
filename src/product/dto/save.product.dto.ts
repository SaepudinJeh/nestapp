import { IsMongoId, IsNotEmpty } from 'class-validator';
export class SaveProductDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  desc: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  qty: number;
}
