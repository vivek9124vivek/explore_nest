import { MigrationInterface, QueryRunner } from "typeorm";

export class PostRefactoring1720276659889 implements MigrationInterface {

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
