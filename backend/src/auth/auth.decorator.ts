import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from './jwt.payload';

export const Payload = createParamDecorator(
    (data: string, ctx: ExecutionContext): JwtPayload => {
        const request = ctx.switchToHttp().getRequest();
        const pl = request.user;

        return data? pl?.[data] : pl;
    },
);