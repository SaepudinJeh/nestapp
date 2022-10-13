import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const extractJwt = (req: any) => {
      console.log(req.cookies);
      let token = null;

      if (req && req.cookies) {
        token = req.cookies['jwt'];
      }

      return token || ExtractJwt.fromAuthHeaderAsBearerToken()(req);
    };

    super({
      jwtFromRequest: extractJwt,
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET_JWT,
    });
  }

  extractJwt(req: any) {
    let token = null;

    if (req && req.cookies) {
      token = req.cookies['jwt'];
    }

    return token;
  }

  async validate(payload: any) {
    return payload;
  }
}
