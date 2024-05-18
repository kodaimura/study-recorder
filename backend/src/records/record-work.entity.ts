import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class RecordWork {
	
	@PrimaryColumn()
	userNo: number;

	@Column()
	startTime: number;

	@Column({default: 0})
	stopTime: number;
}