import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class Theme {

	@PrimaryColumn()
	userNo: number;

	@PrimaryColumn()
	year: number;

	@PrimaryColumn()
	month: number;

	@Column({ length: 100 })
	theme: string;

}