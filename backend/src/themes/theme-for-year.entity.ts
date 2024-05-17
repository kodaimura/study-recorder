import {Entity, Column, PrimaryColumn} from 'typeorm';


@Entity()
export class ThemeForYear {
	
	@PrimaryColumn()
	userNo: number;

	@PrimaryColumn()
	year: number;

	@Column({ length: 100 })
	theme: string;

}