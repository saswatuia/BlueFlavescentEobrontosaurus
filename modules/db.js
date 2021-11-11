const pg = require('pg');
const dbURL = "postgres://ockjskefigfoeb:c49602df0436fb9e4f700cc0c4f8b67ab383c5cc5965dfa208f6902cf683b04a@ec2-63-34-223-144.eu-west-1.compute.amazonaws.com:5432/d7rkra79hqi5ch";
const connstring = process.env.DATABASE_URL || dbURL;
const pool = new pg.Pool({
    connectionString: connstring,
    ssl: {rejectUnauthorized: false}
});

const dbMethods = {};

dbMethods.getCategory = function(){
    const sql = "SELECT * FROM category";
    return pool.query(sql);
}

dbMethods.createCategory = function(name){
    const sql = "INSERT INTO category (id, name) VALUES(DEFAULT, $1)";
    const values = [name];
    return pool.query(sql, values);
}

dbMethods.delteCategory = function(categoryId){
    const sql = "DELETE FROM category WHERE id = $1 RETURNING *";
    const values = [categoryId];
    return pool.query(sql, values);
}

module.exports = dbMethods;