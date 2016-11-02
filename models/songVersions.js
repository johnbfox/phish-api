var songVersions = require('../datalayer/songVersions');

var Q = require('q');

exports.getCount = function(req, resp, next){
  songVersions.getCount().then(function(result){
    resp.send({
      data:{
        count:result
      }
    })
  });
}

exports.getCoOccurences = function(req, resp, next){
  var song = req.params.song,
      since = req.params.since;

  songVersions.getCoOccurences(song, since).then(function(result){
    resp.send({
      data:{
        "result": result
      }
    })
  });
}

exports.getSongCountsForYear = function(req, resp, next){
  var song = req.query.song;
  var year = req.query.year;

  console.log(song);
  console.log(year);

  if(song === 'undefined' || year === 'undefined'){
    resp.send(
      {
        error: "Illegal arguments, request must contain song and year"
      }
    )
  }

  songVersions.getSongCountsForYear(song, year).then(function(result){
      resp.send({
        data:{
          "result":result
        }
      });
  });

}

exports.getSongCountsOverYears = function(req, resp, next){
  var song = req.params.song;
  var promises = [];
  var response = {
    data: []
  };

  for(var i = 1983 ; i < 2016; i++){
    promises.push(songVersions.getSongCountsForYear(song, "" + i));
  }

  Q.allSettled(promises).then(function(results){
    results.forEach(function(result){
      response.data.push(result.value);
    });
    resp.send(response);
  });
}
