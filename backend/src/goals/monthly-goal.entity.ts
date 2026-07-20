import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';


@Entity()
export class MonthlyGoal {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    year: number;

    @PrimaryColumn()
    month: number;

    @Column({ default: 0 })
    targetMinuteTime: number;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}
