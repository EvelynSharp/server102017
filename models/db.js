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
          callback(true);
          return;
        }
        connection.query(query, values, function(err,results){
            connection.release();
            if(!err) {
              callback(false, {rows: results});
            }
            // check null for results here
        });
        connection.on('error', function(err) {
              callback(true);
              return;
        });
    });
};

module.exports = getQuery;
