import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddMonthlyGoals1784641200000 implements MigrationInterface {
    name = 'AddMonthlyGoals1784641200000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS "monthly_goal" (
                "user_id" integer NOT NULL,
                "year" integer NOT NULL,
                "month" integer NOT NULL,
                "target_minute_time" integer NOT NULL DEFAULT 0,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_monthly_goal_user_year_month" PRIMARY KEY ("user_id", "year", "month")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS "monthly_goal"');
    }
}
