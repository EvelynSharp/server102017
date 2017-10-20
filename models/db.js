//this file has mysql config and helper method 
const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'game'
})

const getQuery = function(query, values, callback){
    pool.getConnection(function(err,connection){
        if (err) {
          callback(err);
          return;
        }
        connection.query(query, values, function(err,results){
            connection.release();
            if(!err) {
              callback(false, {rows: results});
            }
        });
        connection.on('error', function(err) {
              callback(err);
              return;
        });
    });
};

module.exports = getQuery;
