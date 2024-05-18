import {
	Entity, 
	Column, 
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
} from 'typeorm';


@Entity()
export class User {

	@PrimaryGeneratedColumn()
	userId: number;

	@Column({ unique: true, length: 30 })
	username: string;

	@Column()
	password: string;

	@CreateDateColumn({ type: 'timestamp' })
	createAt: string;

	@UpdateDateColumn({ type: 'timestamp' })
	updateAt: string;
	
}