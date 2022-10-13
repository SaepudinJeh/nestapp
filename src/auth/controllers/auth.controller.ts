import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

import { CreateAuthDto } from '../dto/create-auth.dto';
import { AuthService } from '../services/auth.service';
import { LoginDto } from '../dto/login.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('v1/auth')
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('/signup')
  async createUser(
    @Body() createAuthDto: CreateAuthDto,
    @Res() response: Response,
  ) {
    try {
      console.log('wkwkkw', createAuthDto);

      const hashPassword = await bcrypt.hash(
        createAuthDto.password,
        parseInt(process.env.SALT_HASH),
      );

      await this.authService.createUser({
        ...createAuthDto,
        password: hashPassword,
      });

      response.json({
        message: 'Register Succesfully',
        statusCode: HttpStatus.CREATED,
      });
    } catch (err) {
      console.log('error', err);
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: `${
          err.keyValue.email || err.keyValue.username
        } already exist!`,
      });
    }
  }

  @Post('/login')
  async loginUser(@Body() userLoginDto: LoginDto, @Res() response: Response) {
    try {
      const { email, password } = userLoginDto;

      const user = await this.authService.findUser(email);

      if (!user) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Unregistered Email!',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      const comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return response.status(HttpStatus.BAD_REQUEST).json({
          message: 'Invalid Password',
          statusCode: HttpStatus.BAD_REQUEST,
        });
      }

      return response.status(HttpStatus.OK).json({
        statusCode: HttpStatus.OK,
        accessToken: this.jwtService.sign({
          _id: user._id,
          email: user.email,
        }),
      });
    } catch (err) {
      console.log('errrorr', err);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: err,
      });
    }
  }
}
