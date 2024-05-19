import {
	Entity, 
	Column, 
	PrimaryColumn
} from 'typeorm';


@Entity()
export class RecordWork {
	
	@PrimaryColumn()
	userId: number;

	@Column({type: 'bigint', default: 0})
	startTime: string;

}