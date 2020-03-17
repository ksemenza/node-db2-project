

exports.up = function(knex) {
    return knex.schema.createTable('cars-table', tbl => {
        tbl.increments();
        tbl.string('make').notNullable().index();
        tbl.string('model').notNullable();
        tbl.integer('year').notNullable();
        tbl.integer('mileage')
        tbl.timestamps(true, true);
    });

};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('cars-table');
};
