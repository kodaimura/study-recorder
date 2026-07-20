import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

const cookieExtractor = (req: any): string | null => {
    return req?.cookies?.study_recorder_token ?? null;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(readonly config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                cookieExtractor,
                ExtractJwt.fromAuthHeaderAsBearerToken(),
            ]),
            ignoreExpiration: false,
            secretOrKey: config.get<string>("JWT_SECRET_KEY"),
        });
    }

    async validate(payload: any) {
        return { userId: payload.userId, username: payload.username };
    }
}
