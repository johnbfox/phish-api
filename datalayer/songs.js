var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('data.db'),
    q = require('q');

exports.getCount = function(){
  var defered = q.defer();
  var query = "SELECT COUNT(*) FROM songs";
  db.all(query, function(err,rows){
    defered.resolve(rows[0]['COUNT(*)']);
  });
  return defered.promise;
}
