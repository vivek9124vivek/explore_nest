import { MigrationInterface, QueryRunner } from "typeorm";

export class PublicMigration1720423024914 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            ADD COLUMN "author" VARCHAR(255);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "book"
            DROP COLUMN "author";
        `);
    }

}
