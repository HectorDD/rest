    var mysql = require('mysql');
    var exports = module.exports = {};
    
    var pool  = mysql.createPool({
        host     : 'localhost',
      	user     : 'hectordavid1228',
      	password : '',
      	database : 'snj'
    });
    
    exports.executeSQLStatement = function(callback){
    	pool.getConnection(function(err, connection){
                if(err) {
                    return callback(err);
                }
                callback(connection);
    		    connection.release();
    });
    };