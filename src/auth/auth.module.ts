import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module'

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
    			return {
    				secret: config.get<string>('JWT_SECRET'),
    				signOptions: { expiresIn: '30h' },
    			}
    		},
    	}),
  	],
  	providers: [AuthService, LocalStrategy, JwtStrategy],
  	controllers: [AuthController],
  	exports: [AuthService],
})

export class AuthModule {}
