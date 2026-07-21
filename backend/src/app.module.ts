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
import { GoalsModule } from 'src/goals/goals.module';
import { MonthlyGoal } from 'src/goals/monthly-goal.entity';
import { RecordsModule } from 'src/records/records.module';
import { Record } from 'src/records/record.entity';
import { RecordWork } from 'src/records/record-work.entity';

const isProductionEnv = (env?: string): boolean => env === 'production' || env === 'prod';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: isProductionEnv(process.env.ENV) ? '.env' : '.env.local',
        }),
        AuthModule,
        UsersModule,
        ThemesModule,
        GoalsModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                type: 'postgres',
                host: config.get<string>('DB_HOST'),
                port: config.get<number>('DB_PORT'),
                database: config.get<string>('DB_NAME'),
                username: config.get<string>('DB_USER'),
                password: config.get<string>('DB_PASSWORD'),
                entities: [User, Theme, MonthlyGoal, Record, RecordWork],
                synchronize: !isProductionEnv(config.get<string>('ENV')),  // 本番環境ではfalseにする
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
