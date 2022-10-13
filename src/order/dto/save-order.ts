import { IsMongoId, IsNotEmpty } from 'class-validator';
export class SaveOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  user: string;

  @IsNotEmpty()
  @IsMongoId()
  product: string;

  @IsNotEmpty()
  qty: number;
}
