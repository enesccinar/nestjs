"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoffeeRefactor1628786719446 = void 0;
class CoffeeRefactor1628786719446 {
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "title" TO "name"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "coffee" RENAME COLUMN "name" TO "title"`);
    }
}
exports.CoffeeRefactor1628786719446 = CoffeeRefactor1628786719446;
//# sourceMappingURL=1628786719446-CoffeeRefactor.js.map