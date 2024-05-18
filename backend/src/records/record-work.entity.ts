import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class RecordWork {
	
	@PrimaryColumn()
	userId: number;

	@Column()
	startTime: number;

}