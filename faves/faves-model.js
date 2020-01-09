const db = require('../database/dbConfig.js');

module.exports = {
addFave,
findAllMyFave,
findFaveById,
// deleteFave
};

function addFave(fave){
    return db('favourites')
        .insert(fave,'id')
        .then(ids => {
            const [id] = ids;
            return findFaveById(id)
        })
}

function findFaveById(id){
    return db('favourites')
        .where({id})
        .first();
}

function findAllMyFave(id){
    return db('favourites as F')
        .select('F.track_title', 'F.track_id')
        .join('users as U','U.id','F.user_id')
        .where('user_id', id)
}