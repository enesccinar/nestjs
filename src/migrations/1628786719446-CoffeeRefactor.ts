import {MigrationInterface, QueryRunner} from "typeorm";

export class CoffeeRefactor1628786719446 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.query(
            `ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`,
        ); 
    }

}
