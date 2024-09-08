import {
    Entity,
    Column,
    PrimaryColumn,
    CreateDateColumn,
    UpdateDateColumn
} from 'typeorm';


@Entity()
export class Theme {

    @PrimaryColumn()
    userId: number;

    @PrimaryColumn()
    year: number;

    @PrimaryColumn()
    month: number;

    @Column({ length: 100 })
    theme: string;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

}