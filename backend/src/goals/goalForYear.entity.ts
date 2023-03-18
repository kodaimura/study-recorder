import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class GoalForYear {
	
	@PrimaryColumn()
	userNo: number;

	@PrimaryColumn()
	year: number;

	@Column({ length: 100 })
	goal: string;

}