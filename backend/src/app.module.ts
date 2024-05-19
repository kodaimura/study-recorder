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
      		type: 'postgres',
			host: 'db',
			port: 5432,
			database: 'studyrecorder',
			username: 'postgres',
			password: 'postgres',
      		entities: [User, Theme, Record, RecordWork],
			synchronize: true,  //本番環境ではfalseとする
    	}),
    	RecordsModule,
  	],
  	controllers: [AppController],
  	providers: [AppService],
})

export class AppModule {}
