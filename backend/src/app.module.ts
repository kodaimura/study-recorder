import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
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
			namingStrategy: new SnakeNamingStrategy(),
    	}),
    	RecordsModule,
  	],
  	controllers: [AppController],
  	providers: [AppService],
})

export class AppModule {}
