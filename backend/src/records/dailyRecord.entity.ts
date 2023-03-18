import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class DailyRecord {
	
	@PrimaryColumn()
	userNo: number;

	@Column()
	startTime: number;

	@Column({default: 0})
	stopTime: number;
}