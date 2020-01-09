
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('favourites').insert([
    { track_id: '3D33FWSFSW', track_title: 'Whatever it is', user_id: 1 },
    { track_id: '686HKKGTAIK', track_title: 'What is DT Doing???', user_id: 1 },
    { track_id: 'AJDH22920JIK', track_title: 'WWIII is a real possibility', user_id: 1 }
  ]);
};
