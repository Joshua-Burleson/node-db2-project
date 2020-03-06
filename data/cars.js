const knex = require('knex');
const dbConfig = require('../knexfile');

const db = knex(dbConfig.development);

//db.getById = 


module.exports = db;