import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class Record {
	
	@PrimaryColumn()
	userNo: number;

	@PrimaryColumn()
	year: number;

	@PrimaryColumn()
	month: number;

	@PrimaryColumn()
	day: number;

	@Column({default: 0})
	minuteTime: number;

	@Column({nullable: true})
	comment: string | null;
}