const db = require('../database/dbConfig.js');

module.exports = {
add,
find,
findBy,
findIdBy,
findById,
};

function find() {
return db('users')
        .select('id', 'username', 'password');
}

function findBy(filter) {
    return db('users')        
        .where(filter);
}

function findIdBy(filter) {
    return db('users')
        .select('id')
        .where(filter);
}

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then(([id]) => {
            return findById(id);
        });
}

function findById(id) {
    return db('users')
        .where({ id })
        .first();
}