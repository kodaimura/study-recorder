import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { config as loadEnv } from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { MonthlyGoal } from './goals/monthly-goal.entity';
import { RecordWork } from './records/record-work.entity';
import { Record } from './records/record.entity';
import { Theme } from './themes/theme.entity';
import { User } from './users/user.entity';

const envFilePath = process.env.ENV === 'local' ? '.env.local' : '.env';
loadEnv({ path: envFilePath });

const getRequiredEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`${key} is required for TypeORM migrations.`);
    return value;
};

const getRequiredNumberEnv = (key: string): number => {
    const value = Number(getRequiredEnv(key));
    if (Number.isNaN(value)) throw new Error(`${key} must be a number.`);
    return value;
};

export default new DataSource({
    type: 'postgres',
    host: getRequiredEnv('DB_HOST'),
    port: getRequiredNumberEnv('DB_PORT'),
    database: getRequiredEnv('DB_NAME'),
    username: getRequiredEnv('DB_USER'),
    password: getRequiredEnv('DB_PASSWORD'),
    entities: [User, Theme, MonthlyGoal, Record, RecordWork],
    migrations: [`${__dirname}/migrations/*{.ts,.js}`],
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
});
