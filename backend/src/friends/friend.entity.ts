import { Entity, Column } from 'typeorm';


@Entity()
export class Friend {

    //フレンド申請ユーザID
	user1: number;

    //フレンド許可ユーザID
	user2: number;

    @Column({default: 0})
    // 0:ブロック, 1:フレンド  2:フレンド申請中
    status: number;

}