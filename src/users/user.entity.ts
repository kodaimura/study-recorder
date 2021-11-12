import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';


@Entity()
export class User {

	@PrimaryGeneratedColumn()
	userNo: number;

	@Column({ unique: true, length: 30 })
	userId: string;

	@Column()
	password: string;

	@Column({ length: 30 })
	userName: string;
}