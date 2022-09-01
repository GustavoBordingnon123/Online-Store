var knex = require('knex')({
    client: 'mysql2',
    connection: {
      host : 'localhost',
      user : 'root',
      password : 'CodinM123',
      database : 'marketproject'
    }
  });

module.exports = knex;