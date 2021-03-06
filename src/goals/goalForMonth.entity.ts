import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class GoalForMonth {

	@PrimaryColumn()
	userNo: number;

	@PrimaryColumn()
	year: number;

	@PrimaryColumn()
	month: number;

	@Column({ length: 100 })
	goal: string;

}