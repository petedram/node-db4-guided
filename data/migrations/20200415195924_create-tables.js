
exports.up = function(knex) {
  return (
      knex.schema
        .createTable('zoos', tbl => {
            tbl.increments();
            tbl.string('zoo_name', 128).notNullable();
            tbl.string('address', 128).notNullable().unique();
        })
        .createTable('species', tbl => {
            tbl.increments();
            tbl.string('species_name',128).notNullable()
        })
        .createTable('animals', tbl => {
            tbl.increments();
            tbl.string('animal_name', 128).notNullable();
            tbl.integer('species_id')
                .unsigned()
                // .notNullable()
                .references('id') //foreign key
                .inTable('species')
                .onDelete('SET NULL') // remove both records, the one missing and the one dependents on it
                .onUpdate('SET NULL'); // needed for foregn key contrainsts 
        })
        .createTable('zoo_animals', tbl => {
            tbl.integer('animal_id').unsigned()
            // .notNullable()
            .references('animals.id');
            tbl.integer('zoo_id').unsigned().notNullable().references('zoos.id')
            .onDelete('SET NULL') // remove both records, the one missing and the one dependents on it
            .onUpdate('SET NULL'); // needed for foregn key contrainsts 
            // tbl.primary(['zoo_id', 'animal_id']);
            //could create primary key if needed
        })
  )
};

exports.down = function(knex) {
        return knex.schema
          .dropTableIfExists('zoo_animals')
          .dropTableIfExists('animals')
          .dropTableIfExists('species')
          .dropTableIfExists('zoos')
      };

      // must do in reverse order... has to be correct order.