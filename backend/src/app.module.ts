import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from 'src/users/user.entity';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { Theme } from 'src/themes/theme.entity';
import { ThemesModule } from 'src/themes/themes.module';
import { RecordsModule } from 'src/records/records.module';
import { Record } from 'src/records/record.entity';
import { RecordWork } from 'src/records/record-work.entity';


@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: process.env.ENV === 'local' ? '.env.local' : '.env',
        }),
        AuthModule,
        UsersModule,
        ThemesModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                database: config.get<string>('DB_NAME'),
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASSWORD'),
                entities: [User, Theme, Record, RecordWork],
                synchronize: config.get<string>('ENV') !== 'production',  // 本番環境ではfalseにする
                namingStrategy: new SnakeNamingStrategy(),
            }),
            inject: [ConfigService],
        }),
        RecordsModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule { }
