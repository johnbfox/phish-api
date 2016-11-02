var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('data.db'),
    q = require('q');

exports.getCount = function(){
  var defered = q.defer();
  var query = "SELECT COUNT(*) FROM song_playedat_show;";
  db.all(query, function(err,rows){
    defered.resolve(rows[0]['COUNT(*)']);
  });
  return defered.promise;
}

exports.getCoOccurences = function(songName, since){
  var defered = q.defer();
  var query = "SELECT song_name, COUNT(song_name) as count FROM song_playedat_show WHERE show_id IN (SELECT show_id FROM song_playedat_show WHERE song_name=?) GROUP BY song_name ORDER BY count DESC LIMIT 11";
  db.all(query, songName, function(err, rows){
    defered.resolve(rows);
  });
  return defered.promise;
}

exports.getSongCountsForYear = function(songName, year){
  var defered = q.defer();
  yearString = "%" + year + "%";
  var query = "SELECT COUNT(*) as count FROM shows s, song_playedat_show sps WHERE s.show_id = sps.show_id AND song_name=? AND s.date LIKE ?;"
  db.all(query, songName, yearString, function(err, rows){
    defered.resolve({
      count:rows[0].count,
      'year':year
    });
  });
  return defered.promise;
}
