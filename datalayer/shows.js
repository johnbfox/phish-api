var sqlite3 = require('sqlite3').verbose(),
    db = new sqlite3.Database('data.db'),
    q = require('q');

exports.getCount = function(){
  var defered = q.defer();
  var query = "SELECT COUNT(*) FROM shows;";
  db.all(query, function(err,rows){
    defered.resolve(rows[0]['COUNT(*)']);
  });
  return defered.promise;
}


exports.getShowStateCount = function(year){
  var defered = q.defer(),
      query = "";
      likeString = undefined;
  if(year){
    var likeString = "%" + year + "%";
    query = 'SELECT DISTINCT v.state, COUNT(s.show_id) as count FROM shows s,  show_playedat_venue spv, venues v WHERE s.show_id=spv.show_id AND spv.venue_id = v.venue_id AND s.date LIKE ? GROUP BY v.state'
  }else{
    query = "SELECT DISTINCT v.state, COUNT(s.show_id) as count FROM shows s,  show_playedat_venue spv, venues v WHERE s.show_id=spv.show_id AND spv.venue_id = v.venue_id GROUP BY v.state"
  }

  db.all(query, likeString, function(err, rows){
    if(err){
      console.log(err);
    }else{
      defered.resolve(rows);
    }
  });
  return defered.promise;
}

exports.getShowCityCount = function(){
  var defered = q.defer();
  var query = "SELECT DISTINCT v.state, v.city, COUNT(s.show_id) as count FROM shows s,  show_playedat_venue spv, venues v WHERE s.show_id=spv.show_id AND spv.venue_id = v.venue_id GROUP BY v.state, v.city";

  db.all(query, function(err, rows){
    if(err){
      console.log(err);
    }else{
      defered.resolve(rows);
    }
  });
  return defered.promise;
}
