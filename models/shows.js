var shows = require('../datalayer/shows');
var q = require('q');

exports.getShowCount = function(req, resp, next){
  count = shows.count();
  resp.send({
    data:{
      'count': count
    }
  });
}

exports.getShowStateCount = function(req, resp, next){
  var year = req.params.year;
  shows.getShowStateCount(year).then(function(result){
    resp.send({
      data:{
        'results': result,
        type: "Show state count"
      }
    });
  })
}

exports.getShowStateCum = function(req, resp, next){
  var year = req.params.year;
  var promises = [];
  var responseResults = {};
  var responseArray = [];

  if(year < 1983 || year > 2100){
    resp.send({

    });
  }
  for(var i = 1983; i <= year; i++){
    promises.push(shows.getShowStateCount(i));
  }

  q.allSettled(promises).then(function(results){
    results.forEach(function(item){
      item.value.forEach(function(states){
        if(states.state.length > 0){
          if(typeof responseResults[states.state] === 'undefined'){
            responseResults[states.state] = states.count;
          }else{
            responseResults[states.state] += states.count;
          }
        }
      });
    });

    for( var key in responseResults){
      responseArray.push({
        state:key,
        count: responseResults[key]
      });
    }

    resp.send({
      data:{
        results: responseArray
      }
    });
  });
}

exports.getShowCityCount = function(req, resp, next){
  var fromYear = req.params.fromDate,
      toYear   = req.params.toYear;

  shows.getShowCityCount().then(function(result){
    resp.send({
      data:{
        'results': result,
        type: "Show state count"
      }
    });
  })
}

exports.getShowStateCountAfter = function(req, resp, next){
  if(req.params.year.length === 4){
    shows.getShowStateCountAfter(req.params.year).then(function(result){
      resp.send({
        data:{
          'results': result,
          type: "Counts"
        }
      })
    });
  }else{
    resp.send({
      error: "Invalid year.  Please input a year between the 1983 and the current year."
    })
  }
}
