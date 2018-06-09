module.exports = function (env) {
    var mysql      = require('mysql');
    var pool       = mysql.createPool({
        host     : env.DB_HOST,
        user     : env.DB_USERNAME,
        password : env.DB_PASSWORD,
        database : env.DB_DATABASE
    });

    var DB = (function () {

        function _query(query, params, callback) {
            var pool       = mysql.createPool({
                host     : env.DB_HOST,
                user     : env.DB_USERNAME,
                password : env.DB_PASSWORD,
                database : env.DB_DATABASE
            });
            pool.getConnection(function (err, connection) {
                if (err) {
                    connection.release();
                    throw err;
                }

                connection.query(query, params, function (err, rows) {
                    connection.release();
                    if (!err) {
                        callback(rows);
                    }
                });

                connection.on('error', function (err) {
                    connection.release();
                    throw err;
                });
            });
        };

        return {
            query: _query
        };
    })();

    return DB;
}