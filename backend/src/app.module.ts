import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Theme } from './themes/theme.entity';
import { ThemesModule } from './themes/themes.module';
import { RecordsModule } from './records/records.module';
import { Record } from './records/record.entity';
import { RecordWork } from './records/record-work.entity';


@Module({
  	imports: [
  		ConfigModule.forRoot({
  			isGlobal: true,
      		envFilePath: '.env'
  		}),
    	AuthModule, 
    	UsersModule,
    	ThemesModule,
    	TypeOrmModule.forRoot({
      		type: 'sqlite',
      		database: 'study-recorder.db',
      		synchronize: true,  //本番環境ではfalseとする
      		entities: [User, Theme, Record, RecordWork],
    	}),
    	RecordsModule,
  	],
  	controllers: [AppController],
  	providers: [AppService],
})

export class AppModule {}
