import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class RecordWork {
	
	@PrimaryColumn()
	userNo: number;

	@Column()
	startTime: number;
	
}