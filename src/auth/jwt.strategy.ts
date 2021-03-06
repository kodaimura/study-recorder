import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(readonly config: ConfigService) {
    super({
      	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      	ignoreExpiration: false,
      	secretOrKey: config.get<string>("JWT_SECRET"),
    });
  }

  	async validate(payload: any) {
    	return { userNo: payload.userNo, username: payload.username };
  	}
}