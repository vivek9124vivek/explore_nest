import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreatePublicationTable1722429271132 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
              name: 'publication',
              columns: [
                {
                  name: 'id',
                  type: 'serial', // Auto-incrementing primary key for PostgreSQL
                  isPrimary: true,
                },
                {
                  name: 'publication',
                  type: 'varchar',
                  length: '255',
                },
                {
                  name: 'publishedAt',
                  type: 'timestamp',
                  isNullable: true,
                },
                {
                  name: 'bookId',
                  type: 'int',
                },
              ],
            }),
          );
      
          // Create a foreign key relationship between Publication and Book
          await queryRunner.createForeignKey(
            'publication',
            new TableForeignKey({
              columnNames: ['bookId'],
              referencedColumnNames: ['id'],
              referencedTableName: 'book',
              onDelete: 'CASCADE', // Optional: cascade delete
            }),
          );


    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable('publication');
        const foreignKey = table.foreignKeys.find(
          (fk) => fk.columnNames.indexOf('bookId') !== -1,
        );
        await queryRunner.dropForeignKey('publication', foreignKey);
    
        // Drop the Publication table
        await queryRunner.dropTable('publication');

    }

}
