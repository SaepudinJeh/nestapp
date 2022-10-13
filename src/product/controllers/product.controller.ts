import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { Request, Response } from 'express';
import { JwtAuthGuard } from 'src/guards/jwt.guard';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductService } from '../services/product.service';

@Controller('v1/product')
@ApiTags('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Product' })
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user['_id'];

      console.log('wkwkwkkw', userId);

      await this.productService.create({
        ...createProductDto,
        user: userId,
      });

      return res.status(HttpStatus.CREATED).json({
        statusCode: HttpStatus.CREATED,
        message: 'Created product success',
      });
    } catch (error) {
      console.log('errrorr', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      });
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const products = await this.productService.findAll();

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: products?.length
          ? 'Results product success'
          : 'Cant result products',
        data: products,
      });
    } catch (error) {
      console.log('errrorr', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      });
    }
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const product = await this.productService.findOne(id);

      if (!product) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Cant result product',
        });
      }

      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Find product sucess',
        data: product,
      });
    } catch (error) {
      console.log('errrorr', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error.message,
      });
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update Product' })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      console.log('wkwkwk', updateProductDto);
      const userId = req.user['_id'];

      const result = await this.productService.update(id, {
        ...updateProductDto,
        user: userId,
      });

      if (!result) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Cant update product!',
        });
      }

      console.log('result', result);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Update product sucess',
      });
    } catch (error) {
      console.log('errrorr', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error?.message,
      });
    }
  }

  @Delete(':id')
  @ApiParam({ name: 'id' })
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.productService.remove(id);
      return res.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        message: 'Deleted product sucess',
      });
    } catch (error) {
      console.log('errrorr', error);
      return res.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: error,
      });
    }
  }
}
