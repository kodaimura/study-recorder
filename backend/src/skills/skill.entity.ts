import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class Skill {

	@PrimaryGeneratedColumn()
	skillNo: number;
	
	@Column()
	userNo: number;

	@Column()
	categoryId: number;

	@Column({nullable: true, length: 50})
	item1: string | null;

	@Column({nullable: true, length: 50})
	item2: string | null;

	@Column({nullable: true})
	comment: string | null;
}