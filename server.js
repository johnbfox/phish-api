var express = require('express');

var shows = require('./models/shows');
var songs = require('./models/songs');
var songVersions = require('./models/songVersions');
var venues = require('./models/venues');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.set('port', process.env.PORT || 5000);

app.get('/', function(req, res, next){
    res.send('welcome to the phish!');
});

app.get('/showStateCount', shows.getShowStateCount);
app.get('/showStateCount/:year', shows.getShowStateCount);

app.get('/showStateCountCum/:year', shows.getShowStateCum);

app.get('/showCityCount', shows.getShowCityCount);


//song version model routes
app.get('/songVersionCount', songVersions.getCount);

app.get('/songCountsOverYears/:song', songVersions.getSongCountsOverYears);
app.get('/songCountsForYear', songVersions.getSongCountsForYear);

app.get('/cooccurences/:song', songVersions.getCoOccurences);

//venue model routes
//app.get('/venueCount', venues.getCount);

app.listen( app.get('port'), function () {
  console.log('Phish api listenting on %d!', app.get('port'));
});
