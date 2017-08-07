var mysql = require('mysql');
var pool  = null;

exports.connect = function() {
  pool = mysql.createPool({
    host: "ceipekelandia.com",
    user     : "ceipeke2_root",
    password : "123456",
    database: "ceipeke2_prueba"
  });
}

exports.get = function() {
  return pool;
}
