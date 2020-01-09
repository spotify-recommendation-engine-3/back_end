exports.up = function(knex) {
    return knex.schema
        .createTable("users", users => {
        users.increments();

        users
        .string("username", 255)
        .notNullable()
        .unique();
        
        users
        .string("password", 255)
        .notNullable();
        
        users
        .string("email", 255)
        .unique()
        .notNullable();
    })
    
    .createTable('favourites', tbl => {
        tbl
        .increments();
        
        tbl
        .string('track_id', 1000)
        .notNullable();
        
        tbl
        .string('track_title', 100)
        .notNullable(); 

        tbl
        .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("favourites")
        .dropTableIfExists("users");
};