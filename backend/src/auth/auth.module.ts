import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtSignOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from 'src/users/users.module'

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';


@Module({
    imports: [
        UsersModule,
        PassportModule,
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => {
                const secret = config.get<string>('JWT_SECRET_KEY');
                const env = config.get<string>('ENV');
                if (!secret || (env === 'production' && secret === 'secret')) {
                    throw new Error('JWT_SECRET_KEY must be set to a strong value');
                }
                return {
                    secret,
                    signOptions: { expiresIn: (config.get<string>('JWT_EXPIRES_IN') || '4h') as JwtSignOptions['expiresIn'] },
                }
            },
        }),
    ],
    providers: [AuthService, LocalStrategy, JwtStrategy],
    controllers: [AuthController],
    exports: [AuthService],
})

export class AuthModule { }
