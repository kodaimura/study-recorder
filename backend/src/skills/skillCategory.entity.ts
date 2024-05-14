import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class SkillCategory {

	@Column()
	userNo: number;
	
	@PrimaryGeneratedColumn()
	categoryId: number;
	
	@Column({nullable: true, length: 50})
	categoryName: string | null;
}