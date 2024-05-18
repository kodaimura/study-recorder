import {Entity, Column, PrimaryColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';


@Entity()
export class Record {
	
	@PrimaryColumn()
	userId: number;

	@PrimaryColumn()
	year: number;

	@PrimaryColumn()
	month: number;

	@PrimaryColumn()
	day: number;

	@Column({default: 0})
	minuteTime: number;

	@Column({default: ''})
	comment: string;

	@CreateDateColumn({ type: 'timestamp' })
	createdAt: Date;

	@UpdateDateColumn({ type: 'timestamp' })
	updatedAt: Date;
}